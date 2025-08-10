import { ImageResponse } from "next/og";
import { getHeroPhotoUrl } from "@/lib/convex-server";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const photoUrl = await getHeroPhotoUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0b0b0b",
          color: "#ffffff",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 64, fontWeight: 800, display: "flex" }}>
            <span>Abogada</span>
            <span style={{ color: "#7c3aed" }}> Tech</span>
          </div>
          <div style={{ fontSize: 28, opacity: 0.85, maxWidth: 700 }}>
            Soy una abogada especializada en derecho tecnológico, asesoría legal
            para startups, empresas de software y protección de datos.
          </div>
          <div style={{ marginTop: 24, fontSize: 22, color: "#c4b5fd" }}>
            Linda M. Armesto
          </div>
        </div>
        <div
          style={{
            width: 320,
            height: 320,
            background: "#111",
            borderRadius: 24,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 40px rgba(124,58,237,0.35)",
          }}
        >
          {photoUrl ? (
            <img
              src={photoUrl}
              width={320}
              height={320}
              alt="Foto de perfil"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 120,
                color: "#7c3aed",
                background: "#0d0d0d",
                overflow: "hidden",
              }}
            >
              <span style={{ display: "flex" }}>LM</span>
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
