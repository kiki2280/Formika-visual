import { Link } from "wouter";
import BrandLogo from "./BrandLogo";
import { CONTACTS } from "@/lib/contacts";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-card border-t border-border py-14 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link href="/" className="flex items-center" aria-label={t("footer.homeAria")}>
              <BrandLogo variant="footer" />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">{t("footer.navigationHeading")}</p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">{t("footer.works")}</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">{t("footer.advantages")}</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">{t("footer.reviews")}</Link></li>
              <li><Link href="/order" className="hover:text-primary transition-colors">{t("footer.builder")}</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">{t("footer.socialsHeading")}</p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href={CONTACTS.telegram.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t("contacts.telegram")}</a></li>
              <li><a href={CONTACTS.instagram.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t("contacts.instagram")}</a></li>
              <li><a href="https://www.facebook.com/share/1atrorx2fQ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t("contacts.facebook")}</a></li>
              <li><a href="https://www.tiktok.com/@f0rmika?_r=1&_t=ZN-97qNKEiZs38" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t("contacts.tiktok")}</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">{t("footer.informationHeading")}</p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">{t("footer.privacy")}</Link></li>
              <li><Link href="/delivery" className="hover:text-primary transition-colors">{t("footer.deliveryAndPayment")}</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">{t("footer.terms")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-xs text-muted-foreground">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}
