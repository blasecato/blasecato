import { useState, useEffect } from 'react';
import { Typewriter } from '@/components/ui/typewriter';
import { MatrixText } from '@/components/ui/matrix-text';
import { ParticleTextEffect } from '@/components/ui/particle-text-effect';
import { DottedSurface } from '@/components/ui/dotted-surface';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import contactImg from '@/assets/contact.jpg';

const HeroBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 500);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const typewriterWords = t('hero.typewriter', { returnObjects: true }) as string[];
  const particleWords = t('hero.particles', { returnObjects: true }) as string[];

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: isDark ? '#000' : '#fff', transition: 'background-color 0.3s' }}>

      {!isMobile && (
        <ParticleTextEffect
          words={particleWords}
          intervalFrames={400}
          isDark={isDark}
        />
      )}

      {isMobile && (
        <DottedSurface />
      )}

      <div style={{ position: 'relative', zIndex: 10, pointerEvents: 'none', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {isMobile && (
          <img
            src={contactImg}
            alt="Sebastian Calderon"
            style={{
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1px solid rgba(128,128,128,0.3)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
              marginBottom: '1.5rem',
            }}
          />
        )}
        <MatrixText
          text={isMobile ? 'Sebastián Calderón' : t('hero.name')}
          initialDelay={300}
          letterAnimationDuration={500}
          letterInterval={80}
          className={`${isDark ? 'text-white' : 'text-black'} ${isMobile ? 'text-[2rem]' : 'text-[3.5rem]'} font-extralight tracking-[10px]`}
        />
        <p style={{ fontSize: '1.4rem', color: isDark ? '#ffffff' : '#000000', letterSpacing: '4px', marginTop: '10px' }}>
          <Typewriter
            words={typewriterWords}
            speed={80}
            delayBetweenWords={2000}
            cursor={true}
            cursorChar="|"
          />
        </p>
      </div>
    </div>
  );
};

export default HeroBackground;
