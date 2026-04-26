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

[PolyForm Noncommercial License 1.0.0](./LICENSE) —— 详见 LICENSE 文件。

**通俗说明**（仅供理解，以 LICENSE 全文为准）：

- ✅ **可以**：自由查看、修改、二次创作、非商用分发
- ✅ **必须**：保留 `Required Notice: Copyright (c) 2026 FullPeople` 这一行
- ❌ **不允许**：任何商业用途（售卖、盈利产品、收费部署等）
- ✅ 个人 / TRPG 团队 / 爱好者 / 学校 / 公益使用 **均允许**
- ✅ 非商用衍生品可以闭源、可重新分发

---

## 💖 支持作者

如果这些插件对你的跑团有帮助，欢迎来爱发电支持一下作者 —— 用于服务器续费和新插件开发 ♥

[![前往爱发电](https://img.shields.io/badge/%E7%88%B1%E5%8F%91%E7%94%B5-FullPeople-FF6B9D?style=for-the-badge&logo=heart&logoColor=white)](https://ifdian.net/a/fullpeople)

> 反馈或建议：[1763086701@qq.com](mailto:1763086701@qq.com)
