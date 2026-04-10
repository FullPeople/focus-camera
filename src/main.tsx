import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import OBR from "@owlbear-rodeo/sdk";

const PLUGIN_ID = "com.focus-camera";
const BROADCAST_FOCUS = `${PLUGIN_ID}/focus-all`;

function App() {
  const [role, setRole] = useState<"GM" | "PLAYER">("PLAYER");

  useEffect(() => {
    // Get initial role
    OBR.player.getRole().then(setRole);
    OBR.player.onChange((p) => setRole(p.role));

    // Register context menu on empty canvas (right-click on nothing)
    // This triggers when right-clicking on the canvas background
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
        // Get GM's current viewport state
        const scale = await OBR.viewport.getScale();

        if (context.items.length > 0) {
          // Right-clicked on an item — focus on the item's position
          const pos = context.items[0].position;
          await OBR.broadcast.sendMessage(BROADCAST_FOCUS, {
            x: pos.x,
            y: pos.y,
            scale,
          });
          // Also focus GM's own camera
          const w = await OBR.viewport.getWidth();
          const h = await OBR.viewport.getHeight();
          await OBR.viewport.animateTo({
            position: { x: -pos.x * scale + w / 2, y: -pos.y * scale + h / 2 },
            scale,
          });
          OBR.notification.show("已聚焦所有玩家摄像头");
        }
      },
    });

    // Listen for focus broadcast (all players including GM)
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
      fontSize: 13,
      color: "#ccc",
      background: "#1a1a2e",
      padding: "12px 14px",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    }}>
      {role === "GM"
        ? "右键点击物体 → 全员聚焦到此处"
        : "等待 DM 聚焦摄像头"}
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
