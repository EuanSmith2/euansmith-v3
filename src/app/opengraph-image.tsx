import { ImageResponse } from "next/og";

export const alt = "Euan Smith — Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, color: "#8a8a8a" }}>
          ▎ $ whoami
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 64,
            fontWeight: 700,
            color: "#f0f0f0",
          }}
        >
          euan smith
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 34,
            color: "#00ff88",
          }}
        >
          I hand-code websites &amp; build AI systems
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 26,
            color: "#8a8a8a",
          }}
        >
          NZT-48 | Forged Websites | euansmith.net
        </div>
      </div>
    ),
    { ...size },
  );
}
