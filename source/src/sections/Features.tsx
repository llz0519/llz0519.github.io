import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
import { WordsPullUpMultiStyle } from "@/components/WordsPullUpMultiStyle";

const cardEase = [0.22, 1, 0.36, 1] as const;

interface FeatureCardProps {
  children: React.ReactNode;
  index: number;
  className?: string;
}

function FeatureCard({ children, index, className = "" }: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: cardEase,
      }}
      className={`bg-[#212121] rounded-2xl overflow-hidden flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface CheckItemProps {
  text: string;
}

function CheckItem({ text }: CheckItemProps) {
  return (
    <li className="flex items-start gap-3">
      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
      <span className="text-gray-400 text-xs sm:text-sm">{text}</span>
    </li>
  );
}

export function Features() {
  return (
    <section className="relative min-h-screen bg-black py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8">
      {/* Noise background */}
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 sm:mb-12 md:mb-16 text-center">
          <WordsPullUpMultiStyle
            segments={[
              {
                text: "Studio-grade workflows for visionary creators.",
                className: "text-primary",
              },
              {
                text: "Built for pure vision. Powered by art.",
                className: "text-gray-500",
              },
            ]}
            containerClassName="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal"
          />
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
          {/* Card 1 - Video card */}
          <FeatureCard index={0} className="relative lg:row-span-1 min-h-[280px] lg:min-h-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="relative mt-auto p-5 sm:p-6">
              <p className="text-[#E1E0CC] text-sm sm:text-base font-medium">
                Your creative canvas.
              </p>
            </div>
          </FeatureCard>

          {/* Card 2 - Project Storyboard */}
          <FeatureCard index={1} className="p-5 sm:p-6 justify-between">
            <div>
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
                alt="Storyboard icon"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-4"
              />
              <h3 className="text-[#E1E0CC] text-lg sm:text-xl font-medium mb-1">
                Project Storyboard.
              </h3>
              <span className="text-gray-500 text-xs">01</span>
              <ul className="mt-4 space-y-3">
                <CheckItem text="Organize scenes and sequences with drag-and-drop boards" />
                <CheckItem text="Sync storyboards with scripts and shot lists" />
                <CheckItem text="Collaborate in real time with your team" />
                <CheckItem text="Export to PDF, PNG, or industry formats" />
              </ul>
            </div>
            <a
              href="#"
              className="flex items-center gap-2 text-primary text-xs sm:text-sm mt-6 hover:opacity-80 transition-opacity"
            >
              <span>Learn more</span>
              <ArrowRight className="w-3 h-3 -rotate-45" />
            </a>
          </FeatureCard>

          {/* Card 3 - Smart Critiques */}
          <FeatureCard index={2} className="p-5 sm:p-6 justify-between">
            <div>
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
                alt="Smart Critiques icon"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-4"
              />
              <h3 className="text-[#E1E0CC] text-lg sm:text-xl font-medium mb-1">
                Smart Critiques.
              </h3>
              <span className="text-gray-500 text-xs">02</span>
              <ul className="mt-4 space-y-3">
                <CheckItem text="AI-powered visual analysis for composition and color" />
                <CheckItem text="Leave time-coded creative notes on any frame" />
                <CheckItem text="Integrates with Premiere, DaVinci, and Final Cut" />
              </ul>
            </div>
            <a
              href="#"
              className="flex items-center gap-2 text-primary text-xs sm:text-sm mt-6 hover:opacity-80 transition-opacity"
            >
              <span>Learn more</span>
              <ArrowRight className="w-3 h-3 -rotate-45" />
            </a>
          </FeatureCard>

          {/* Card 4 - Immersion Capsule */}
          <FeatureCard index={3} className="p-5 sm:p-6 justify-between">
            <div>
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
                alt="Immersion Capsule icon"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-4"
              />
              <h3 className="text-[#E1E0CC] text-lg sm:text-xl font-medium mb-1">
                Immersion Capsule.
              </h3>
              <span className="text-gray-500 text-xs">03</span>
              <ul className="mt-4 space-y-3">
                <CheckItem text="Silence all notifications during deep creative sessions" />
                <CheckItem text="Curated ambient soundscapes for focus and flow" />
                <CheckItem text="Auto-sync with your calendar for uninterrupted blocks" />
              </ul>
            </div>
            <a
              href="#"
              className="flex items-center gap-2 text-primary text-xs sm:text-sm mt-6 hover:opacity-80 transition-opacity"
            >
              <span>Learn more</span>
              <ArrowRight className="w-3 h-3 -rotate-45" />
            </a>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}
