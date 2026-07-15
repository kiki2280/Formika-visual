import FloatingBricks from "@/components/FloatingBricks";

export default function PageBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-background" aria-hidden="true">
      <FloatingBricks />
    </div>
  );
}
