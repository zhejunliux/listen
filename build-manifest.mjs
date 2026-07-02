// Scans static/audios/ and writes songs.json — the playlist manifest.
// Runs in GitHub Actions before deploy, so uploading an mp3 is enough to
// make it appear. End a filename with "hide" or "隐藏" to skip it.
//
//   夏天就这样啦.mp3               -> { name: "夏天就这样啦", artist: "" }
//   夏天就这样啦 - never young.mp3 -> { name: "夏天就这样啦", artist: "never young" }
//   夏天就这样啦 hide.mp3          -> skipped (hidden)
//   夏天就这样啦 隐藏.mp3          -> skipped (hidden)

import { readdirSync, writeFileSync } from 'node:fs';

const DIR = 'static/audios';
const AUDIO = /\.(mp3|m4a|ogg|wav|flac|aac)$/i;
// filename ends with " hide" / "-hide" / "隐藏" (etc.) right before the extension
const HIDDEN = /[ _\-]*(hide|隐藏)$/i;

let files = [];
try {
  files = readdirSync(DIR);
} catch {
  console.error(`no ${DIR}/ directory — writing empty manifest`);
}

const songs = files
  .filter((f) => AUDIO.test(f))       // audio files only
  .filter((f) => !f.startsWith('.'))  // ignore dotfiles
  .map((f) => ({ file: f, base: f.replace(AUDIO, '') }))
  .filter(({ base }) => !HIDDEN.test(base))  // "…hide" / "…隐藏" = hidden
  .sort((a, b) => a.base.localeCompare(b.base, 'zh-Hans-CN'))
  .map(({ file, base }) => {
    const dash = base.indexOf(' - ');
    const name = dash === -1 ? base : base.slice(0, dash).trim();
    const artist = dash === -1 ? '' : base.slice(dash + 3).trim();
    return { name, artist, src: `${DIR}/${file}` };
  });

writeFileSync('songs.json', JSON.stringify(songs, null, 2) + '\n');
console.log(`songs.json written: ${songs.length} track(s)`);
songs.forEach((s) => console.log(`  · ${s.name}${s.artist ? ' — ' + s.artist : ''}`));
