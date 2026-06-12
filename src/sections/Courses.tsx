import { useEffect, useRef, useState } from 'react';
import { BookOpen, ArrowRight, Clock, Users, Target,Pen } from 'lucide-react';

const courses = [
  {
    id: 'science-11-12',
    name: '11th & 12th Science Program',
    description:
      'Comprehensive coaching for Class 11th and 12th Science students with strong focus on Board exams, NEET, JEE, and competitive exam preparation.',
    image: '/images/course-jee.jpg',
    icon: Target,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    gradient: 'from-blue-600/20 to-blue-900/20',
    borderColor: 'border-blue-500/20',
    features: ['Board + NEET/JEE', 'Expert Faculty', 'Regular Tests'],
    duration: '2 Years',
    target: '11th & 12th Science',
  },
  {
    id: 'class-7-10',
    name: '7th to 10th Program',
    description:
      'Strong academic support for students from Class 7th to 10th with concept-based learning, school syllabus coverage, and scholarship exam preparation.',
    image: '/images/course-neet.jpg',
    icon: Pen,
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-400',
    gradient: 'from-orange-600/20 to-orange-900/20',
    borderColor: 'border-orange-500/20',
    features: ['School Excellence', 'Scholarship Prep', 'Concept Clarity'],
    duration: '4 Years',
    target: '7th - 10th',
  },
  {
    id: 'foundation',
    name: 'Foundation Program',
    description:
      'Advanced foundation course designed to build strong fundamentals, analytical thinking, and early preparation for future competitive examinations.',
    image: '/images/course-foundation.jpg',
    icon: BookOpen,
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
    gradient: 'from-purple-600/20 to-purple-900/20',
    borderColor: 'border-purple-500/20',
    features: ['Competitive Edge', 'Olympiad Prep', 'Future Ready'],
    duration: '3 Years',
    target: '8th-10th',
  },
];

export default function Courses() {
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
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-goldenrod" />
            <span className="text-royal font-body text-sm font-semibold uppercase tracking-wider">
              Our Programs
            </span>
            <span className="w-8 h-0.5 bg-goldenrod" />
          </div>
        <h2 className="font-display text-4xl md:text-5xl text-text-dark">
  Programs Designed for Academic Excellence
</h2>
          <p className="mt-4 text-text-muted font-body text-base md:text-lg max-w-2xl mx-auto">
  Structured learning programs for students from Class 7th to 12th, helping them achieve outstanding results in school academics and competitive examinations.
</p>
        </div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 border ${course.borderColor} transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
                <div className={`absolute inset-0 bg-gradient-to-t ${course.gradient} to-transparent`} />
                <div className={`absolute top-4 left-4 p-2.5 rounded-xl ${course.iconBg}`}>
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

                {/* Meta Tags */}
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

                {/* Stats Row */}
                <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-text-muted" />
                    <span className="text-text-muted font-body text-xs">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-text-muted" />
                    <span className="text-text-muted font-body text-xs">{course.target}</span>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#enquiry"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#enquiry')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-royal font-body text-sm font-semibold group-hover:gap-3 transition-all duration-300"
                >
                  Learn More
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
