import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import {
  Character,
  DEFAULT_FACE_ID,
  ITEMS,
  getCharacterOptionLabel,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import CharacterCategoryList, { type CharacterCategoryItem } from "./CharacterCategoryList";
import CharacterOptionModal, { type CharacterChoiceOption } from "./CharacterOptionModal";
import { useTranslation } from "react-i18next";

interface CharacterEditorProps {
  index: number;
  character: Character;
  onChange: (character: Character) => void;
  onRemove?: () => void;
  showAccessories?: boolean;
  showName?: boolean;
  faceInvalid?: boolean;
}

type SingleSection = "face" | "hair" | "top" | "bottom";
type Section = "name" | SingleSection | "accessories";
type EditorItem = { id: string; label?: string; img?: string };
const NO_HAIR_ID = "__no_hair__";

const SECTION_LABEL_KEYS: Record<Section, string> = {
  name: "characterEditor.nameCategory",
  face: "characterEditor.faceCategory",
  hair: "characterEditor.hairCategory",
  top: "characterEditor.topCategory",
  bottom: "characterEditor.bottomCategory",
  accessories: "characterEditor.accessoriesCategory",
};

const SINGLE_ITEMS: Record<SingleSection, EditorItem[]> = {
  face: ITEMS.face,
  hair: ITEMS.hair,
  top: ITEMS.top,
  bottom: ITEMS.bottom,
};

function itemLabel(item?: { id: string; label?: string }) {
  return item ? getCharacterOptionLabel(item) : "";
}

export default function CharacterEditor({
  index,
  character,
  onChange,
  onRemove,
  showAccessories = false,
  showName = false,
  faceInvalid = false,
}: CharacterEditorProps) {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<Section | null>(null);

  const visibleAccessories = useMemo(
    () => ITEMS.accessories.filter((item) => item.img),
    []
  );

  const setSingle = (type: SingleSection, id: string) => {
    if (type === "face") {
      onChange({ ...character, face: id });
      return;
    }
    if (type === "hair" && id === NO_HAIR_ID) {
      onChange({ ...character, hair: null });
      return;
    }
    onChange({ ...character, [type]: character[type] === id ? null : id });
  };

  const toggleAcc = (id: string) => {
    const current = character.accessories ?? [];
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    onChange({ ...character, accessories: next });
  };

  const selectedSingleItem = (section: SingleSection) => {
    const selectedId = section === "face" ? character.face ?? DEFAULT_FACE_ID : character[section];
    if (section === "face" && selectedId === DEFAULT_FACE_ID) return undefined;
    return SINGLE_ITEMS[section].find((item) => item.id === selectedId);
  };

  const selectedAccessoryItems = visibleAccessories.filter((item) =>
    (character.accessories ?? []).includes(item.id)
  );

  const categories = useMemo(() => {
    const items: CharacterCategoryItem<Section>[] = [];

    if (showName) {
      items.push({
        id: "name",
        title: t(SECTION_LABEL_KEYS.name),
        value: character.name?.trim() ? character.name : t("characterEditor.notSpecified"),
        preview: {
          alt: t(SECTION_LABEL_KEYS.name),
          label: t("characterEditor.namePreview"),
        },
        testId: `btn-open-name-${index}`,
      });
    }

    (["face", "hair", "top", "bottom"] as SingleSection[]).forEach((section) => {
      const selected = selectedSingleItem(section);
      items.push({
        id: section,
        title: t(SECTION_LABEL_KEYS[section]),
        value: selected
          ? t("characterEditor.selectedValue", { item: itemLabel(selected) })
          : t("characterEditor.notSelected"),
        invalid: section === "face" && faceInvalid,
        preview: selected?.img
          ? { src: selected.img, alt: itemLabel(selected) }
          : {
              alt: t(SECTION_LABEL_KEYS[section]),
              label: selected?.id ?? t("characterEditor.emptyPreview"),
            },
        testId: `btn-open-${section}-${index}`,
      });
    });

    if (showAccessories) {
      items.push({
        id: "accessories",
        title: t(SECTION_LABEL_KEYS.accessories),
        value:
          selectedAccessoryItems.length === 0
            ? t("characterEditor.noAccessory")
            : selectedAccessoryItems.length === 1
              ? itemLabel(selectedAccessoryItems[0])
              : t("characterEditor.selectedCount", {
                  count: selectedAccessoryItems.length,
                }),
        preview: selectedAccessoryItems[0]?.img
          ? { src: selectedAccessoryItems[0].img, alt: itemLabel(selectedAccessoryItems[0]) }
          : {
              alt: t(SECTION_LABEL_KEYS.accessories),
              label: t("characterEditor.emptyPreview"),
            },
        testId: `btn-open-accessories-${index}`,
      });
    }

    return items;
  }, [
    character,
    index,
    selectedAccessoryItems,
    showAccessories,
    faceInvalid,
    showName,
    t,
  ]);

  const singleOptions = (section: SingleSection): CharacterChoiceOption[] => {
    const options = SINGLE_ITEMS[section].map((item) => ({
      id: item.id,
      label: itemLabel(item),
      img: item.img,
      selected: (section === "face" ? character.face ?? DEFAULT_FACE_ID : character[section]) === item.id,
      testId: `item-${item.id}-char-${index}`,
    }));

    if (section !== "hair") return options;

    const selectedHairExists = !!character.hair && SINGLE_ITEMS.hair.some((item) => item.id === character.hair);

    return [
      {
        id: NO_HAIR_ID,
        label: t("characterEditor.noHair"),
        selected: !selectedHairExists,
        testId: `item-no-hair-char-${index}`,
      },
      ...options,
    ];
  };

  const accessoryOptions: CharacterChoiceOption[] = [
    {
      id: "__none__",
      label: t("characterEditor.noAccessory"),
      selected: (character.accessories ?? []).length === 0,
      testId: `item-none-acc-char-${index}`,
    },
    ...visibleAccessories.map((item) => ({
      id: item.id,
      label: itemLabel(item),
      img: item.img,
      selected: (character.accessories ?? []).includes(item.id),
      testId: `item-${item.id}-acc-char-${index}`,
    })),
  ];

  const renderModal = () => {
    if (!activeSection) return null;

    if (activeSection === "name") {
      return (
        <CharacterOptionModal
          title={t(SECTION_LABEL_KEYS.name)}
          onClose={() => setActiveSection(null)}
        >
          <div className="space-y-4">
            <label className="block text-sm font-semibold uppercase tracking-widest text-primary">
              {t("characterEditor.characterNameLabel")}
            </label>
            <input
              type="text"
              value={character.name ?? ""}
              onChange={(event) => onChange({ ...character, name: event.target.value })}
              placeholder={t("characterEditor.namePlaceholder")}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/70"
              data-testid={`input-character-name-${index}`}
              autoFocus
            />
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={() => setActiveSection(null)}
                className="bg-primary text-primary-foreground"
                data-testid={`btn-save-character-name-${index}`}
              >
                {t("characterEditor.done")}
              </Button>
            </div>
          </div>
        </CharacterOptionModal>
      );
    }

    if (activeSection === "accessories") {
      return (
        <CharacterOptionModal
          title={t(SECTION_LABEL_KEYS.accessories)}
          options={accessoryOptions}
          onClose={() => setActiveSection(null)}
          collapseOptions
          onSelect={(id) => {
            if (id === "__none__") {
              onChange({ ...character, accessories: [], accessoryPositions: {} });
              return;
            }
            toggleAcc(id);
          }}
        />
      );
    }

    return (
      <CharacterOptionModal
        title={t(SECTION_LABEL_KEYS[activeSection])}
        options={singleOptions(activeSection)}
        onClose={() => setActiveSection(null)}
        onSelect={(id) => setSingle(activeSection, id)}
        closeOnSelect
      />
    );
  };

  return (
    <div
      className={cn(
        "relative mt-4 rounded-xl border border-border bg-card p-4 transition-colors",
        faceInvalid &&
          "border-destructive/80 shadow-[0_0_0_2px_rgba(239,68,68,0.18)]",
      )}
      aria-invalid={faceInvalid || undefined}
      data-testid={`character-editor-${index}`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className="font-sans text-lg font-semibold">
          {t("characterEditor.characterNumber", { number: index + 1 })}
        </h4>
        {onRemove && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            data-testid={`btn-remove-character-${index}`}
          >
            <Trash2 className="mr-1 h-4 w-4" />
            {t("characterEditor.delete")}
          </Button>
        )}
      </div>

      {faceInvalid && (
        <p className="mb-3 text-sm font-medium text-destructive" role="alert">
          {t("characterEditor.faceNotSelected")}
        </p>
      )}

      <CharacterCategoryList items={categories} onOpen={setActiveSection} />
      {renderModal()}
    </div>
  );
}
