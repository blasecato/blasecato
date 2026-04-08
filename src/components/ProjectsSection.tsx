import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ui/project-card";
import { useTranslation } from "react-i18next";
import imgBerrysafe from "@/assets/berrysafe.png";
import imgCelagem from "@/assets/celagem.png";
import imgAmasfac from "@/assets/amasfac.png";
import imgSiegenco from "@/assets/siegenco.png";
import imgCarmenta from "@/assets/carmentalabs.png";
import imgLiftit from "@/assets/liftit.png";
import imgMonik from "@/assets/monik.png";
import imgFinanzauto from "@/assets/finanzauto.png";
import imgSimon from "@/assets/simon.png";
import imgComfandi from "@/assets/comfandi.png";
import imgImpostor from "@/assets/impostor.png";
import imgAtg from "@/assets/atg.png";

const projectsStatic = [
  { image: imgBerrysafe,  link: "https://www.berrysafe.com/",             tools: ["Next.js", "React", "Redux", "PostgreSQL", "MongoDB"] },
  { image: imgLiftit,     link: "https://liftit.co/es/index.html",        tools: ["Gatsby", "React", "GraphQL"] },
  { image: imgSimon,      link: "https://www.simonmovilidad.com/",        tools: ["Next.js", "React", "Axios"] },
  { image: imgFinanzauto, link: "https://www.finanzauto.com.co/portal/",  tools: ["React", "NestJS", "Axios"] },
  { image: imgMonik,      link: "https://frontend-monik.vercel.app/",     tools: ["Next.js", "NestJS", "GraphQL", "PostgreSQL"] },
  { image: imgCelagem,    link: "https://celagem.com/",                   tools: ["React", "Redux", "Sass", "HTML5"] },
  { image: imgComfandi,   link: "https://www.comfandi.com.co/",           tools: ["Next.js", "Prisma", "Redux", "Tailwind"] },
  { image: imgImpostor,   link: "https://www.figma.com/design/irhhDOHefpyCvMTxR5sLEP/Impostor-local?node-id=0-1&p=f&t=tQEH8WTaSUXVblKX-0", tools: ["React Native", "Expo", "TypeScript", "Redux", "AI API"] },
  { image: imgSiegenco,   link: "https://www.siegenco.com/en/",           tools: ["WordPress", "PHP", "CSS"] },
  { image: imgCarmenta,   link: "https://carmentalabs.com/",              tools: ["React", "CSS", "HTML", "Animations"] },
  { image: imgAtg,        link: "https://www.figma.com/design/eKEUWxZCkt2oymilvg3o6E/ATG_Official_Mobile_App?node-id=0-1&p=f&t=ZuEby8jP6f8vXA9s-0", tools: ["React Native", "Redux", "Styled Components"] },
  { image: imgAmasfac,    link: "https://www.amasfac.org/",               tools: ["WordPress", "PHP", "CSS"] },
];

export function ProjectsSection() {
  const { t } = useTranslation();

  const items = t('projects.items', { returnObjects: true }) as Array<{
    title: string;
    role: string;
    description: string;
  }>;

  const projects = projectsStatic.map((p, i) => ({
    ...p,
    title: items[i]?.title ?? '',
    role: items[i]?.role ?? '',
    description: items[i]?.description ?? '',
  }));

  return (
    <section className="bg-background py-24 transition-colors duration-300">
      <div className="mx-auto max-w-[1300px] px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-14"
        >
          <div className="border border-foreground/20 text-foreground/60 py-1 px-4 rounded-lg text-sm mb-5">
            {t('projects.badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground text-center">
            {t('projects.title')}
          </h2>
          <p className="text-center mt-5 text-muted-foreground">
            {t('projects.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={i} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
