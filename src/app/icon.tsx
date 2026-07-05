import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// on-brand favicon: green prompt glyph on near-black — matches the terminal
// identity instead of the default Next.js mark
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#00ff88",
          fontSize: 26,
          fontWeight: 700,
          fontFamily: "monospace",
        }}
      >
        &gt;_
      </div>
    ),
    { ...size },
  );
}
