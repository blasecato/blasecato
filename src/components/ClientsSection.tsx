import { motion } from "framer-motion";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import { useTranslation } from "react-i18next";
import test1 from "@/assets/test1.jpg";
import test2 from "@/assets/test2.jpeg";
import test3 from "@/assets/test3.jpeg";
import test4 from "@/assets/test4.jpeg";
import test5 from "@/assets/test5.jpeg";
import test6 from "@/assets/test6.jpeg";
import test7 from "@/assets/test7.jpeg";
import test8 from "@/assets/test8.png";
import test9 from "@/assets/test9.png";

const testimonialsImages = [test1, test2, test3, test4, test5, test6, test7, test8, test9];

export function ClientsSection() {
  const { t } = useTranslation();

  const items = t('clients.testimonials', { returnObjects: true }) as Array<{
    text: string;
    name: string;
    role: string;
  }>;

  const testimonials = items.map((item, i) => ({
    ...item,
    image: testimonialsImages[i],
  }));

  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <section className="bg-background py-20 relative transition-colors duration-300">
      <div className="mx-auto max-w-[1300px] px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-10"
        >
          <div className="flex justify-center">
            <div className="border border-foreground/20 text-foreground/70 py-1 px-4 rounded-lg text-sm">
              {t('clients.badge')}
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mt-5 text-foreground text-center">
            {t('clients.title')}
          </h2>
          <p className="text-center mt-5 text-muted-foreground">
            {t('clients.description')}
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}
