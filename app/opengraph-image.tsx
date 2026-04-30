import { ImageResponse } from "next/og";

export const alt = "Everette's Princess Land Spelling Quest game preview";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: 52,
          background:
            "radial-gradient(circle at 18% 18%, #fff8d8 0, transparent 24%), linear-gradient(135deg, #fff5fb 0%, #efe8ff 45%, #dcfbff 100%)",
          color: "#36215d",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "8px solid rgba(255, 255, 255, 0.82)",
            borderRadius: 44,
            padding: 42,
            background: "rgba(255, 255, 255, 0.72)",
            boxShadow: "0 24px 80px rgba(92, 65, 146, 0.2)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 28 }}>
            <div style={{ display: "flex", flexDirection: "column", width: 690 }}>
              <div
                style={{
                  display: "flex",
                  marginBottom: 12,
                  color: "#8d6b00",
                  fontSize: 26,
                  fontWeight: 900,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                Everette&apos;s Princess Land Spelling Quest
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 70,
                  fontWeight: 900,
                  lineHeight: 0.96,
                  letterSpacing: -3,
                }}
              >
                Save the Unicorn by unlocking castle words
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 24,
                  color: "#6f608c",
                  fontSize: 31,
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
              >
                Log in, earn gifts, and help the unicorn through spelling challenges.
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                width: 300,
              }}
            >
              {[
                ["Level", "3"],
                ["Stars", "120"],
                ["Gifts", "3"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "3px solid rgba(123, 97, 255, 0.16)",
                    borderRadius: 24,
                    padding: "16px 20px",
                    background: "rgba(255, 255, 255, 0.84)",
                  }}
                >
                  <span style={{ color: "#6f608c", fontSize: 22, fontWeight: 900 }}>
                    {label}
                  </span>
                  <strong style={{ color: "#7b61ff", fontSize: 42, lineHeight: 1 }}>
                    {value}
                  </strong>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 26,
              borderRadius: 34,
              padding: 24,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,239,249,0.82))",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 130,
                height: 92,
                borderRadius: "48% 52% 46% 54%",
                background: "linear-gradient(135deg, #ffffff 0%, #f1e8ff 100%)",
                color: "#7b61ff",
                fontSize: 24,
                fontWeight: 900,
                boxShadow: "0 12px 28px rgba(82, 50, 126, 0.18)",
              }}
            >
              UNICORN
            </div>
            <div
              style={{
                position: "relative",
                display: "flex",
                flex: 1,
                height: 24,
                borderRadius: 999,
                background: "#dfd5ff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "68%",
                  borderRadius: 999,
                  background: "linear-gradient(90deg, #9ff4d7, #ffd66b, #ff8fcb)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "68%",
                  top: "50%",
                  width: 68,
                  height: 68,
                  borderRadius: 22,
                  background:
                    "linear-gradient(160deg, #ffe79d 0%, #ffb5d8 52%, #ffffff 100%)",
                  border: "4px solid #ffffff",
                  boxShadow: "0 14px 26px rgba(82, 50, 126, 0.24)",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                width: 130,
                height: 110,
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 82,
                  borderRadius: "16px 16px 8px 8px",
                  background: "#b79cff",
                }}
              />
              <div
                style={{
                  width: 52,
                  height: 102,
                  borderRadius: "20px 20px 8px 8px",
                  background: "linear-gradient(180deg, #ffb8df, #b79cff)",
                }}
              />
              <div
                style={{
                  width: 32,
                  height: 82,
                  borderRadius: "16px 16px 8px 8px",
                  background: "#b79cff",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
