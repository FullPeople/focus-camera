import OBR from "@owlbear-rodeo/sdk";

const PLUGIN_ID = "com.focus-camera";
const BROADCAST_FOCUS = `${PLUGIN_ID}/focus-all`;

OBR.onReady(() => {
  // Right-click on an item → focus all players to item position
  OBR.contextMenu.create({
    id: `${PLUGIN_ID}/focus-item`,
    icons: [
      {
        icon: `${import.meta.env.BASE_URL}icon.svg`,
        label: "全员聚焦到此处",
        filter: {
          roles: ["GM"],
        },
      },
    ],
    onClick: async (context) => {
      const scale = await OBR.viewport.getScale();
      let x: number, y: number;

      if (context.items.length > 0) {
        // Clicked on item(s)
        x = context.items[0].position.x;
        y = context.items[0].position.y;
      } else {
        // Clicked on empty space — use selectionBounds center
        x = context.selectionBounds.center.x;
        y = context.selectionBounds.center.y;
      }

      await OBR.broadcast.sendMessage(BROADCAST_FOCUS, { x, y, scale });

      // Focus GM's own camera
      const w = await OBR.viewport.getWidth();
      const h = await OBR.viewport.getHeight();
      await OBR.viewport.animateTo({
        position: { x: -x * scale + w / 2, y: -y * scale + h / 2 },
        scale,
      });

      OBR.notification.show("已聚焦所有玩家摄像头");
    },
  });

  // Right-click on empty space (min:0, max:0 = no items selected)
  OBR.contextMenu.create({
    id: `${PLUGIN_ID}/focus-empty`,
    icons: [
      {
        icon: `${import.meta.env.BASE_URL}icon.svg`,
        label: "全员聚焦到此处",
        filter: {
          roles: ["GM"],
          min: 0,
          max: 0,
        },
      },
    ],
    onClick: async (context) => {
      const scale = await OBR.viewport.getScale();
      const center = context.selectionBounds.center;

      await OBR.broadcast.sendMessage(BROADCAST_FOCUS, {
        x: center.x,
        y: center.y,
        scale,
      });

      const w = await OBR.viewport.getWidth();
      const h = await OBR.viewport.getHeight();
      await OBR.viewport.animateTo({
        position: { x: -center.x * scale + w / 2, y: -center.y * scale + h / 2 },
        scale,
      });

      OBR.notification.show("已聚焦所有玩家摄像头");
    },
  });

  // All players listen for focus broadcast
  OBR.broadcast.onMessage(BROADCAST_FOCUS, async (event) => {
    const data = event.data as { x: number; y: number; scale: number };
    if (!data) return;

    const w = await OBR.viewport.getWidth();
    const h = await OBR.viewport.getHeight();
    await OBR.viewport.animateTo({
      position: {
        x: -data.x * data.scale + w / 2,
        y: -data.y * data.scale + h / 2,
      },
      scale: data.scale,
    });
  });
});
