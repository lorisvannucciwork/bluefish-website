export default function EventsHero() {
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 w-full flex-1 flex flex-col justify-end">
        {/* Main headline — split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-end w-full">
          {/* Left: Main Title */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start self-center py-6 sm:py-10 lg:py-16 z-10">
            <h1
              className="font-sans leading-none"
              style={{
                fontSize: "clamp(3.2rem, 8.5vw, 7.2rem)",
                color: "#FAF6F0",
                lineHeight: 1.0,
                marginBottom: "1.5rem",
                textShadow: "0 4px 24px rgba(0,0,0,0.45)",
              }}
            >
              Bluefish{" "}
              <span style={{ color: "#C68B59" }}>Upcoming</span>
              <br />
              Event
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
                live guitar
              </span>
            </p>
          </div>

          {/* Right: Live Performer emerging from bottom */}
          <div className="lg:col-span-5 flex items-end justify-center lg:justify-end relative">
            <div className="relative flex items-end justify-center lg:justify-end shrink-0 -mb-10 sm:-mb-12 lg:-mb-16 xl:-mb-20 2xl:-mb-24 lg:-mr-6 xl:-mr-14 2xl:-mr-20 select-none pointer-events-none">
              {/* Warm Golden Stage Backlight Glow */}
              <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] lg:w-[620px] lg:h-[620px] xl:w-[720px] xl:h-[720px] rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(198, 139, 89, 0.45) 0%, rgba(224, 128, 80, 0.2) 45%, transparent 70%)",
                  filter: "blur(45px)",
                }}
              />

              {/* Singer Cutout Image */}
              <img
                src="/images/elements/singer.png"
                alt="Live Acoustic Performance at Blue Fish Sunset Sessions"
                className="relative z-10 w-[350px] sm:w-[420px] md:w-[480px] lg:w-[560px] xl:w-[650px] 2xl:w-[740px] max-h-[68vh] sm:max-h-[74vh] lg:max-h-[88vh] xl:max-h-[92vh] object-contain object-bottom transition-transform duration-700 hover:scale-[1.02] pointer-events-auto"
                style={{
                  filter:
                    "drop-shadow(0 25px 40px rgba(0, 0, 0, 0.7)) drop-shadow(0 4px 18px rgba(198, 139, 89, 0.3))",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* === WAVE BOTTOM BORDER === */}
      <div className="relative z-20" style={{ marginTop: "-2px", lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "80px" }}
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="#F5EFE7"
          />
        </svg>
      </div>
    </section>
  );
}
