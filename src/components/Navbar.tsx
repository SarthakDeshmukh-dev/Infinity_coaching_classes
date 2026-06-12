import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Star } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Courses', href: '#courses' },
  // { label: 'Results', href: '#results' },
  { label: 'Faculty', href: '#faculty' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#000814]/80 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-18 md:h-20 items-center justify-between">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 group" onClick={(e) => handleNavClick(e, '#home')}>
              {/* <Star className="w-6 h-6 text-goldenrod fill-goldenrod group-hover:rotate-12 transition-transform duration-300" /> */}
              <span className="font-display text-2xl md:text-3xl text-white tracking-tight">
                Infinity
              </span>
              <span className="font-body text-lg md:text-xl text-goldenrod font-medium">
                Classes
              </span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative font-body text-[15px] font-medium text-white/80 hover:text-goldenrod transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-goldenrod transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA Button + Hamburger */}
            <div className="flex items-center gap-4">
              <a
                href="#enquiry"
                onClick={(e) => handleNavClick(e, '#enquiry')}
                className="hidden sm:inline-flex items-center px-5 py-2.5 bg-royal text-white font-body text-sm font-semibold rounded-full hover:bg-bright hover:scale-[1.02] transition-all duration-300 shadow-glow"
              >
                Enquire Now
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 text-white hover:text-goldenrod transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#000814]/98 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
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
                transition: `opacity 0.4s ease ${index * 80}ms, transform 0.4s ease ${index * 80}ms`,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#enquiry"
            onClick={(e) => handleNavClick(e, '#enquiry')}
            className="mt-4 inline-flex items-center px-8 py-3 bg-goldenrod text-[#000814] font-body text-lg font-bold rounded-full hover:bg-warm transition-colors duration-300"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.4s ease 480ms, transform 0.4s ease 480ms`,
            }}
          >
            Enquire Now
          </a>
        </div>
      </div>
    </>
  );
}
