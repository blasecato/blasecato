import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from 'react-i18next';
import img1 from "@/assets/img-1.jpeg";
import img2 from "@/assets/img-2.jpeg";
import img3 from "@/assets/img-3.jpeg";

const photoSrcs = [img1, img2, img3];

const name = "Sebastian Calderon";

export function PhotoSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { t } = useTranslation();

  const entries = t('about.photo.entries', { returnObjects: true }) as Array<{
    designation: string;
    quote: string;
  }>;

  const photos = entries.map((entry, i) => ({
    name,
    designation: entry.designation,
    quote: entry.quote,
    src: photoSrcs[i],
  }));

  return (
    <section className="bg-background py-24 transition-colors duration-300">
      <div className="mx-auto max-w-[1300px] px-8 flex justify-center">
        <CircularTestimonials
          testimonials={photos}
          autoplay={true}
          colors={{
            name: isDark ? "#f7f7ff" : "#0a0a0a",
            designation: isDark ? "#a1a1aa" : "#555555",
            testimony: isDark ? "#d4d4d8" : "#333333",
            arrowBackground: isDark ? "#18181b" : "#e4e4e7",
            arrowForeground: isDark ? "#f1f1f7" : "#18181b",
            arrowHoverBackground: "#00a6fb",
          }}
          fontSizes={{
            name: "28px",
            designation: "18px",
            quote: "18px",
          }}
        />
      </div>
    </section>
  );
}
