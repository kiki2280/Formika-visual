import { PawPrint } from "lucide-react";
import { useTranslation } from "react-i18next";
import PetSelectionGrid from "@/components/PetSelectionGrid";
import {
  type FrameOrderState,
  ITEMS,
  getPetLabel,
} from "@/lib/types";

interface StepProps {
  state: FrameOrderState;
  onChange: (
    state: FrameOrderState,
  ) => void;
}

export default function PetsStep({
  state,
  onChange,
}: StepProps) {
  const { t } = useTranslation();
  const removePetPositions = (
    ids: string[],
  ) => {
    if (!state.previewPositions) {
      return state.previewPositions;
    }

    const next = {
      ...state.previewPositions,
    };

    ids.forEach((id) => {
      delete next[id];
    });

    return next;
  };

  const setPets = (
    pets: string[],
    removedPets: string[],
  ) => {
    onChange({
      ...state,
      pets,
      previewPositions:
        removedPets.length > 0
          ? removePetPositions(removedPets)
          : state.previewPositions,
    });
  };

  const setPetName = (
    id: string,
    name: string,
  ) => {
    onChange({
      ...state,
      petNames: {
        ...state.petNames,
        [id]: name,
      },
    });
  };

  return (
    <div className="space-y-6">
      <PetSelectionGrid
        selectedPets={state.pets}
        onSelectionChange={setPets}
        testIdPrefix="pets"
      />

      {state.pets.length > 0 && (
        <section className="rounded-[24px] border border-white/[0.09] bg-white/[0.025] p-5 sm:p-6">
          <div className="mb-5 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.07] text-primary">
              <PawPrint
                className="h-5 w-5"
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h3 className="font-sans text-base font-semibold text-white">
                {t("frameBuilder.pets.namesTitle")}
              </h3>

              <p className="mt-1 font-sans text-xs leading-relaxed text-white/40">
                {t("frameBuilder.pets.namesDescription")}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {state.pets.map((id) => {
              const pet = ITEMS.pets.find(
                (item) => item.id === id,
              );

              return (
                <div
                  key={id}
                  className="rounded-2xl border border-white/[0.08] bg-black/15 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-[#141414]">
                      {pet?.img ? (
                        <img
                          src={pet.img}
                          alt={getPetLabel(id)}
                          width={100}
                          height={100}
                          className="h-full w-full scale-[1.2] object-contain p-1"
                          draggable={false}
                        />
                      ) : (
                        <PawPrint className="h-5 w-5 text-white/30" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-sans text-sm font-semibold text-white">
                        {getPetLabel(id)}
                      </p>

                      <p className="mt-0.5 font-sans text-xs text-white/35">
                        {t("frameBuilder.pets.nameLabel")}
                      </p>
                    </div>
                  </div>

                  <input
                    type="text"
                    value={
                      state.petNames?.[id] ?? ""
                    }
                    onChange={(event) =>
                      setPetName(
                        id,
                        event.target.value,
                      )
                    }
                    placeholder={t("frameBuilder.pets.namePlaceholder")}
                    className="
                      mt-3 h-11 w-full rounded-xl
                      border border-white/[0.10]
                      bg-black/20 px-3
                      font-sans text-sm text-white
                      outline-none
                      placeholder:text-white/25
                      transition-colors duration-200
                      focus:border-primary/60
                    "
                    data-testid={`input-pet-name-${id}`}
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
