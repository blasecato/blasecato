import { Typewriter } from '@/components/ui/typewriter';
import { MatrixText } from '@/components/ui/matrix-text';
import { ParticleTextEffect } from '@/components/ui/particle-text-effect';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const HeroBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { t } = useTranslation();

  const typewriterWords = t('hero.typewriter', { returnObjects: true }) as string[];
  const particleWords = t('hero.particles', { returnObjects: true }) as string[];

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: isDark ? '#000' : '#fff', transition: 'background-color 0.3s' }}>
      <ParticleTextEffect
        words={particleWords}
        intervalFrames={400}
        isDark={isDark}
      />
      <div style={{ position: 'relative', zIndex: 10, pointerEvents: 'none', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <MatrixText
          text={t('hero.name')}
          initialDelay={300}
          letterAnimationDuration={500}
          letterInterval={80}
          className={`${isDark ? 'text-white' : 'text-black'} text-[3.5rem] font-extralight tracking-[10px]`}
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
