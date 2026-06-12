import { useEffect, useRef, useState } from 'react';
import { Medal } from 'lucide-react';

const results = [
  {
    name: 'Aarav Sharma',
    rank: 'AIR 47',
    exam: 'NEET 2024',
    image: '/images/student-result-1.jpg',
  },
  {
    name: 'Priya Patel',
    rank: 'AIR 128',
    exam: 'JEE Advanced 2024',
    image: '/images/student-result-2.jpg',
  },
  {
    name: 'Rohan Gupta',
    rank: 'AIR 89',
    exam: 'NEET 2024',
    image: '/images/student-result-3.jpg',
  },
  {
    name: 'Ananya Reddy',
    rank: 'AIR 234',
    exam: 'JEE Advanced 2024',
    image: '/images/student-result-4.jpg',
  },
  {
    name: 'Vikram Singh',
    rank: 'AIR 156',
    exam: 'NEET 2024',
    image: '/images/student-result-5.jpg',
  },
  {
    name: 'Sneha Iyer',
    rank: 'AIR 312',
    exam: 'JEE Main 2024',
    image: '/images/student-result-6.jpg',
  },
];

export default function ResultsGallery() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="results"
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
              Achievements
            </span>
            <span className="w-8 h-0.5 bg-goldenrod" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-text-dark">
            Our Star Achievers
          </h2>
          <p className="mt-4 text-text-muted font-body text-base md:text-lg max-w-xl mx-auto">
            Celebrating the success stories of students who trusted Infinity and reached the stars.
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {results.map((student, index) => (
            <div
              key={student.name}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: `${300 + index * 120}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#000814]/90 via-[#000814]/20 to-transparent" />

                {/* Rank Badge - Top Right */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-goldenrod rounded-full">
                  <Medal className="w-3.5 h-3.5 text-[#000814]" />
                  <span className="font-body text-xs font-bold text-[#000814]">
                    {student.rank}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-royal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <span className="block font-display text-4xl text-goldenrod">
                      {student.rank}
                    </span>
                    <span className="block font-body text-sm text-white/80 mt-1">
                      {student.exam}
                    </span>
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-body text-base md:text-lg font-semibold text-white">
                    {student.name}
                  </h3>
                  <p className="font-body text-xs md:text-sm text-white/60 mt-0.5">
                    {student.exam}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div
          className={`mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { label: 'Total Selections', value: '5000+' },
            { label: 'Top 100 Ranks', value: '48' },
            { label: 'Top 500 Ranks', value: '187' },
            { label: 'Success Rate', value: '94%' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 md:p-6 bg-white rounded-2xl shadow-card"
            >
              <span className="block font-display text-3xl md:text-4xl text-royal">
                {stat.value}
              </span>
              <span className="block font-body text-sm text-text-muted mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
