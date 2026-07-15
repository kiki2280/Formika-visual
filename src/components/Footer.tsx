import { Link } from "wouter";
import BrandLogo from "./BrandLogo";
import { CONTACTS } from "@/lib/contacts";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-14 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link href="/" className="flex items-center" aria-label="FORMIKA — на главную">
              <BrandLogo variant="footer" />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Персонализированные LEGO-композиции и подарки ручной работы по вашим фотографиям.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Навигация</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Наши работы</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Преимущества</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Отзывы</Link></li>
              <li><Link href="/order" className="hover:text-primary transition-colors">Конструктор</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Соцсети</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href={CONTACTS.telegram.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Telegram</a></li>
              <li><a href={CONTACTS.instagram.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="https://www.facebook.com/share/1atrorx2fQ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Facebook</a></li>
              <li><a href="https://www.tiktok.com/@f0rmika?_r=1&_t=ZN-97qNKEiZs38" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">TikTok</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Информация</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Политика конфиденциальности</Link></li>
              <li><Link href="/delivery" className="hover:text-primary transition-colors">Доставка и оплата</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Условия заказа</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} FORMIKA. Сделано с любовью в Латвии.</p>
        </div>
      </div>
    </footer>
  );
}
