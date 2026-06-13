import { useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  Clock,
  Target,
  Pen,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Courses() {
  const { t } = useTranslation();

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const courses = [
    {
      id: 'science-11-12',
      name: t('courses.items.science.name'),
      description: t('courses.items.science.description'),
      image: '/images/course-jee.jpg',
      icon: Target,
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      gradient: 'from-blue-600/20 to-blue-900/20',
      borderColor: 'border-blue-500/20',
      features: t('courses.items.science.features', {
        returnObjects: true,
      }) as string[],
      duration: t('courses.items.science.duration'),
      target: t('courses.items.science.target'),
    },
    {
      id: 'class-7-10',
      name: t('courses.items.school.name'),
      description: t('courses.items.school.description'),
      image: '/images/course-neet.jpg',
      icon: Pen,
      iconBg: 'bg-orange-500/10',
      iconColor: 'text-orange-400',
      gradient: 'from-orange-600/20 to-orange-900/20',
      borderColor: 'border-orange-500/20',
      features: t('courses.items.school.features', {
        returnObjects: true,
      }) as string[],
      duration: t('courses.items.school.duration'),
      target: t('courses.items.school.target'),
    },
    {
      id: 'foundation',
      name: t('courses.items.foundation.name'),
      description: t('courses.items.foundation.description'),
      image: '/images/course-foundation.jpg',
      icon: BookOpen,
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-400',
      gradient: 'from-purple-600/20 to-purple-900/20',
      borderColor: 'border-purple-500/20',
      features: t('courses.items.foundation.features', {
        returnObjects: true,
      }) as string[],
      duration: t('courses.items.foundation.duration'),
      target: t('courses.items.foundation.target'),
    },
  ];

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

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="courses"
      ref={sectionRef}
      className="section-padding bg-ivory"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div
          className={`text-center mb-14 md:mb-20 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-goldenrod" />
            <span className="text-royal font-body text-sm font-semibold uppercase tracking-wider">
              {t('courses.sectionTitle')}
            </span>
            <span className="w-8 h-0.5 bg-goldenrod" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl text-text-dark">
            {t('courses.heading')}
          </h2>

          <p className="mt-4 text-text-muted font-body text-base md:text-lg max-w-2xl mx-auto">
            {t('courses.description')}
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 border ${course.borderColor} transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              {/* Image Banner */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div
                  className={`absolute inset-0 bg-gradient-to-t ${course.gradient} to-transparent`}
                />

                <div
                  className={`absolute top-4 left-4 p-2.5 rounded-xl ${course.iconBg}`}
                >
                  <course.icon className={`w-6 h-6 ${course.iconColor}`} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-body text-xl font-semibold text-text-dark mb-2">
                  {course.name}
                </h3>

                <p className="text-text-muted font-body text-sm leading-relaxed mb-4">
                  {course.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {course.features.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-text-muted font-body text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-text-muted" />
                    <span className="text-text-muted font-body text-xs">
                      {course.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-text-muted" />
                    <span className="text-text-muted font-body text-xs">
                      {course.target}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#enquiry"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector('#enquiry')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-royal font-body text-sm font-semibold group-hover:gap-3 transition-all duration-300"
                >
                  {t('courses.learnMore')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}