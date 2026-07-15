import {
  Database,
  Image,
  Instagram,
  Send,
  Share2,
  Trash2,
} from "lucide-react";
import LegalPage from "@/components/LegalPage";
import { CONTACTS } from "@/lib/contacts";

const CONTACT_LINKS = [
  {
    label: "Telegram",
    href: CONTACTS.telegram.href,
    value: CONTACTS.telegram.handle,
    icon: Send,
  },
  {
    label: "Instagram",
    href: CONTACTS.instagram.href,
    value: CONTACTS.instagram.handle,
    icon: Instagram,
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Политика конфиденциальности"
      intro="Мы бережно относимся к личной информации клиентов и используем её только для подготовки, изготовления и передачи заказа."
      sections={[
        {
          title: "Какие данные мы можем обрабатывать",
          content: (
            <div className="space-y-4">
              <p>
                FORMIKA может получать ваше имя, имя пользователя
                в Telegram, номер телефона, адрес доставки и комментарии
                к заказу.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                  <div className="flex items-center gap-2.5">
                    <Database className="h-4 w-4 text-primary" />

                    <p className="font-sans text-sm font-semibold text-foreground">
                      Данные заказа
                    </p>
                  </div>

                  <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
                    Используются для связи, уточнения деталей,
                    изготовления изделия и организации доставки.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                  <div className="flex items-center gap-2.5">
                    <Image className="h-4 w-4 text-primary" />

                    <p className="font-sans text-sm font-semibold text-foreground">
                      Фотографии и материалы
                    </p>
                  </div>

                  <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
                    Используются только для создания персонализированного
                    изделия по вашему заказу.
                  </p>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "Передача данных",
          content: (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
              <div className="flex items-start gap-3">
                <Share2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                <p>
                  FORMIKA не продаёт персональные данные и не передаёт
                  их третьим лицам для рекламы. Информация может
                  использоваться только для выполнения заказа, связи
                  с клиентом и организации доставки.
                </p>
              </div>
            </div>
          ),
        },
        {
          title: "Фото готовых работ",
          content: (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
              <div className="flex items-start gap-3">
                <Image className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                <p>
                  Фотографии готовых изделий публикуются на сайте
                  или в социальных сетях только с согласия клиента.
                  Если вы не хотите публикацию, сообщите об этом
                  при согласовании заказа.
                </p>
              </div>
            </div>
          ),
        },
        {
          title: "Изменение или удаление данных",
          content: (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
              <div className="flex items-start gap-3">
                <Trash2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                <p>
                  Вы можете запросить изменение или удаление своих
                  данных. Напишите нам в Telegram или Instagram,
                  и мы рассмотрим ваш запрос.
                </p>
              </div>
            </div>
          ),
        },
        {
          title: "Связаться с FORMIKA",
          content: (
            <div className="grid gap-3 sm:grid-cols-2">
              {CONTACT_LINKS.map((contact) => {
                const Icon = contact.icon;

                return (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group flex items-center justify-between gap-4
                      rounded-2xl border border-white/[0.09]
                      bg-white/[0.025] p-4
                      transition-all duration-300
                      hover:-translate-y-0.5
                      hover:border-primary/45
                      hover:bg-primary/[0.05]
                    "
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.07] text-primary">
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0">
                        <p className="font-sans text-sm font-semibold text-foreground">
                          {contact.label}
                        </p>

                        <p className="mt-0.5 truncate font-sans text-xs text-muted-foreground">
                          {contact.value}
                        </p>
                      </div>
                    </div>

                    <span className="font-sans text-lg text-primary transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                );
              })}
            </div>
          ),
        },
      ]}
    />
  );
}