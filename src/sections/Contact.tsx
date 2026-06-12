import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react';

const contactDetails = [
  {
    id: 'address',
    icon: MapPin,
    label: 'Address',
    value: 'Behind Ner Urban Bank, Near ch. Shivaji Statue, Shivaji Nagar, Ner, Dist.Yavatmal, Maharashtra, 445102',
    isPhoneGrid: false,
    href: null,
  },
  {
    id: 'phone',
    icon: Phone,
    label: 'Phone',
    // Storing the numbers in an array to map them individually for separate click actions
    numbers: ['+91 92842 94195', '+91 70830 71358', '+91 98765 43210'], 
    isPhoneGrid: true,
  },
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
    value: 'info@infinityclasses.edu.in',
    isPhoneGrid: false,
    href: 'mailto:info@infinityclasses.edu.in',
  },
  {
    id: 'hours',
    icon: Clock,
    label: 'Office Hours',
    value: 'Mon - Sat: 8:00 AM - 8:00 PM',
    isPhoneGrid: false,
    href: null,
  },
];

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/infinity_classes_ner?igsh=MW9oeGk4bzdzbmd1dw==', label: 'Instagram' },
];

export default function Contact() {
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
      id="contact"
      ref={sectionRef}
      className="section-padding bg-ivory py-16 md:py-24"
    >
      <div className="container-custom max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-14 md:mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-goldenrod" />
            <span className="text-royal font-body text-sm font-semibold uppercase tracking-wider">
              Contact Us
            </span>
            <span className="w-8 h-0.5 bg-goldenrod" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-text-dark font-bold">
            Visit Our Center
          </h2>
          <p className="mt-4 text-text-muted font-body text-base md:text-lg max-w-xl mx-auto">
            Drop by for a free counseling session or reach out to us through any channel.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
          {/* Contact Info */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card h-full flex flex-col justify-between">
              <div>
                <h3 className="font-body text-xl font-semibold text-text-dark mb-6">
                  Contact Information
                </h3>

                <div className="space-y-5">
                  {contactDetails.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-royal/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-royal" />
                      </div>
                      <div>
                        <span className="block font-body text-xs font-medium text-text-muted uppercase tracking-wide">
                          {item.label}
                        </span>
                        
                        {/* Render logic changes conditionally if it is the Phone block */}
                        {item.isPhoneGrid && item.numbers ? (
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 font-body text-sm text-text-dark">
                            {item.numbers.map((num, idx) => (
                              <div key={num} className="flex items-center">
                                <a
                                  href={`tel:${num.replace(/\s+/g, '')}`}
                                  className="hover:text-royal transition-colors"
                                >
                                  {num}
                                </a>
                                {idx < item.numbers.length - 1 && (
                                  <span className="text-gray-300 ml-2 select-none">/</span>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : item.href ? (
                          <a
                            href={item.href}
                            className="block font-body text-sm text-text-dark hover:text-royal transition-colors mt-0.5"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="block font-body text-sm text-text-dark mt-0.5">
                            {item.value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <span className="block font-body text-xs font-medium text-text-muted uppercase tracking-wide mb-4">
                  Follow Us
                </span>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full bg-royal/10 flex items-center justify-center text-royal hover:bg-royal hover:text-white transition-all duration-300"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div
            className={`transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-card h-full min-h-[400px]">
              <iframe
                title="Infinity Classes Location"
                src="https://maps.google.com/maps?q=Behind%20Ner%20Urban%20Bank,%20Near%20ch.%20Shivaji%20Statue,%20Shivaji%20Nagar,%20Ner,%20Dist.Yavatmal,%20Maharashtra,%20445102&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}