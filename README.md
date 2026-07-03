# listen — 4587.fun 音乐站

[https://listen.4587.fun](https://listen.4587.fun) 的歌单。进页点击后随机循环播放，支持搜索。
歌单**不用写代码**——构建时自动扫描 `static/audios/` 目录生成。

## 加一首歌

把 mp3 文件传到 `static/audios/` 目录即可（GitHub 网页：进目录 → Add file → Upload files → 拖入 → Commit）。

**文件名 = 歌名**，规则：

| 文件名 | 显示效果 |
|--------|---------|
| `夏天就这样啦.mp3` | 歌名：夏天就这样啦 |
| `夏天就这样啦 - never young beach.mp3` | 歌名：夏天就这样啦；艺人：never young beach |

即 `歌名 - 艺人.mp3`（中间是空格-空格），会自动拆成歌名和艺人；没有 ` - ` 就整个当歌名。

支持格式：mp3 / m4a / aac / ogg / oga / opus / wav / flac / weba / webm。

> ⚠️ 能否播放由**访客的浏览器**决定，不由本站决定：
> - **mp3 / m4a / aac / wav** — 各浏览器基本都能放（最保险）
> - **flac / ogg / opus** — 部分浏览器（尤其 iPhone/Mac 的 Safari）可能放不了
>
> 遇到浏览器放不了的格式，播放器会显示「当前浏览器无法播放此格式」并自动跳下一首，不会卡住。无损文件（flac/wav）体积大、加载慢，也会占用仓库空间——可接受就直接传。

## 隐藏一首歌（不删文件）

在文件名**结尾**加 `hide` 或 `隐藏`（扩展名之前）：

- `夏天就这样啦 hide.mp3` → 不显示
- `夏天就这样啦 隐藏.mp3` → 不显示
- 想恢复：去掉结尾的 `hide` / `隐藏`

（只匹配结尾，所以歌名中间带 hide 的英文歌如 `Hide and Seek.mp3` 不受影响。）

## 播放行为

- 进页有「点击开始聆听」遮罩（浏览器规定必须先交互才能出声），点一下即随机播放
- 一首放完自动随机跳下一首，无限循环
- 底部常驻播放条；搜索过滤时音乐不中断

## 原理（无需关心，仅备查）

- push 后 GitHub Actions 跑 `build-manifest.mjs`，扫描 `static/audios/` 生成 `songs.json`
- 页面加载 `songs.json` 渲染歌单
- `songs.json` 是自动生成的，不提交进仓库（已在 `.gitignore`）

## 部署

- GitHub Pages，Source = GitHub Actions；域名 `CNAME` = `listen.4587.fun`
- 改完 push 即发布，几十秒生效
