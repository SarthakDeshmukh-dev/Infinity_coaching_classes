import { useRef, useState, useEffect } from 'react';
import {
  Award,
  Users,
  Building2,
  MapPin,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ParticleGalaxy from '@/components/ParticleGalaxy';

export default function Hero() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Award,
      value: '15+',
      label: t('hero.stats.years'),
      color: 'text-goldenrod',
    },
    {
      icon: Users,
      value: '5000+',
      label: t('hero.stats.selections'),
      color: 'text-goldenrod',
    },
    {
      icon: Building2,
      value: '50+',
      label: t('hero.stats.faculty'),
      color: 'text-goldenrod',
    },
    {
      icon: MapPin,
      value: '3',
      label: t('hero.stats.centers'),
      color: 'text-goldenrod',
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [, setWarpActive] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleExploreClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();

    const el = document.querySelector('#courses');

    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      <ParticleGalaxy containerRef={containerRef} />

      <div className="relative z-10 flex flex-col justify-end min-h-screen pb-12 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Heading */}
            <h1
              className={`transition-all duration-1000 delay-200 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                textShadow:
                  '0 2px 20px rgba(0,8,20,0.8)',
              }}
            >
              <span className="block font-display text-5xl sm:text-6xl md:text-7xl lg:text-[80px] text-white leading-[1.1]">
                {t('hero.headingLine1')}
              </span>

              <span className="block font-display text-5xl sm:text-6xl md:text-7xl lg:text-[80px] gradient-text leading-[1.1] mt-1">
                {t('hero.headingLine2')}
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={`mt-6 text-white/70 font-body text-base md:text-lg leading-relaxed max-w-xl transition-all duration-1000 delay-400 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                textShadow:
                  '0 1px 10px rgba(0,8,20,0.6)',
              }}
            >
              {t('hero.description')}
            </p>

            {/* CTA */}
            <div
              className={`mt-8 flex flex-wrap gap-4 transition-all duration-1000 delay-600 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <a
                href="#courses"
                onClick={handleExploreClick}
                onMouseEnter={() => setWarpActive(true)}
                onMouseLeave={() => setWarpActive(false)}
                className="inline-flex items-center px-7 py-3.5 bg-royal text-white font-body text-base font-semibold rounded-full hover:bg-bright hover:scale-[1.02] transition-all duration-300 shadow-glow"
              >
                {t('hero.exploreCourses')}
              </a>
            </div>

            {/* Uncomment if you use stats */}
            {/*
            <div
              className={`mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 transition-all duration-1000 delay-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-start p-3 md:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <stat.icon
                    className={`w-5 h-5 ${stat.color} mb-2`}
                  />

                  <span className="font-body text-2xl md:text-3xl font-bold text-goldenrod">
                    {stat.value}
                  </span>

                  <span className="font-body text-sm text-white/60 mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
            */}
          </div>
        </div>
      </div>
    </section>
  );
}