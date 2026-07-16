import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import BrandLogo from "./BrandLogo";

type NavSectionId =
  | "home"
  | "works"
  | "advantages"
  | "reviews"
  | "community";

type LanguageCode = "RU" | "LV" | "EN";

interface BodyStyleSnapshot {
  styleAttribute: string | null;
}

const NAV_ITEMS: {
  label: string;
  section: NavSectionId;
  home?: boolean;
  testid: string;
}[] = [
  {
    label: "Главная",
    section: "home",
    home: true,
    testid: "link-nav-home",
  },
  {
    label: "Наши работы",
    section: "works",
    testid: "link-nav-works",
  },
  {
    label: "Преимущества",
    section: "advantages",
    testid: "link-nav-benefits",
  },
  {
    label: "Отзывы",
    section: "reviews",
    testid: "link-nav-reviews",
  },
  {
    label: "Соцсети",
    section: "community",
    testid: "link-nav-social",
  },
];

const NAV_SECTION_IDS = NAV_ITEMS.map((item) => item.section);

const LANGUAGES: LanguageCode[] = ["RU", "LV", "EN"];

/*
 * Сейчас активным показан русский язык.
 * Когда будет подключена система переводов, эту константу
 * нужно заменить текущим языком из i18n.
 */
const ACTIVE_LANGUAGE: LanguageCode = "RU";

export default function Navbar() {
  const [location, setLocation] = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [activeSection, setActiveSection] =
    useState<NavSectionId>("home");
  const lockedScrollYRef = useRef(0);
  const bodyStyleSnapshotRef = useRef<BodyStyleSnapshot | null>(null);
  const pendingNavigationRef = useRef<(() => void) | null>(null);

  const openMobileMenu = useCallback(() => {
    pendingNavigationRef.current = null;
    setIsMobileMenuVisible(true);
    setIsMobileMenuOpen(true);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }, [closeMobileMenu, isMobileMenuOpen, openMobileMenu]);

  /*
   * Закрываем мобильное меню при переходе
   * на другую страницу.
   */
  useEffect(() => {
    closeMobileMenu();
  }, [closeMobileMenu, location]);

  /*
   * Оставляем компонент меню в DOM на время
   * анимации закрытия.
   */
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuVisible(true);
      return;
    }

    if (!isMobileMenuVisible) return;

    const timer = window.setTimeout(() => {
      setIsMobileMenuVisible(false);
    }, 220);

    return () => window.clearTimeout(timer);
  }, [isMobileMenuOpen, isMobileMenuVisible]);

  /*
   * Запрещаем прокрутку страницы,
   * пока мобильное меню открыто.
   */
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const body = document.body;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    lockedScrollYRef.current = window.scrollY;
    bodyStyleSnapshotRef.current = {
      styleAttribute: body.getAttribute("style"),
    };

    body.style.position = "fixed";
    body.style.top = `-${lockedScrollYRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      const snapshot = bodyStyleSnapshotRef.current;

      if (snapshot) {
        if (snapshot.styleAttribute === null) {
          body.removeAttribute("style");
        } else {
          body.setAttribute("style", snapshot.styleAttribute);
        }
      }

      bodyStyleSnapshotRef.current = null;
      const lockedScrollY = lockedScrollYRef.current;
      const pendingNavigation = pendingNavigationRef.current;
      pendingNavigationRef.current = null;

      window.requestAnimationFrame(() => {
        const root = document.documentElement;
        const rootStyleAttribute = root.getAttribute("style");

        root.style.scrollBehavior = "auto";
        window.scrollTo(0, lockedScrollY);
        root.scrollTop = lockedScrollY;

        if (rootStyleAttribute === null) {
          root.removeAttribute("style");
        } else {
          root.setAttribute("style", rootStyleAttribute);
        }

        if (pendingNavigation) {
          window.requestAnimationFrame(pendingNavigation);
        }
      });
    };
  }, [isMobileMenuOpen]);

  /*
   * Закрытие мобильного меню клавишей Escape.
   */
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeMobileMenu, isMobileMenuOpen]);

  /*
   * Определяем активный раздел страницы
   * во время прокрутки.
   */
  useEffect(() => {
    if (location !== "/") return;

    let animationFrame = 0;

    const scheduleActiveSectionUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame =
        window.requestAnimationFrame(updateActiveSection);
    };

    const observer = new IntersectionObserver(
      scheduleActiveSectionUpdate,
      {
        rootMargin: "-72px 0px -55% 0px",
        threshold: [0, 0.01, 0.25, 0.5, 1],
      },
    );

    const observeSections = () => {
      NAV_SECTION_IDS.forEach((id) => {
        const section = document.getElementById(id);

        if (section) {
          observer.observe(section);
        }
      });

      scheduleActiveSectionUpdate();
    };

    const mutationObserver = new MutationObserver(observeSections);

    function updateActiveSection() {
      const marker = Math.min(
        window.innerHeight * 0.35 + 72,
        390,
      );

      const currentSection =
        NAV_SECTION_IDS.reduce<NavSectionId>(
          (current, id) => {
            const section = document.getElementById(id);

            if (!section) return current;

            return section.getBoundingClientRect().top <= marker
              ? id
              : current;
          },
          "home",
        );

      setActiveSection(currentSection);
    }

    observeSections();

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener(
      "scroll",
      scheduleActiveSectionUpdate,
      { passive: true },
    );

    window.addEventListener("resize", observeSections);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      mutationObserver.disconnect();

      window.removeEventListener(
        "scroll",
        scheduleActiveSectionUpdate,
      );

      window.removeEventListener("resize", observeSections);
    };
  }, [location]);

  const scrollToSection = (
    id: NavSectionId,
    attempts = 0,
  ) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    if (attempts < 10) {
      window.setTimeout(() => {
        scrollToSection(id, attempts + 1);
      }, 100);
    }
  };

  const goToSection = (id: NavSectionId) => {
    setActiveSection(id);

    const navigate = () => {
      if (location !== "/") {
        setLocation("/");

        window.setTimeout(() => {
          scrollToSection(id);
        }, 120);

        return;
      }

      scrollToSection(id);
    };

    if (isMobileMenuOpen) {
      pendingNavigationRef.current = navigate;
      closeMobileMenu();
      return;
    }

    navigate();
  };

  const goToHome = () => {
    setActiveSection("home");

    const navigate = () => {
      if (location !== "/") {
        setLocation("/");

        window.setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }, 120);

        return;
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    if (isMobileMenuOpen) {
      pendingNavigationRef.current = navigate;
      closeMobileMenu();
      return;
    }

    navigate();
  };

  const goToOrder = () => {
    const navigate = () => {
      setLocation("/order");

      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    };

    if (isMobileMenuOpen) {
      pendingNavigationRef.current = navigate;
      closeMobileMenu();
      return;
    }

    navigate();
  };

  return (
    <>
      <nav
        className="
        fixed top-0 z-50 w-full lg:sticky
        border-b border-white/[0.08]
        bg-[#0d0d0d]/90
        shadow-[0_10px_35px_rgba(0,0,0,0.22)]
        backdrop-blur-xl
      "
      >
      {/* Деликатное свечение сверху */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between gap-5">
          {/* Логотип */}
          <Link
            href="/"
            onClick={(event) => {
              event.preventDefault();
              goToHome();
            }}
            className="
              group flex shrink-0 items-center
              transition-opacity duration-300
              hover:opacity-90
            "
            data-testid="link-logo"
            aria-label="FORMIKA — на главную"
          >
            <BrandLogo variant="header" />
          </Link>

          {/* Навигация на компьютере */}
          <div className="hidden items-center lg:flex">
            <div className="flex items-center gap-5 xl:gap-7">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  location === "/" &&
                  activeSection === item.section;

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() =>
                      item.home
                        ? goToHome()
                        : goToSection(item.section)
                    }
                    className={`
                      group relative py-3
                      font-sans text-[13px] font-semibold
                      transition-colors duration-300

                      ${
                        isActive
                          ? "text-primary"
                          : "text-white/60 hover:text-white"
                      }
                    `}
                    data-testid={item.testid}
                    aria-current={
                      isActive ? "location" : undefined
                    }
                  >
                    {item.label}

                    <span
                      aria-hidden="true"
                      className={`
                        pointer-events-none absolute
                        -bottom-0.5 left-0 h-[2px] w-full
                        origin-left rounded-full bg-primary
                        shadow-[0_0_10px_rgba(255,106,0,0.45)]
                        transition-transform duration-300

                        ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }
                      `}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Правая часть */}
          <div className="flex shrink-0 items-center gap-3">
            {/* Переключатель языка */}
            <div
              className="
                hidden items-center rounded-full
                border border-white/10
                bg-white/[0.025] p-1
                lg:flex
              "
              aria-label="Выбор языка"
            >
              {LANGUAGES.map((language) => {
                const isActive =
                  language === ACTIVE_LANGUAGE;

                return (
                  <button
                    key={language}
                    type="button"
                    aria-pressed={isActive}
                    className={`
                      min-w-9 rounded-full px-2 py-1.5
                      font-sans text-[10px] font-bold
                      tracking-[0.08em]
                      transition-all duration-200

                      ${
                        isActive
                          ? "bg-white/10 text-white shadow-sm"
                          : "text-white/35 hover:bg-white/[0.04] hover:text-white/70"
                      }
                    `}
                    data-testid={`btn-lang-${language.toLowerCase()}`}
                  >
                    {language}
                  </button>
                );
              })}
            </div>

            {/* Кнопка заказа */}
            <Link
              href="/order"
              className="
                group hidden h-10 items-center justify-center
                gap-2 rounded-full bg-primary px-5
                font-sans text-[11px] font-bold uppercase
                tracking-[0.07em] text-primary-foreground
                shadow-[0_9px_26px_rgba(255,106,0,0.24)]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-primary/90
                hover:shadow-[0_13px_32px_rgba(255,106,0,0.36)]
                lg:inline-flex
              "
              data-testid="button-nav-order"
            >
              Заказать

              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>

            {/* Кнопка мобильного меню */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="
                inline-flex h-11 w-11 items-center justify-center
                rounded-full border border-white/10
                bg-white/[0.035] text-white/80
                shadow-[0_8px_24px_rgba(0,0,0,0.18)]
                transition-all duration-300
                hover:border-primary/50
                hover:bg-primary/10 hover:text-primary
                lg:hidden
              "
              aria-label={
                isMobileMenuOpen
                  ? "Закрыть меню"
                  : "Открыть меню"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-menu"
              data-testid="button-mobile-menu"
            >
              <span
                className={`
                  transition-transform duration-300
                  ${
                    isMobileMenuOpen
                      ? "rotate-90"
                      : "rotate-0"
                  }
                `}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
      </nav>

      <div className="h-[72px] lg:hidden" aria-hidden="true" />

      {/* Мобильное меню */}
{isMobileMenuVisible && (
  <>
    {/* Затемнение страницы */}
    <button
      type="button"
      className={`
        fixed inset-x-0 bottom-0 top-[72px] z-40
        bg-black/80 backdrop-blur-sm
        transition-opacity duration-200
        lg:hidden

        ${
          isMobileMenuOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }
      `}
      aria-label="Закрыть мобильное меню"
      onClick={closeMobileMenu}
      data-testid="mobile-menu-backdrop"
    />

    {/* Карточка меню */}
    <div
      id="mobile-nav-menu"
      className={`
        fixed left-3 right-3 top-[82px] z-50
        max-h-[calc(100dvh-94px)]
        overflow-y-auto overscroll-contain
        rounded-[24px]
        border border-white/[0.10]
        bg-[#121212]
        p-3
        pb-[max(0.75rem,env(safe-area-inset-bottom))]
        shadow-[0_28px_80px_rgba(0,0,0,0.78)]
        transition-all duration-200 ease-out
        lg:hidden

        ${
          isMobileMenuOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-[0.985] opacity-0"
        }
      `}
      data-testid="mobile-menu"
    >
      {/* Заголовок */}
      <div className="mb-2 flex items-center justify-between px-2 py-1">
        <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
          Навигация
        </p>

        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(255,106,0,0.65)]" />
      </div>

      {/* Ссылки */}
      <div className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            location === "/" &&
            activeSection === item.section;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() =>
                item.home
                  ? goToHome()
                  : goToSection(item.section)
              }
              className={`
                group flex h-11 w-full
                items-center justify-between
                rounded-xl border px-4
                text-left font-sans text-sm font-semibold
                transition-all duration-200

                ${
                  isActive
                    ? "border-primary/25 bg-primary/[0.10] text-primary shadow-[inset_0_0_0_1px_rgba(255,106,0,0.04)]"
                    : "border-transparent text-white/62 hover:border-white/[0.06] hover:bg-white/[0.035] hover:text-white"
                }
              `}
              data-testid={`mobile-${item.testid}`}
              aria-current={
                isActive ? "location" : undefined
              }
            >
              <span>{item.label}</span>

              <span
                className={`
                  h-1 w-1 rounded-full
                  transition-all duration-200

                  ${
                    isActive
                      ? "bg-primary shadow-[0_0_8px_rgba(255,106,0,0.75)]"
                      : "bg-white/15 group-hover:bg-white/35"
                  }
                `}
              />
            </button>
          );
        })}
      </div>

      {/* Языки */}
      <div className="mt-3 rounded-2xl border border-white/[0.08] bg-black/25 p-2.5">
        <p className="px-1 font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-white/28">
          Язык
        </p>

        <div className="mt-2 grid grid-cols-3 gap-2">
          {LANGUAGES.map((language) => {
            const isActive =
              language === ACTIVE_LANGUAGE;

            return (
              <button
                key={language}
                type="button"
                aria-pressed={isActive}
                className={`
                  h-9 rounded-xl border
                  px-3 font-sans text-xs font-bold
                  transition-all duration-200

                  ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground shadow-[0_7px_18px_rgba(255,106,0,0.18)]"
                      : "border-white/[0.09] bg-white/[0.015] text-white/38 hover:border-primary/35 hover:text-white/75"
                  }
                `}
                data-testid={`mobile-btn-lang-${language.toLowerCase()}`}
              >
                {language}
              </button>
            );
          })}
        </div>
      </div>

      {/* Кнопка заказа */}
      <Link
        href="/order"
        onClick={(event) => {
          event.preventDefault();
          goToOrder();
        }}
        className="
          group mt-3 flex h-12 w-full
          items-center justify-center gap-2
          rounded-2xl bg-primary px-5
          font-sans text-xs font-bold uppercase
          tracking-[0.075em] text-primary-foreground
          shadow-[0_12px_28px_rgba(255,106,0,0.24)]
          transition-all duration-300
          hover:bg-primary/90
          hover:shadow-[0_15px_34px_rgba(255,106,0,0.32)]
          active:scale-[0.985]
        "
        data-testid="mobile-button-nav-order"
      >
        Создать подарок

        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  </>
)}
    </>
  );
}
