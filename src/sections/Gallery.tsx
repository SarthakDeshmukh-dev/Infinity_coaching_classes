'use client';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { galleryData } from '@/data/galleryData';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function Gallery() {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [lightboxLoading, setLightboxLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
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
    setLightboxLoading(true);
    setSelectedImageIndex((prev) =>
      prev === null ? 0 : prev === 0 ? galleryData.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setLightboxLoading(true);
    setSelectedImageIndex((prev) =>
      prev === null ? 0 : (prev + 1) % galleryData.length
    );
  };

  return (
    <>
      <section
        ref={sectionRef}
        className={`py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-ivory transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-12 md:mb-16 text-center">
            <div className="inline-flex items-center justify-center gap-2 mb-4">
              <span className="w-8 h-0.5 bg-goldenrod" />
              <span className="text-royal font-body text-sm font-semibold uppercase">
                {t('gallery.badge')}
              </span>
              <span className="w-8 h-0.5 bg-goldenrod" />
            </div>

            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-dark mb-4">
              {t('gallery.title')}
            </h2>

            <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto">
              {t('gallery.description')}
            </p>
          </div>
          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {galleryData.map((item, index) => (
              <div
                key={item.id}
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer transform hover:scale-105 ${isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
                  }`}
                style={{
                  transitionDelay: isVisible ? `${300 + index * 100}ms` : '0ms',
                }}
                onClick={() => {
                  setLightboxLoading(true);
                  setSelectedImageIndex(index);
                }}              >
                {/* Image Container */}
                <div className="aspect-square overflow-hidden relative">
                  {!loadedImages[index] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
                      <div className="w-10 h-10 border-4 border-gray-300 border-t-royal rounded-full animate-spin" />
                    </div>
                  )}

                  <img
                    src={item.image}
                    loading="lazy"
                    onLoad={() =>
                      setLoadedImages((prev) => ({
                        ...prev,
                        [index]: true,
                      }))
                    }
                    className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ${loadedImages[index] ? 'opacity-100' : 'opacity-0'
                      }`}
                  />
                </div>

                {/* Overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-[#000814]/90 via-[#000814]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white">
                    <p className="text-sm font-semibold uppercase tracking-wide">
                      {item}
                    </p>
                    <p className="text-xs text-gray-300 mt-1 capitalize">
                      {item.category === 'class' ? 'Class' : 'Facility'}
                    </p>
                  </div>
                </div> */}

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
            className="relative max-w-6xl w-full h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Counter */}
            <div className="absolute top-4 left-4 z-20 text-white text-sm font-medium bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
              {selectedImageIndex + 1} / {galleryData.length}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="Close gallery"
            >
              <X size={24} />
            </button>

            {/* Previous Button */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-3 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-3 rounded-full transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image */}
            <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
              {lightboxLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}

              <img
                src={galleryData[selectedImageIndex].image}
                onLoad={() => setLightboxLoading(false)}
                className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${lightboxLoading ? 'opacity-0' : 'opacity-100'
                  }`}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
