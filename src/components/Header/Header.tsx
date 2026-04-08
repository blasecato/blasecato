import './Header.css';
import { useState } from 'react';
import { HoverButton } from '@/components/ui/hover-button';
import { Sun, Moon, X, Menu } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo.png';

function scrollTo(hash: string) {
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: t('nav.aboutMe'),    hash: '#about' },
    { label: t('nav.skills'),     hash: '#skills' },
    { label: t('nav.myProjects'), hash: '#projects' },
    { label: t('nav.contact'),    hash: '#contact' },
  ];

  const toggleLanguage = () => {
    const next = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(next);
    localStorage.setItem('i18n_language', next);
  };

  const handleNavClick = (hash: string) => {
    scrollTo(hash);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="header">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
          className="flex-shrink-0"
        >
          <img src={logo} alt="Sebastián Calderón" className="h-10 w-auto object-contain invert dark:invert-0" />
        </a>

        {/* Desktop nav */}
        <ul className="nav-list">
          {navLinks.map(({ label, hash }) => (
            <li key={hash} className="nav-item">
              <a href={hash} onClick={(e) => { e.preventDefault(); scrollTo(hash); }}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="header-actions">
          <button
            onClick={toggleLanguage}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-foreground/20 text-foreground/80 hover:text-foreground hover:border-foreground/50 transition-all duration-300 text-lg"
            aria-label="Toggle language"
            title={i18n.language === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'}
          >
            {i18n.language === 'en' ? '🇬🇧' : '🇪🇸'}
          </button>
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-foreground/20 text-foreground/80 hover:text-foreground hover:border-foreground/50 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <HoverButton onClick={() => window.open('/cv.pdf', '_blank')}>{t('header.cv')}</HoverButton>
          <HoverButton onClick={() => window.open('https://www.linkedin.com/in/blas-sebastian-calderon-desarrollador-fullstack/', '_blank')}>
            {t('header.follow')}
          </HoverButton>
        </div>

        {/* Hamburger button */}
        <button
          className="header-hamburger flex items-center justify-center w-10 h-10 rounded-full border border-foreground/20 text-foreground/80 hover:text-foreground hover:border-foreground/50 transition-all duration-300"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[99]"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 h-full w-72 bg-background/95 backdrop-blur-xl border-l border-foreground/10 flex flex-col p-8 pt-24 gap-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nav links */}
            <ul className="flex flex-col gap-5">
              {navLinks.map(({ label, hash }) => (
                <li key={hash}>
                  <a
                    href={hash}
                    onClick={(e) => { e.preventDefault(); handleNavClick(hash); }}
                    className="text-foreground/70 hover:text-foreground text-sm font-medium uppercase tracking-widest transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="h-px bg-foreground/10" />

            {/* Controls row */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-foreground/20 text-foreground/80 hover:text-foreground hover:border-foreground/50 transition-all duration-300 text-lg"
                aria-label="Toggle language"
              >
                {i18n.language === 'en' ? '🇬🇧' : '🇪🇸'}
              </button>
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-foreground/20 text-foreground/80 hover:text-foreground hover:border-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3">
              <HoverButton onClick={() => { window.open('/cv.pdf', '_blank'); setMenuOpen(false); }}>
                {t('header.cv')}
              </HoverButton>
              <HoverButton onClick={() => { window.open('https://www.linkedin.com/in/blas-sebastian-calderon-desarrollador-fullstack/', '_blank'); setMenuOpen(false); }}>
                {t('header.follow')}
              </HoverButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
