import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import OBR from "@owlbear-rodeo/sdk";

const PLUGIN_ID = "com.focus-camera";
const BROADCAST_FOCUS = `${PLUGIN_ID}/focus-all`;

function App() {
  useEffect(() => {
    // Context menu: no item-type filter, so it shows on ANY item
    // (map backgrounds, props, characters, shapes — everything)
    OBR.contextMenu.create({
      id: `${PLUGIN_ID}/focus-here`,
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
        if (context.items.length === 0) return;

        const pos = context.items[0].position;
        const scale = await OBR.viewport.getScale();

        // Broadcast to all players
        await OBR.broadcast.sendMessage(BROADCAST_FOCUS, {
          x: pos.x,
          y: pos.y,
          scale,
        });

        // Focus GM's own camera too
        const w = await OBR.viewport.getWidth();
        const h = await OBR.viewport.getHeight();
        await OBR.viewport.animateTo({
          position: { x: -pos.x * scale + w / 2, y: -pos.y * scale + h / 2 },
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
  }, []);

  return (
    <div style={{
      fontFamily: "-apple-system, sans-serif",
      fontSize: 12,
      color: "#888",
      background: "#1a1a2e",
      padding: "8px",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    }}>
      右键任意物体 → 全员聚焦
    </div>
  );
}

function PluginGate() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    OBR.onReady(() => setReady(true));
  }, []);

  if (!ready) return null;
  return <App />;
}

const root = createRoot(document.getElementById("root")!);
root.render(<PluginGate />);
