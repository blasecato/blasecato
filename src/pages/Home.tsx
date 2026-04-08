import HeroBackground from '@/components/HeroBackground/HeroBackground'
import { SplineSceneBasic } from '@/components/SplineSceneBasic'
import { PhotoSection } from '@/components/PhotoSection'
import { ClientsSection } from '@/components/ClientsSection'
import IntegrationHero from '@/components/ui/integration-hero'
import { ProjectsSection } from '@/components/ProjectsSection'
import { ContactSection } from '@/components/ui/glassmorphism-portfolio-block'
import { MapSection } from '@/components/MapSection'

export default function Home() {
  return (
    <>
      <section id="home"><HeroBackground /></section>
      <section id="about" className="bg-background transition-colors duration-300">
        <div className="px-8 py-16">
          <div className="mx-auto max-w-[1300px]">
            <SplineSceneBasic />
          </div>
        </div>
      </section>
      <section id="skills"><IntegrationHero /></section>
      <section id="projects"><ProjectsSection /></section>
      <PhotoSection />
      <section id="clients"><ClientsSection /></section>
      <section id="contact"><ContactSection /></section>
      <MapSection />
    </>
  )
}
