import CustomProductBuilder from "./CustomProductBuilder";

interface KeychainBuilderProps {
  onReturnToProductSelection: () => void;
}

export default function KeychainBuilder({
  onReturnToProductSelection,
}: KeychainBuilderProps) {
  return (
    <CustomProductBuilder
      productType="keychain"
      onReturnToProductSelection={onReturnToProductSelection}
    />
  );
}
