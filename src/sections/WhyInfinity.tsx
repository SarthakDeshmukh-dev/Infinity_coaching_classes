import { useEffect, useRef, useState } from 'react';
import {
  Users,
  Heart,
  ClipboardCheck,
  TrendingUp,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function WhyInfinity() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Users,
      title: t('whyInfinity.features.expertFaculty.title'),
      description: t('whyInfinity.features.expertFaculty.description'),
    },
    {
      icon: Heart,
      title: t('whyInfinity.features.personalizedAttention.title'),
      description: t('whyInfinity.features.personalizedAttention.description'),
    },
    {
      icon: ClipboardCheck,
      title: t('whyInfinity.features.rigorousTesting.title'),
      description: t('whyInfinity.features.rigorousTesting.description'),
    },
    {
      icon: TrendingUp,
      title: t('whyInfinity.features.provenResults.title'),
      description: t('whyInfinity.features.provenResults.description'),
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-space relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            className={`text-center transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 mb-4 justify-center">
              <span className="w-8 h-0.5 bg-goldenrod"></span>

              <span className="text-goldenrod font-body text-sm font-semibold uppercase tracking-wider">
                {t('whyInfinity.sectionTitle')}
              </span>

              <span className="w-8 h-0.5 bg-goldenrod"></span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
              {t('whyInfinity.headingPrefix')}{' '}
              <span className="relative inline-block">
                {t('whyInfinity.headingHighlight')}
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-goldenrod/60 rounded-full"></span>
              </span>
            </h2>

            <p className="mt-6 text-white/60 text-base md:text-lg max-w-2xl mx-auto">
              {t('whyInfinity.description')}
            </p>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className={`group flex gap-5 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-goldenrod/30 transition-all duration-700 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${300 + index * 150}ms`,
                  }}
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-goldenrod/10 transition-all duration-300">
                    <Icon className="w-6 h-6 text-goldenrod" />
                  </div>

                  <div>
                    <h3 className="font-body text-lg md:text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>

                    <p className="text-white/60 font-body text-sm md:text-base leading-relaxed">
                      {feature.description}
                    </p>
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