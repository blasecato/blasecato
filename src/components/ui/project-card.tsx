import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProjectCardProps {
  title: string;
  role: string;
  description: string;
  image: string;
  link: string;
  tools: string[];
  className?: string;
}

export function ProjectCard({
  title,
  role,
  description,
  image,
  link,
  tools,
  className,
}: ProjectCardProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={cn("w-full", className)}
    >
      <Card className="group relative h-full overflow-hidden rounded-2xl border-foreground/10 bg-foreground/5 backdrop-blur-md transition-all duration-300 hover:border-foreground/30 hover:shadow-xl hover:shadow-foreground/5">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

          {/* Tools badges over image */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            {tools.map((tool, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="bg-black/50 text-white backdrop-blur-sm border-white/20 hover:bg-black/70"
              >
                {tool}
              </Badge>
            ))}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black shadow-lg"
            >
              <ExternalLink className="h-4 w-4" />
              {t('projects.viewProject')}
            </motion.a>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 p-5">
          <h3 className="text-lg font-semibold leading-tight tracking-tight text-foreground transition-colors group-hover:text-foreground/80">
            {title}
          </h3>
          <p className="text-xs font-medium text-foreground/50 uppercase tracking-wider">{role}</p>
          <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
        </div>
      </Card>
    </motion.div>
  );
}
