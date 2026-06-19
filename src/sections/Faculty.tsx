import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Faculty() {
  const { t } = useTranslation();

  const faculty = [
    {
      name: t('faculty.members.vaishnav.name'),
      subject: t('faculty.members.vaishnav.subject'),
      experience: t('faculty.members.vaishnav.experience'),
      credential: t('faculty.members.vaishnav.credential'),
      image: '/images/faculty-1.jpeg',
      tagColor: 'bg-red-100 text-red-700',
      borderColor: 'group-hover:border-red-400/50',
    },
    {
      name: t('faculty.members.Vivek.name'),
      subject: t('faculty.members.Vivek.subject'),
      experience: t('faculty.members.Vivek.experience'),
      credential: t('faculty.members.Vivek.credential'),
      image: '/images/faculty-2.jpeg',
      tagColor: 'bg-teal-100 text-teal-700',
      borderColor: 'group-hover:border-teal-400/50',
    },
    {
      name: t('faculty.members.Lochan.name'),
      subject: t('faculty.members.Lochan.subject'),
      experience: t('faculty.members.Lochan.experience'),
      credential: t('faculty.members.Lochan.credential'),
      image: '/images/faculty-3.jpeg',
      tagColor: 'bg-orange-100 text-orange-700',
      borderColor: 'group-hover:border-orange-400/50',
    },
    {
      name: t('faculty.members.Sanika.name'),
      subject: t('faculty.members.Sanika.subject'),
      experience: t('faculty.members.Sanika.experience'),
      credential: t('faculty.members.Sanika.credential'),
      image: '/images/faculty-4.jpeg',
      tagColor: 'bg-emerald-100 text-emerald-700',
      borderColor: 'group-hover:border-emerald-400/50',
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;

      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;

      const totalScrollableWidth = scrollWidth - clientWidth;

      if (totalScrollableWidth <= 0) return;

      const percentage = scrollLeft / totalScrollableWidth;
      const nextIndex = Math.round(
        percentage * (faculty.length - 1)
      );

      setActiveIndex(nextIndex);
    };

    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, {
        passive: true,
      });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener(
          'scroll',
          handleScroll
        );
      }
    };
  }, [faculty.length]);

  return (
    <section
      id="faculty"
      ref={sectionRef}
      className="section-padding bg-space relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-14 md:mb-20 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-goldenrod" />
            <span className="text-goldenrod font-body text-sm font-semibold uppercase tracking-wider">
              {t('faculty.sectionTitle')}
            </span>
            <span className="w-8 h-0.5 bg-goldenrod" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl text-white">
            {t('faculty.heading')}
          </h2>

          <p className="mt-4 text-white/60 font-body text-base md:text-lg max-w-xl mx-auto">
            {t('faculty.description')}
          </p>
        </div>

        {/* Faculty Cards */}
        <div
          ref={scrollRef}
          className="flex lg:grid lg:grid-cols-4 gap-5 md:gap-6 overflow-x-auto pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {faculty.map((member, index) => (
            <div
              key={member.name}
              className={`group flex-shrink-0 w-72 lg:w-auto snap-center transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${300 + index * 150}ms`,
              }}
            >
              <div
                className={`relative bg-navy/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 ${member.borderColor}`}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />

                  {/* Subject */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full font-body text-xs font-semibold ${member.tagColor}`}
                    >
                      {member.subject}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-body text-lg font-semibold text-white group-hover:text-goldenrod transition-colors duration-300">
                    {member.name}
                  </h3>

                  <p className="text-white/50 font-body text-xs mt-1">
                    {member.credential}
                  </p>

                  {/* <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-goldenrod font-body text-sm font-medium">
                      {member.experience}
                    </span>

                    <span className="text-white/40 font-body text-xs">
                      {t('faculty.experienceLabel')}
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Indicator */}
        <div className="flex justify-center mt-6 lg:hidden">
          <div className="flex gap-1.5">
            {faculty.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  i === activeIndex
                    ? 'bg-goldenrod'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}