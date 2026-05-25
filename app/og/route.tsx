import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
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
          background: "linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #f8fafc 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px" }}>
          {/* Icon */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 18,
              background: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Cross symbol */}
            <div style={{ position: "relative", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "absolute", width: 44, height: 14, borderRadius: 4, background: "white" }} />
              <div style={{ position: "absolute", width: 14, height: 44, borderRadius: 4, background: "white" }} />
            </div>
          </div>

          {/* Brand text */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontSize: 52, fontWeight: 900, color: "#0f172a", lineHeight: 1, textTransform: "uppercase" }}>
              Medical Science
            </span>
            <span style={{ fontSize: 52, fontWeight: 900, color: "#2563eb", lineHeight: 1, textTransform: "uppercase" }}>
              Dictionary
            </span>
          </div>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: 28,
            color: "#475569",
            margin: 0,
            lineHeight: 1.4,
            maxWidth: 800,
            fontWeight: 500,
          }}
        >
          Tibbiy terminlar, qisqartmalar va tushunchalarning
          ko'p tilli professional lug'ati
        </p>

        {/* Accent line */}
        <div
          style={{
            marginTop: 40,
            width: 100,
            height: 5,
            borderRadius: 3,
            background: "#2563eb",
          }}
        />

        {/* Footer */}
        <p style={{ position: "absolute", bottom: 60, left: 80, fontSize: 20, color: "#94a3b8", fontWeight: 600, margin: 0 }}>
          SamDCHTI • Medical Science Dictionary
        </p>

        {/* Decorative circle */}
        <div
          style={{
            position: "absolute",
            right: -80,
            top: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(37,99,235,0.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 60,
            bottom: -60,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(37,99,235,0.04)",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
