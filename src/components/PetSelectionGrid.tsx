import { Check, PawPrint } from "lucide-react";
import { ITEMS } from "@/lib/types";
import { PRICING, formatEuro } from "@/lib/pricing";
import CollapsibleOptionGrid from "@/components/CollapsibleOptionGrid";

interface PetSelectionGridProps {
  selectedPets: string[];
  onSelectionChange: (
    pets: string[],
    removedPets: string[],
  ) => void;
  noneSubtitle?: string;
  testIdPrefix?: string;
}

type PetOption = (typeof ITEMS.pets)[number];

function getPetLabel(pet: PetOption) {
  const catMatch = /^cat(\d+)$/i.exec(pet.id);

  if (catMatch) {
    return `Котик ${catMatch[1]}`;
  }

  const dogMatch = /^dog(\d+)$/i.exec(pet.id);

  if (dogMatch) {
    return `Собачка ${dogMatch[1]}`;
  }

  return pet.label ?? pet.id;
}

export default function PetSelectionGrid({
  selectedPets,
  onSelectionChange,
  noneSubtitle = "Композиция без животных",
  testIdPrefix = "pet",
}: PetSelectionGridProps) {
  const visiblePets = ITEMS.pets.filter(
    (pet) => pet.img,
  );

  const hasSelectedHiddenPet = visiblePets
    .slice(3)
    .some((pet) =>
      selectedPets.includes(pet.id),
    );

  const toggle = (id: string) => {
    const removing = selectedPets.includes(id);

    const next = removing
      ? selectedPets.filter(
          (petId) => petId !== id,
        )
      : [...selectedPets, id];

    onSelectionChange(
      next,
      removing ? [id] : [],
    );
  };

  const noPetSelected =
    selectedPets.length === 0;

  return (
    <CollapsibleOptionGrid
      alwaysVisible={
        <button
          type="button"
          onClick={() =>
            onSelectionChange([], selectedPets)
          }
          aria-pressed={noPetSelected}
          data-testid={`${testIdPrefix}-none`}
          className={`
            group relative flex min-h-[270px] w-full
            flex-col overflow-hidden rounded-[22px]
            border bg-[#171717] text-left
            transition-all duration-300
            active:scale-[0.99]

            ${
              noPetSelected
                ? "border-primary shadow-[0_0_0_1px_rgba(255,106,0,0.42),0_18px_45px_rgba(0,0,0,0.28)]"
                : "border-white/[0.10] hover:-translate-y-1 hover:border-primary/40"
            }
          `}
        >
          <div className="relative flex h-[170px] items-center justify-center overflow-hidden border-b border-white/[0.07] bg-[#141414]">
            <div className="absolute h-28 w-28 rounded-full border border-white/[0.04]" />
            <div className="absolute h-20 w-20 rounded-full border border-white/[0.06]" />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/[0.10] bg-white/[0.025] shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
              <PawPrint
                className="h-9 w-9 text-white/30"
                strokeWidth={1.5}
              />

              <span className="absolute h-[2px] w-12 -rotate-45 rounded-full bg-primary/75" />
            </div>

            {noPetSelected && (
              <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_20px_rgba(255,106,0,0.28)]">
                <Check
                  className="h-4 w-4"
                  strokeWidth={2.5}
                />
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col p-4">
            <h3
              className={`
                font-sans text-base font-semibold
                tracking-[-0.02em]

                ${
                  noPetSelected
                    ? "text-primary"
                    : "text-white"
                }
              `}
            >
              Без питомца
            </h3>

            <p className="mt-1.5 font-sans text-xs leading-relaxed text-white/40">
              {noneSubtitle}
            </p>

            <span
              className={`
                mt-auto pt-4 font-sans
                text-sm font-semibold

                ${
                  noPetSelected
                    ? "text-primary"
                    : "text-white/55"
                }
              `}
            >
              0 €
            </span>
          </div>
        </button>
      }
      expandedByDefault={
        hasSelectedHiddenPet
      }
      testId={`${testIdPrefix}-show-all`}
    >
      {visiblePets.map((pet) => {
        const isSelected =
          selectedPets.includes(pet.id);

        return (
          <button
            key={pet.id}
            type="button"
            onClick={() => toggle(pet.id)}
            aria-pressed={isSelected}
            data-testid={`${testIdPrefix}-${pet.id}`}
            className={`
              group relative flex min-h-[270px] w-full
              flex-col overflow-hidden rounded-[22px]
              border bg-[#171717] text-left
              transition-all duration-300
              active:scale-[0.99]

              ${
                isSelected
                  ? "border-primary shadow-[0_0_0_1px_rgba(255,106,0,0.42),0_18px_45px_rgba(0,0,0,0.28)]"
                  : "border-white/[0.10] hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.24)]"
              }
            `}
          >
            <div className="relative flex h-[170px] items-center justify-center overflow-hidden border-b border-white/[0.07] bg-[#141414]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.055),transparent_66%)]" />

              <img
                src={pet.img}
                alt={getPetLabel(pet)}
                width={420}
                height={420}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="
                  relative h-full w-full
                  scale-[0.9]
                  object-contain
                  p-5
                  transition-transform duration-500
                  group-hover:scale-[0.96]
                "
              />

              <div
                className={`
                  absolute right-4 top-4
                  flex h-9 w-9 items-center
                  justify-center rounded-full
                  border transition-all duration-300

                  ${
                    isSelected
                      ? "scale-100 border-primary bg-primary text-white opacity-100 shadow-[0_0_20px_rgba(255,106,0,0.28)]"
                      : "scale-90 border-white/[0.12] bg-black/30 text-transparent opacity-0 group-hover:scale-100 group-hover:opacity-100"
                  }
                `}
              >
                <Check
                  className="h-4 w-4"
                  strokeWidth={2.5}
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col p-4">
              <h3
                className={`
                  font-sans text-base font-semibold
                  tracking-[-0.02em]

                  ${
                    isSelected
                      ? "text-primary"
                      : "text-white"
                  }
                `}
              >
                {getPetLabel(pet)}
              </h3>

              <p className="mt-1.5 font-sans text-xs text-white/40">
                Питомец для композиции
              </p>

              <span
                className={`
                  mt-auto pt-4 font-sans
                  text-sm font-semibold

                  ${
                    isSelected
                      ? "text-primary"
                      : "text-white/70"
                  }
                `}
              >
                +{formatEuro(PRICING.pet)}
              </span>
            </div>
          </button>
        );
      })}
    </CollapsibleOptionGrid>
  );
}