import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { key: 'navbar.home', href: '#home' },
  { key: 'navbar.courses', href: '#courses' },
  { key: 'navbar.faculty', href: '#faculty' },
  { key: 'navbar.about', href: '#about' },
  { key: 'navbar.contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMenuOpen(false);

      const el = document.querySelector(href);

      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    []
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-[#000814]/80 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
          }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-18 md:h-20 items-center justify-between">
            {/* Logo */}
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center gap-3 group"
              onClick={(e) => handleNavClick(e, '#home')}
            >
              <img
                src="/images/logo.png"
                alt="Infinity Coaching Classes"
                className="h-12 w-auto md:h-14 object-contain"
              />

              <div className="flex items-center">
                {/* Infinity */}
                <span
                  className="text-white font-bold tracking-tight"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '2.25rem',
                    lineHeight: 1,
                  }}
                >
                  Infinity
                </span>

                {/* Coaching + Classes */}
                <div className="flex flex-col ml-2 leading-none">
                  <span
                    className="text-goldenrod font-medium"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '0.65rem', // roughly half of Classes
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Coaching
                  </span>

                  <span
                    className="text-goldenrod font-semibold"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '1.2rem',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Classes
                  </span>
                </div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative font-body text-[15px] font-medium text-white/80 hover:text-goldenrod transition-colors duration-300 group"
                >
                  {t(link.key)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-goldenrod transition-all duration-300 group-hover:w-full" />
                </a>
              ))}

              {/* Language Switcher */}
              <div className="flex items-center rounded-full border border-white/20 bg-white/5 overflow-hidden">
                <button
                  onClick={() => i18n.changeLanguage('en')}
                  className={`px-3 py-1.5 text-sm font-medium transition-all ${i18n.language === 'en'
                    ? 'bg-goldenrod text-[#000814]'
                    : 'text-white hover:text-goldenrod'
                    }`}
                >
                  EN
                </button>

                <button
                  onClick={() => i18n.changeLanguage('mr')}
                  className={`px-3 py-1.5 text-sm font-medium transition-all ${i18n.language === 'mr'
                    ? 'bg-goldenrod text-[#000814]'
                    : 'text-white hover:text-goldenrod'
                    }`}
                >
                  मराठी
                </button>
              </div>
            </div>

            {/* CTA + Mobile Menu */}
            <div className="flex items-center gap-4">
              <a
                href="#enquiry"
                onClick={(e) => handleNavClick(e, '#enquiry')}
                className="hidden sm:inline-flex items-center px-5 py-2.5 bg-royal text-white font-body text-sm font-semibold rounded-full hover:bg-bright hover:scale-[1.02] transition-all duration-300 shadow-glow"
              >
                {t('navbar.enquiry')}
              </a>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 text-white hover:text-goldenrod transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#000814]/98 backdrop-blur-xl transition-all duration-500 lg:hidden ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-display text-3xl text-white hover:text-goldenrod transition-all duration-300"
              style={{
                animationDelay: `${index * 80}ms`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.4s ease ${index * 80
                  }ms, transform 0.4s ease ${index * 80}ms`,
              }}
            >
              {t(link.key)}
            </a>
          ))}

          {/* Mobile Language Switcher */}
          <div
            className="flex rounded-full border border-white/20 bg-white/5 overflow-hidden"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition:
                'opacity 0.4s ease 400ms, transform 0.4s ease 400ms',
            }}
          >
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`px-4 py-2 font-medium ${i18n.language === 'en'
                ? 'bg-goldenrod text-[#000814]'
                : 'text-white'
                }`}
            >
              EN
            </button>

            <button
              onClick={() => i18n.changeLanguage('mr')}
              className={`px-4 py-2 font-medium ${i18n.language === 'mr'
                ? 'bg-goldenrod text-[#000814]'
                : 'text-white'
                }`}
            >
              मराठी
            </button>
          </div>

          <a
            href="#enquiry"
            onClick={(e) => handleNavClick(e, '#enquiry')}
            className="mt-4 inline-flex items-center px-8 py-3 bg-goldenrod text-[#000814] font-body text-lg font-bold rounded-full hover:bg-warm transition-colors duration-300"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.4s ease 480ms, transform 0.4s ease 480ms',
            }}
          >
            {t('navbar.enquiry')}
          </a>
        </div>
      </div>
    </>
  );
}