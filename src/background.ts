import OBR from "@owlbear-rodeo/sdk";

const PLUGIN_ID = "com.focus-camera";
const BROADCAST_FOCUS = `${PLUGIN_ID}/focus-all`;

async function focusCamera(x: number, y: number, scale: number) {
  const [w, h] = await Promise.all([
    OBR.viewport.getWidth(),
    OBR.viewport.getHeight(),
  ]);
  OBR.viewport.animateTo({
    position: { x: -x * scale + w / 2, y: -y * scale + h / 2 },
    scale,
  });
}

OBR.onReady(() => {
  // Right-click on item
  OBR.contextMenu.create({
    id: `${PLUGIN_ID}/focus-item`,
    icons: [
      {
        icon: `${import.meta.env.BASE_URL}icon.svg`,
        label: "全员聚焦到此处",
        filter: { roles: ["GM"] },
      },
    ],
    onClick: async (context) => {
      const [scale] = await Promise.all([OBR.viewport.getScale()]);
      const pos = context.items.length > 0
        ? context.items[0].position
        : context.selectionBounds.center;

      OBR.broadcast.sendMessage(BROADCAST_FOCUS, { x: pos.x, y: pos.y, scale });
      focusCamera(pos.x, pos.y, scale);
      OBR.notification.show("已聚焦所有玩家摄像头");
    },
  });

  // Right-click empty space
  OBR.contextMenu.create({
    id: `${PLUGIN_ID}/focus-empty`,
    icons: [
      {
        icon: `${import.meta.env.BASE_URL}icon.svg`,
        label: "全员聚焦到此处",
        filter: { roles: ["GM"], min: 0, max: 0 },
      },
    ],
    onClick: async (context) => {
      const scale = await OBR.viewport.getScale();
      const c = context.selectionBounds.center;

      OBR.broadcast.sendMessage(BROADCAST_FOCUS, { x: c.x, y: c.y, scale });
      focusCamera(c.x, c.y, scale);
      OBR.notification.show("已聚焦所有玩家摄像头");
    },
  });

  // All players listen
  OBR.broadcast.onMessage(BROADCAST_FOCUS, async (event) => {
    const data = event.data as { x: number; y: number; scale: number };
    if (!data) return;
    focusCamera(data.x, data.y, data.scale);
  });
});
