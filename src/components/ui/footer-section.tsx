import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo.png';

export function Footer() {
  const { t } = useTranslation();

  const footerLinks = [
    {
      label: t('footer.sections.navigation'),
      links: [
        { title: t('footer.links.inicio'),     href: '#home' },
        { title: t('footer.links.aboutMe'),    href: '#about' },
        { title: t('footer.links.skills'),     href: '#skills' },
        { title: t('footer.links.myProjects'), href: '#projects' },
      ],
    },
    {
      label: t('footer.sections.contact'),
      links: [
        { title: t('footer.links.contact'), href: '#contact' },
        { title: t('footer.links.cv'),      href: '/cv.pdf' },
      ],
    },
    {
      label: t('footer.sections.social'),
      links: [
        { title: t('footer.links.github'),    href: 'https://github.com/blasecato' },
        { title: t('footer.links.instagram'), href: 'https://www.instagram.com/blasecato/?hl=es-la' },
        { title: t('footer.links.linkedin'),  href: 'https://www.linkedin.com/in/blas-sebastian-calderon-desarrollador-fullstack/' },
      ],
    },
  ];

  return (
    <footer className="relative w-full max-w-[1300px] mx-auto flex flex-col items-center justify-center rounded-t-3xl border-t border-foreground/10 bg-[radial-gradient(35%_128px_at_50%_0%,rgba(128,128,128,0.05),transparent)] px-6 py-12 lg:py-16">
      <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur bg-foreground/20" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); const el = document.querySelector('#home'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
          >
            <img src={logo} alt="Sebastián Calderón" className="h-10 w-auto object-contain invert dark:invert-0" />
          </a>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs text-foreground/50 uppercase tracking-widest">{section.label}</h3>
                <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      {link.href.startsWith('#') ? (
                        <a
                          href={link.href}
                          onClick={(e) => {
                            e.preventDefault();
                            const el = document.querySelector(link.href);
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="hover:text-foreground inline-flex items-center gap-1 transition-colors duration-300"
                        >
                          {link.title}
                        </a>
                      ) : (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-foreground inline-flex items-center gap-1 transition-colors duration-300"
                        >
                          {link.title}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>

      <div className="w-full mt-10 pt-6 border-t border-foreground/10 text-right">
        <p className="text-muted-foreground text-sm">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
