import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { Character, DEFAULT_FACE_ID, DEFAULT_FACE_ITEM, ITEMS } from "@/lib/types";
import { Button } from "@/components/ui/button";
import CharacterCategoryList, { type CharacterCategoryItem } from "./CharacterCategoryList";
import CharacterOptionModal, { type CharacterChoiceOption } from "./CharacterOptionModal";

interface CharacterEditorProps {
  index: number;
  character: Character;
  onChange: (character: Character) => void;
  onRemove?: () => void;
  showAccessories?: boolean;
  showName?: boolean;
}

type SingleSection = "face" | "hair" | "top" | "bottom";
type Section = "name" | SingleSection | "accessories";
type EditorItem = { id: string; label?: string; img?: string };
const NO_HAIR_ID = "__no_hair__";

const SECTION_LABELS: Record<Section, string> = {
  name: "Имя",
  face: "Лицо",
  hair: "Волосы",
  top: "Верх одежды",
  bottom: "Низ одежды",
  accessories: "Аксессуары",
};

const SINGLE_ITEMS: Record<SingleSection, EditorItem[]> = {
  face: ITEMS.face,
  hair: ITEMS.hair,
  top: ITEMS.top,
  bottom: ITEMS.bottom,
};

function itemLabel(item?: { id: string; label?: string }) {
  return item?.label ?? item?.id ?? "Не выбрано";
}

export default function CharacterEditor({
  index,
  character,
  onChange,
  onRemove,
  showAccessories = false,
  showName = false,
}: CharacterEditorProps) {
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
    if (section === "face" && selectedId === DEFAULT_FACE_ID) return DEFAULT_FACE_ITEM;
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
        title: SECTION_LABELS.name,
        value: character.name?.trim() ? character.name : "Не указано",
        preview: { alt: SECTION_LABELS.name, label: "Aa" },
        testId: `btn-open-name-${index}`,
      });
    }

    (["face", "hair", "top", "bottom"] as SingleSection[]).forEach((section) => {
      const selected = selectedSingleItem(section);
      items.push({
        id: section,
        title: SECTION_LABELS[section],
        value: selected ? `Выбрано: ${itemLabel(selected)}` : "Не выбрано",
        preview: selected?.img
          ? { src: selected.img, alt: itemLabel(selected) }
          : { alt: SECTION_LABELS[section], label: selected?.id ?? "—" },
        testId: `btn-open-${section}-${index}`,
      });
    });

    if (showAccessories) {
      items.push({
        id: "accessories",
        title: SECTION_LABELS.accessories,
        value:
          selectedAccessoryItems.length === 0
            ? "Без аксессуара"
            : selectedAccessoryItems.length === 1
              ? itemLabel(selectedAccessoryItems[0])
              : `${selectedAccessoryItems.length} выбрано`,
        preview: selectedAccessoryItems[0]?.img
          ? { src: selectedAccessoryItems[0].img, alt: itemLabel(selectedAccessoryItems[0]) }
          : { alt: SECTION_LABELS.accessories, label: "—" },
        testId: `btn-open-accessories-${index}`,
      });
    }

    return items;
  }, [
    character,
    index,
    selectedAccessoryItems,
    showAccessories,
    showName,
  ]);

  const singleOptions = (section: SingleSection): CharacterChoiceOption[] => {
    const options = SINGLE_ITEMS[section].map((item) => ({
      id: item.id,
      label: item.label ?? item.id,
      img: item.img,
      selected: (section === "face" ? character.face ?? DEFAULT_FACE_ID : character[section]) === item.id,
      testId: `item-${item.id}-char-${index}`,
    }));

    if (section !== "hair") return options;

    const selectedHairExists = !!character.hair && SINGLE_ITEMS.hair.some((item) => item.id === character.hair);

    return [
      {
        id: NO_HAIR_ID,
        label: "Без волос",
        selected: !selectedHairExists,
        testId: `item-no-hair-char-${index}`,
      },
      ...options,
    ];
  };

  const accessoryOptions: CharacterChoiceOption[] = [
    {
      id: "__none__",
      label: "Без аксессуара",
      selected: (character.accessories ?? []).length === 0,
      testId: `item-none-acc-char-${index}`,
    },
    ...visibleAccessories.map((item) => ({
      id: item.id,
      label: item.label ?? item.id,
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
          title={SECTION_LABELS.name}
          onClose={() => setActiveSection(null)}
        >
          <div className="space-y-4">
            <label className="block text-sm font-semibold uppercase tracking-widest text-primary">
              Имя человечка
            </label>
            <input
              type="text"
              value={character.name ?? ""}
              onChange={(event) => onChange({ ...character, name: event.target.value })}
              placeholder="Введите имя"
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
                Готово
              </Button>
            </div>
          </div>
        </CharacterOptionModal>
      );
    }

    if (activeSection === "accessories") {
      return (
        <CharacterOptionModal
          title={SECTION_LABELS.accessories}
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
        title={SECTION_LABELS[activeSection]}
        options={singleOptions(activeSection)}
        onClose={() => setActiveSection(null)}
        onSelect={(id) => setSingle(activeSection, id)}
        closeOnSelect
      />
    );
  };

  return (
    <div className="relative mt-4 rounded-xl border border-border bg-card p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className="font-sans text-lg font-semibold">Человечек {index + 1}</h4>
        {onRemove && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            data-testid={`btn-remove-character-${index}`}
          >
            <Trash2 className="mr-1 h-4 w-4" />
            Удалить
          </Button>
        )}
      </div>

      <CharacterCategoryList items={categories} onOpen={setActiveSection} />
      {renderModal()}
    </div>
  );
}
