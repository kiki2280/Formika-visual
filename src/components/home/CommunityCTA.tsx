import { motion } from "@/lib/motion";
import { Send, Instagram, Facebook } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import SectionHeading from "./SectionHeading";
import { useTranslation } from "react-i18next";

const SOCIALS = [
  {
    labelKey: "contacts.telegram",
    icon: Send,
    href: "https://t.me/formika_studio",
    testid: "social-telegram",
    hoverClass:
      "hover:border-[#229ED9] hover:bg-[#229ED9] hover:text-white hover:shadow-[0_14px_38px_rgba(34,158,217,0.35),0_0_30px_rgba(34,158,217,0.22)]",
  },
  {
    labelKey: "contacts.instagram",
    icon: Instagram,
    href: "https://www.instagram.com/f0rmika.studio/",
    testid: "social-instagram",
    hoverClass:
      "hover:border-[#E1306C] hover:bg-[linear-gradient(135deg,#833AB4_0%,#C13584_35%,#E1306C_65%,#F77737_100%)] hover:text-white hover:shadow-[0_14px_38px_rgba(225,48,108,0.32),0_0_32px_rgba(193,53,132,0.22)]",
  },
  {
    labelKey: "contacts.facebook",
    icon: Facebook,
    href: "https://www.facebook.com/share/1atrorx2fQ/?mibextid=wwXIfr",
    testid: "social-facebook",
    hoverClass:
      "hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:shadow-[0_14px_38px_rgba(24,119,242,0.34),0_0_30px_rgba(24,119,242,0.2)]",
  },
  {
    labelKey: "contacts.tiktok",
    icon: SiTiktok,
    href: "https://www.tiktok.com/@f0rmika?_r=1&_t=ZN-97qNKEiZs38",
    testid: "social-tiktok",
    hoverClass:
      "hover:border-[#25F4EE]/70 hover:bg-[#101010] hover:text-white hover:shadow-[0_0_28px_rgba(37,244,238,0.25),0_0_38px_rgba(254,44,85,0.22),0_14px_38px_rgba(0,0,0,0.5)]",
  },
];

export default function CommunityCTA() {
  const { t } = useTranslation();

  return (
    <section
      id="community"
      className="relative scroll-mt-20 overflow-hidden py-20 md:py-24"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="
            relative overflow-hidden rounded-[32px]
            border border-white/10
            bg-gradient-to-br
            from-[#251f1b]/90
            via-[#171412]/95
            to-[#101010]
            px-6 py-12 text-center
            shadow-[0_28px_80px_rgba(0,0,0,0.38)]
            backdrop-blur-sm
            sm:px-10 md:py-14
          "
        >
          {/* Мягкое оранжевое свечение */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.08] blur-[100px]" />

          <div className="relative">
            <SectionHeading
              eyebrow={t("home.community.eyebrow")}
              title={t("home.community.title")}
              titleClassName="text-[clamp(1.625rem,8vw,2.125rem)] leading-[1.1] md:text-[inherit] md:leading-[inherit]"
              subtitle={t("home.community.subtitle")}
            />

            <div className="mt-9 grid grid-cols-2 justify-center gap-3 sm:flex sm:flex-wrap md:gap-4">
              {SOCIALS.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.labelKey}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("home.community.openSocialAria", {
                      social: t(social.labelKey),
                    })}
                    data-testid={social.testid}
                    className={`
                      group inline-flex min-h-12 items-center justify-center gap-2.5
                      rounded-full border border-white/15
                      bg-white/[0.025] px-5
                      font-sans text-xs font-semibold
                      tracking-wide text-white/70
                      shadow-[0_8px_24px_rgba(0,0,0,0.18)]
                      transition-all duration-300
                      hover:-translate-y-1
                      sm:min-w-[138px] sm:px-6 sm:text-sm
                      ${social.hoverClass}
                    `}
                  >
                    <Icon
                      className="
                        h-4 w-4 shrink-0
                        transition-transform duration-300
                        group-hover:scale-110
                      "
                    />

                    <span>{t(social.labelKey)}</span>
                  </a>
                );
              })}
            </div>

            <p className="mx-auto mt-7 max-w-xl font-sans text-xs leading-relaxed text-white/35">
              {t("home.community.description")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
