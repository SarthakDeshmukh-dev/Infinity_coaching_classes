import { useEffect, useRef, useState } from 'react';
import { Quote, Star } from 'lucide-react';

const featuredTestimonial = {
  name: 'Riya Sharma',
  rank: 'AIR 47 NEET 2024',
  image: '/images/testimonial-student-1.jpg',
  text: 'Infinity Classes transformed my preparation entirely. The faculty went above and beyond, conducting extra doubt sessions even on weekends. Their structured test series and personalized feedback helped me identify and work on my weak areas. I owe my success to the mentors who believed in me when I doubted myself.',
  rating: 5,
};

const smallTestimonials = [
  {
    name: 'Aditya Patel',
    rank: 'AIR 156 JEE Advanced 2024',
    image: '/images/testimonial-student-2.jpg',
    text: 'The problem-solving techniques taught here are unmatched. I went from barely clearing mains to a top 200 rank. The faculty genuinely cares about every student.',
    rating: 5,
  },
  {
    name: 'Kavya Gupta',
    rank: 'AIR 89 NEET 2024',
    image: '/images/student-result-4.jpg',
    text: 'Personalized attention in small batches made all the difference. My mentor tracked my progress weekly and adjusted my study plan accordingly.',
    rating: 5,
  },
  {
    name: 'Arjun Reddy',
    rank: 'AIR 234 JEE Main 2024',
    image: '/images/student-result-5.jpg',
    text: 'The mock test series here is incredibly close to the actual exam. By the time I sat for JEE, it felt like just another practice test.',
    rating: 5,
  },
];

export default function Testimonials() {
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
      id="testimonials"
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
              Testimonials
            </span>
            <span className="w-8 h-0.5 bg-goldenrod" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-text-dark">
            What Our Students Say
          </h2>
          <p className="mt-4 text-text-muted font-body text-base md:text-lg max-w-xl mx-auto">
            Real stories from real achievers who started their journey with Infinity.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Featured Testimonial - Left */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="h-full bg-white rounded-3xl p-7 md:p-10 shadow-card relative overflow-hidden">
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-20 h-20 text-royal" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(featuredTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-goldenrod fill-goldenrod" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-text-dark font-body text-base md:text-lg leading-relaxed mb-8 relative z-10">
                "{featuredTestimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <img
                  src={featuredTestimonial.image}
                  alt={featuredTestimonial.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-royal/20"
                />
                <div>
                  <h4 className="font-body text-base font-semibold text-text-dark">
                    {featuredTestimonial.name}
                  </h4>
                  <p className="font-body text-sm text-royal font-medium">
                    {featuredTestimonial.rank}
                  </p>
                </div>
              </div>

              {/* Left accent border */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-royal to-goldenrod rounded-l-3xl" />
            </div>
          </div>

          {/* Small Testimonials - Right */}
          <div className="flex flex-col gap-5">
            {smallTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`bg-white rounded-2xl p-5 md:p-6 shadow-card relative overflow-hidden transition-all duration-700 hover:shadow-card-hover hover:-translate-y-0.5 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
                style={{ transitionDelay: `${500 + index * 150}ms` }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-goldenrod fill-goldenrod" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-text-dark/80 font-body text-sm leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-body text-sm font-semibold text-text-dark">
                      {testimonial.name}
                    </h4>
                    <p className="font-body text-xs text-royal font-medium">
                      {testimonial.rank}
                    </p>
                  </div>
                </div>

                {/* Left accent border */}
                <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-goldenrod/60 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
