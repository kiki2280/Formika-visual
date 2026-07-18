import { useRef } from "react";
import GalleryModal from "@/components/GalleryModal";
import { useTranslation } from "react-i18next";

export interface DetailModalData {
  title: string;
  description: string;
  examples: { img: string; label?: string }[];
}

interface DetailModalProps {
  data: DetailModalData | null;
  onClose: () => void;
}

export default function DetailModal({ data, onClose }: DetailModalProps) {
  const { t } = useTranslation();
  const returnFocusRef = useRef<HTMLElement>(null);

  return (
    <GalleryModal
      data={
        data
          ? {
              title: data.title,
              description: data.description,
              images: data.examples.map((example) => ({
                src: example.img,
                alt: example.label,
              })),
            }
          : null
      }
      onClose={onClose}
      returnFocusRef={returnFocusRef}
      cta={{
        label: t("common.order"),
        href: "/order",
        testId: "btn-modal-order",
      }}
    />
  );
}
