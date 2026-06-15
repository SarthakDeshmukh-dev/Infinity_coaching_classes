'use client';

import { useEffect, useRef, useState } from 'react';
import { galleryData } from '@/data/galleryData';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for visibility animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) =>
          prev === null ? 0 : prev === 0 ? galleryData.length - 1 : prev - 1
        );
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) =>
          prev === null ? 0 : (prev + 1) % galleryData.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === null ? 0 : prev === 0 ? galleryData.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === null ? 0 : (prev + 1) % galleryData.length
    );
  };

  return (
    <>
      <section
        ref={sectionRef}
        className={`py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-ivory transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-0.5 bg-goldenrod" />
              <span className="text-royal font-body text-sm font-semibold uppercase">
                Gallery
              </span>
              <span className="w-8 h-0.5 bg-goldenrod" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-dark mb-4">
              Coaching in Action
            </h2>
            <p className="text-text-muted text-lg md:text-xl max-w-2xl">
              See our world-class facilities, dedicated faculty, and vibrant student community
              in action.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {galleryData.map((item, index) => (
              <div
                key={item.id}
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isVisible ? `${300 + index * 100}ms` : '0ms',
                }}
                onClick={() => setSelectedImageIndex(index)}
              >
                {/* Image Container */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#000814]/90 via-[#000814]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white">
                    <p className="text-sm font-semibold uppercase tracking-wide">
                      {item.alt}
                    </p>
                    <p className="text-xs text-gray-300 mt-1 capitalize">
                      {item.category === 'class' ? 'Class' : 'Facility'}
                    </p>
                  </div>
                </div>

                {/* Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 rounded-full p-3">
                    <svg
                      className="w-6 h-6 text-royal"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImageIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-white text-sm font-medium">
                {selectedImageIndex + 1} / {galleryData.length}
              </div>
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="text-white hover:text-gray-300 transition-colors p-2 -mr-2 -mt-2"
              >
                <X size={24} />
              </button>
            </div>

            {/* Image Container */}
            <div className="flex-1 flex items-center justify-center min-h-0 mb-4">
              <img
                src={galleryData[selectedImageIndex].image}
                alt={galleryData[selectedImageIndex].alt}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Footer with Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevImage}
                className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="text-center flex-1 px-4">
                <p className="text-white font-semibold">
                  {galleryData[selectedImageIndex].alt}
                </p>
                <p className="text-gray-400 text-sm mt-1 capitalize">
                  {galleryData[selectedImageIndex].category === 'class'
                    ? 'Class Session'
                    : 'Facility'}
                </p>
              </div>

              <button
                onClick={handleNextImage}
                className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
