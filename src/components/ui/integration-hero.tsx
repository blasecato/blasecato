import { HoverButton } from "@/components/ui/hover-button";
import { ParticleCanvas } from "@/components/ui/particle-canvas";
import { useTranslation } from "react-i18next";

const ICONS_ROW1 = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", label: "React" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", label: "TypeScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", label: "JavaScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", label: "Node.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", label: "HTML5" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", label: "CSS3" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", label: "Tailwind" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", label: "Git" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg", label: "Redux" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg", label: "GraphQL" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg", label: "NestJS" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg", label: "Prisma" },
];

const ICONS_ROW2 = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", label: "GitHub" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg", label: "GitLab" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", label: "VS Code" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", label: "Figma" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", label: "PostgreSQL" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", label: "MySQL" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg", label: "Oracle" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", label: "Docker" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", label: "Next.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg", label: "Vite" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", label: "AWS" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", label: "Google Cloud" },
];

const ICONS_ROW3 = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", label: "React Native" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", label: "Vercel" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg", label: "Swagger" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", label: "Linux" },
  { src: "https://cdn.simpleicons.org/expo/ffffff", label: "Expo" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg", label: ".NET Core" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", label: "Flutter" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", label: "Azure" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", label: "MongoDB" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", label: "Redis" },
];

const repeated = <T,>(arr: T[], times = 4) =>
  Array.from({ length: times }).flatMap(() => arr);

export default function IntegrationHero() {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 overflow-hidden bg-background transition-colors duration-300" style={{ isolation: 'isolate' }}>
      <ParticleCanvas maxParticles={800} particleSizeMin={2} particleSizeMax={4} speedScale={2} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-[1300px] mx-auto px-8 text-center">
        <span className="inline-block px-3 py-1 mb-4 text-sm rounded-full border border-foreground/20 text-foreground/60">
          {t('skills.badge')}
        </span>
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          {t('skills.title')}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          {t('skills.description')}
        </p>
        <div className="mt-8 flex justify-center">
          <HoverButton onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}>
            {t('skills.viewProjects')}
          </HoverButton>
        </div>

        <div className="mt-14 overflow-hidden relative pb-2">
          {/* Row 1 — left */}
          <div className="flex gap-8 whitespace-nowrap animate-scroll-left">
            {repeated(ICONS_ROW1, 4).map((item, i) => (
              <div
                key={i}
                className="h-16 w-16 flex-shrink-0 rounded-2xl bg-foreground/5 border border-foreground/10 shadow-md flex items-center justify-center"
                title={item.label}
              >
                <img src={item.src} alt={item.label} className="h-9 w-9 object-contain" />
              </div>
            ))}
          </div>

          {/* Row 2 — right */}
          <div className="flex gap-8 whitespace-nowrap mt-6 animate-scroll-right">
            {repeated(ICONS_ROW2, 4).map((item, i) => (
              <div
                key={i}
                className="h-16 w-16 flex-shrink-0 rounded-2xl bg-foreground/5 border border-foreground/10 shadow-md flex items-center justify-center"
                title={item.label}
              >
                <img src={item.src} alt={item.label} className="h-9 w-9 object-contain" />
              </div>
            ))}
          </div>

          {/* Row 3 — left */}
          <div className="flex gap-8 whitespace-nowrap mt-6 animate-scroll-left">
            {repeated(ICONS_ROW3, 4).map((item, i) => (
              <div
                key={i}
                className="h-16 w-16 flex-shrink-0 rounded-2xl bg-foreground/5 border border-foreground/10 shadow-md flex items-center justify-center"
                title={item.label}
              >
                <img src={item.src} alt={item.label} className="h-9 w-9 object-contain" />
              </div>
            ))}
          </div>

          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-background to-transparent pointer-events-none transition-colors duration-300" />
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent pointer-events-none transition-colors duration-300" />
        </div>
      </div>
    </section>
  );
}
