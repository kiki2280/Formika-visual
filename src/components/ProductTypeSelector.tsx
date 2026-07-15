import type { ProductType } from "@/lib/types";
import { Check } from "lucide-react";

interface ProductTypeSelectorProps {
  selected: ProductType;
  onSelect: (type: ProductType) => void;
}

const base = import.meta.env.BASE_URL;

type ProductOption = {
  id: Exclude<ProductType, null>;
  title: string;
  subtitle: string;
  image: string;
  imagePosition?: string;
};

const PRODUCTS: ProductOption[] = [
  {
    id: "frame",
    title: "Рамка",
    subtitle:
      "Персональная композиция с фигурками, надписью, фоном и подсветкой.",
    image: `${base}images/optimized/work-family-1.webp`,
    imagePosition: "object-[center_52%]",
  },
  {
    id: "keychain",
    title: "Брелок",
    subtitle:
      "Готовая модель или персональный персонаж, созданный специально для вас.",
    image: `${base}images/optimized/ready-keychain-3.webp`,
    imagePosition: "object-[center_80%]",
  },
];

export default function ProductTypeSelector({
  selected,
  onSelect,
}: ProductTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
      {PRODUCTS.map((product, index) => {
        const isSelected = selected === product.id;

        return (
          <button
            key={product.id}
            type="button"
            onClick={() => onSelect(product.id)}
            aria-pressed={isSelected}
            className={`
              group relative flex w-full flex-col overflow-hidden
              rounded-[28px] border bg-[#141414] text-left
              shadow-[0_18px_50px_rgba(0,0,0,0.3)]
              transition-all duration-300
              active:scale-[0.99]

              ${
                isSelected
                  ? "border-primary shadow-[0_0_0_1px_rgba(255,106,0,0.8),0_22px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(255,106,0,0.12)]"
                  : "border-white/10 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_25px_65px_rgba(0,0,0,0.5)]"
              }
            `}
            data-testid={`product-type-${product.id}`}
          >
            {/* Фотография */}
            <div className="relative h-[290px] w-full overflow-hidden sm:h-[320px]">
              <img
                src={product.image}
                alt={product.title}
                width={800}
                height={640}
                loading="eager"
                decoding="async"
                fetchPriority={index === 0 ? "high" : "auto"}
                draggable={false}
                className={`
                  absolute inset-0 h-full w-full object-cover
                  ${product.imagePosition ?? "object-center"}
                  transition-transform duration-700 ease-out
                  group-hover:scale-[1.035]
                `}
              />

              {/* Очень мягкое затемнение только снизу */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

              {/* Галочка выбранного варианта */}
              <div
                className={`
                  absolute right-5 top-5
                  flex h-10 w-10 items-center justify-center
                  rounded-full border backdrop-blur-md
                  transition-all duration-300

                  ${
                    isSelected
                      ? "scale-100 border-primary bg-primary text-white opacity-100 shadow-[0_0_24px_rgba(255,106,0,0.35)]"
                      : "scale-90 border-white/15 bg-black/35 text-white opacity-0 group-hover:scale-100 group-hover:opacity-70"
                  }
                `}
              >
                <Check className="h-5 w-5" strokeWidth={2.4} />
              </div>
            </div>

            {/* Текст находится отдельно и не закрывает фотографию */}
            <div className="flex min-h-[135px] w-full flex-col justify-center border-t border-white/[0.08] px-6 py-5">
              <h3 className="font-sans text-xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-2xl">
                {product.title}
              </h3>

              <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-white/50">
                {product.subtitle}
              </p>

              {isSelected && (
                <span className="mt-3 font-sans text-xs font-bold uppercase tracking-[0.1em] text-primary">
                  Выбрано
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
