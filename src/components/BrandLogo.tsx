import { useTranslation } from "react-i18next";

const base = import.meta.env.BASE_URL;
const logoPhotoSrc = `${base}images/optimized/formika-logo-96.jpg`;
const logoWordmarkSrc = `${base}images/optimized/logo-wordmark-300.png`;

type BrandLogoProps = {
  variant?: "header" | "footer";
};

const logoSizes = {
  header: {
    photo: "h-10 w-10",
    wordmark: "h-[18px] w-auto sm:h-[22px]",
    loading: "eager" as const,
  },
  footer: {
    photo: "h-11 w-11",
    wordmark: "h-[20px] w-auto",
    loading: "lazy" as const,
  },
};

export default function BrandLogo({ variant = "header" }: BrandLogoProps) {
  const { t } = useTranslation();
  const size = logoSizes[variant];

  return (
    <span className="flex items-center gap-3">
      <span
        className={`flex ${size.photo} shrink-0 items-center justify-center overflow-hidden rounded-full bg-black ring-1 ring-white/20`}
      >
        <img
          src={logoPhotoSrc}
          alt={t("brand.logoAlt")}
          width={96}
          height={96}
          loading={size.loading}
          decoding="async"
          className="block h-full w-full rounded-full object-contain object-center select-none"
          draggable={false}
        />
      </span>
      <img
        src={logoWordmarkSrc}
        alt=""
        aria-hidden="true"
        width={300}
        height={43}
        decoding="async"
        className={`block shrink-0 select-none ${size.wordmark}`}
        draggable={false}
      />
    </span>
  );
}
