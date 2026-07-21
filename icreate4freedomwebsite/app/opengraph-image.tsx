import { ImageResponse } from "next/og";
import { SLOTS } from "@/components/vending-machine/slots";

/* Social card: the machine's wordmark band + the four cans, on alley dark.
   Palette comes straight from slots.ts so it can never drift from the scene. */

export const alt =
  "ICreate4Freedom — a vending machine in a quiet alley; pick a can, vend a page";
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
          alignItems: "center",
          justifyContent: "center",
          gap: 52,
          backgroundColor: "#0b0e0b",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <div style={{ width: 660, height: 4, backgroundColor: "#1e63b0" }} />
          <div style={{ fontSize: 72, fontStyle: "italic", fontWeight: 800, color: "#f2f5f8", letterSpacing: 2 }}>
            ICREATE4FREEDOM
          </div>
          <div style={{ width: 660, height: 4, backgroundColor: "#1e63b0" }} />
        </div>
        <div style={{ display: "flex", gap: 30 }}>
          {SLOTS.map((slot) => (
            <div key={slot.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 66, height: 14, borderRadius: 7, backgroundColor: "#c6c6c6", marginBottom: -7 }} />
              <div
                style={{
                  display: "flex",
                  width: 86,
                  height: 132,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  fontWeight: 700,
                  backgroundColor: slot.can,
                  color: slot.text,
                }}
              >
                {slot.label}
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 28, color: "#8fa392" }}>pick a can · vend a page</div>
      </div>
    ),
    { ...size }
  );
}
