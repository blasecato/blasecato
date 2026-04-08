import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import ParticlesBackground from "@/components/ParticlesBackground";
import { useTheme } from "@/contexts/ThemeContext";
import { Badge } from "@/components/ui/badge";
import { AnimatedInput, AnimatedTextarea } from "@/components/ui/animated-input";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import type { IconType } from "react-icons";
import { HoverButton } from "@/components/ui/hover-button";
import { useTranslation } from "react-i18next";
import contactImg from "@/assets/contact.jpg";

type SocialLink = {
  label: string;
  handle: string;
  href: string;
  icon: IconType;
};

const listVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function ContactSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const socialLinks: SocialLink[] = [
    {
      label: "GitHub",
      handle: "@Blasecato",
      href: "https://github.com/blasecato",
      icon: FaGithub,
    },
    {
      label: "LinkedIn",
      handle: "Sebastian Calderon",
      href: "https://www.linkedin.com/in/blas-sebastian-calderon-desarrollador-fullstack/",
      icon: FaLinkedin,
    },
    {
      label: "Instagram",
      handle: "@Blasecato",
      href: "https://www.instagram.com/blasecato/?hl=es-la",
      icon: FaInstagram,
    },
    {
      label: "WhatsApp",
      handle: t('contact.social.handles.whatsapp'),
      href: "https://wa.me/573157308621?text=Hola%20Sebasti%C3%A1n%20%F0%9F%91%8B%2C%20vi%20tu%20portafolio%20y%20me%20pareci%C3%B3%20incre%C3%ADble%20tu%20trabajo.%20Me%20gustar%C3%ADa%20hablar%20contigo%20sobre%20una%20oportunidad%20de%20colaboraci%C3%B3n.%20%C2%BFTienes%20disponibilidad%3F",
      icon: FaWhatsapp,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 4000);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-background px-6 py-24 lg:py-32 transition-colors duration-300" style={{ isolation: 'isolate' }}>
      <ParticlesBackground particleColor={isDark ? '#ffffff' : '#000000'} />
      <div className="mx-auto max-w-[1300px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/5 p-8 backdrop-blur-2xl md:p-12"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none" />

          <div className="relative grid gap-12 lg:grid-cols-2">
            {/* Left column */}
            <div className="space-y-8">
              <Badge
                variant="outline"
                className="inline-flex items-center gap-2 rounded-full border-foreground/20 bg-foreground/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-foreground/60 backdrop-blur"
              >
                {t('contact.badge')}
              </Badge>

              <div className="space-y-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
                >
                  {t('contact.title')}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="max-w-xl text-base leading-relaxed text-muted-foreground"
                >
                  {t('contact.description')}
                </motion.p>
              </div>

              {/* Contact form */}
              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col gap-4"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <AnimatedInput
                    label={t('contact.form.name')}
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <AnimatedInput
                    label={t('contact.form.email')}
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <AnimatedTextarea
                  label={t('contact.form.message')}
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <HoverButton type="submit" disabled={sending} className="flex items-center gap-2 w-fit">
                  {sending ? (
                    t('contact.form.sending')
                  ) : sent ? (
                    t('contact.form.sent')
                  ) : error ? (
                    t('contact.form.error')
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {t('contact.form.send')}
                    </>
                  )}
                </HoverButton>
              </motion.form>
            </div>

            {/* Right column — profile card */}
            <div className="relative">
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/10 via-transparent to-transparent blur-3xl" />
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-foreground/10 bg-foreground/5 p-8 backdrop-blur-xl">
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-6"
                  >
                    <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-2xl" />
                    <img
                      src={contactImg}
                      alt={t('contact.profile.name')}
                      className="relative h-32 w-32 rounded-full border border-foreground/20 object-cover shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-1"
                  >
                    <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                      {t('contact.profile.name')}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-foreground/40">
                      {t('contact.profile.role')}
                    </p>
                  </motion.div>

                </div>

                {/* Social links */}
                <motion.div
                  variants={listVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className="mt-8 flex flex-col gap-3"
                >
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        variants={itemVariants}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-2xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-left transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-foreground/10 hover:shadow-md"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.985 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 text-foreground/80 transition-all group-hover:bg-foreground/10">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {social.label}
                            </p>
                            <p className="text-xs text-foreground/50">
                              {social.handle}
                            </p>
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-foreground/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground/60" />
                      </motion.a>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
