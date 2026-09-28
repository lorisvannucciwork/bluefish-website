import Image from "next/image";
import { eventExperiences } from "@/data/eventsData";

export default function EventExperiences() {
  return (
    <section id="experiences" className="py-20 sm:py-28 relative overflow-hidden font-sans bg-[#FAF6F0]">
      {/* Texture background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(rgba(198,139,89,0.2) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2
              className="font-sans leading-tight"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "#0B203B",
              }}
            >
              Celebrated Moments at Blue Fish
            </h2>

            <p
              className="text-base sm:text-lg leading-relaxed font-light text-[#0B203B]/70"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Every gathering is custom-choreographed by our dedicated hospitality specialists,
              pairing coastal sophistication with artisanal gastronomy.
            </p>
          </div>

          <div className="space-y-12 lg:space-y-16">
            {eventExperiences.map((exp, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={exp.id}
                  className="flex flex-col rounded-[2.5rem] p-6 sm:p-10 lg:p-12 transition-all duration-500"
                  style={{
                    background: "linear-gradient(145deg, #FFFDF9, #F8F0E5)",
                    border: "1px solid rgba(198,139,89,0.25)",
                    boxShadow: "0 10px 40px rgba(139,80,40,0.06)",
                  }}
                >
                  {/* Top Split: Main Image & Details */}
                  <div
                    className={`flex flex-col ${
                      isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                    } items-center gap-8 lg:gap-14`}
                  >
                    {/* Photo Side */}
                    <div className="w-full lg:w-1/2 relative h-72 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg group">
                      <Image
                        src={exp.image}
                        alt={exp.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(11,32,59,0.5) 0%, transparent 60%)",
                        }}
                      />
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 space-y-4 sm:space-y-5">
                      <div className="text-xs font-sans tracking-[0.2em] uppercase font-bold text-[#C68B59]">
                        {exp.category}
                      </div>

                      <h3
                        className="font-sans text-2xl sm:text-3xl lg:text-4xl text-[#0B203B]"
                        style={{ lineHeight: 1.2 }}
                      >
                        {exp.title}
                      </h3>

                      <p className="text-sm sm:text-base italic text-[#C68B59] font-serif">
                        “{exp.tagline}”
                      </p>

                      <p
                        className="text-sm sm:text-base text-[#0B203B]/75 leading-relaxed font-light"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      >
                        {exp.description}
                      </p>
                    </div>
                  </div>

                  {/* 3 Images Next to Each Other in the Bottom of the Card */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#C68B59]/20">
                    {exp.gallery.map((galleryImg, gIdx) => (
                      <div
                        key={gIdx}
                        className="relative h-28 sm:h-40 lg:h-48 rounded-xl sm:rounded-2xl overflow-hidden shadow-md group cursor-pointer"
                      >
                        <Image
                          src={galleryImg}
                          alt={`${exp.title} photo ${gIdx + 1}`}
                          fill
                          sizes="(max-width: 768px) 33vw, 350px"
                          className="object-cover transition-transform duration-700 group-hover:scale-108"
                        />
                        <div
                          className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(11,32,59,0.3) 0%, transparent 60%)",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
