export default function MenuHero() {
  return (
    <section
      className="relative overflow-hidden font-sans min-h-screen min-h-svh w-full flex flex-col justify-between pt-24 sm:pt-28"
    >
      {/* Background Hero Image */}
      <img
        alt="Blue Fish Port Ghalib Marina Waterfront"
        src="/images/hero/hero.png"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay for contrast & readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,32,59,0.5) 0%, rgba(11,32,59,0.3) 40%, rgba(7,20,40,0.7) 100%)",
        }}
      />

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 my-auto w-full">
        {/* Main headline — split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Main Title */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            <h1
              className="font-sans leading-none"
              style={{
                fontSize: "clamp(3.5rem, 9.5vw, 7.5rem)",
                color: "#FAF6F0",
                lineHeight: 1.0,
                marginBottom: "1.5rem",
                textShadow: "0 4px 24px rgba(0,0,0,0.45)",
              }}
            >
              Bluefish{" "}
              <span style={{ color: "#C68B59" }}>Dish</span>
              <br />
              of the Day
            </h1>

            <p
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                color: "rgba(250,246,240,0.85)",
                fontFamily: "var(--font-montserrat), sans-serif",
                lineHeight: 1.6,
                textShadow: "0 2px 12px rgba(0,0,0,0.4)",
              }}
            >
              is{" "}
              <span
                style={{
                  color: "#C68B59",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                }}
              >
                xxxxxx
              </span>
            </p>
          </div>

          {/* Right: Plate Element */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[350px] lg:h-[350px] xl:w-[420px] xl:h-[420px] drop-shadow-[0_25px_40px_rgba(0,0,0,0.6)]">
              <img
                src="/images/elements/plate.png"
                alt="Blue Fish Artisanal Plate"
                className="w-full h-full object-contain pointer-events-none select-none transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* === WAVE BOTTOM BORDER === */}
      <div className="relative z-10" style={{ marginTop: "-2px", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#F5EFE7" />
        </svg>
      </div>
    </section>
  );
}

