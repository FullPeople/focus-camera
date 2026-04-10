# 全员聚焦 — Owlbear Rodeo 插件

一个简单的 [Owlbear Rodeo](https://www.owlbear.rodeo/) 插件，DM 可以通过右键菜单将所有玩家的摄像头聚焦到指定物体的位置，并保持与 DM 一致的缩放级别。

## 安装

将以下链接粘贴到 **Owlbear Rodeo → 设置 → 扩展 → 添加自定义扩展**：

```
https://obr.dnd.center/focus/manifest.json
```

## 功能

- **右键物体 → 全员聚焦到此处**：DM 右键点击场景中的任意物体，选择"全员聚焦到此处"，所有玩家的摄像头将平滑聚焦到该位置
- **保持 DM 缩放**：玩家的摄像头缩放会同步为 DM 当前的缩放级别
- **仅 DM 可用**：只有 DM 能看到并使用此菜单选项

## 技术栈

- React 18 + TypeScript + Vite
- @owlbear-rodeo/sdk v3.x

## 开发

```bash
npm install
npm run dev     # 启动 HTTPS 开发服务器
npm run build   # 构建生产版本
```

## 许可证

MIT
