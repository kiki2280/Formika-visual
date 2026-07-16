import FloatingBricks from "@/components/FloatingBricks";

export default function PageBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-0 h-screen h-[100lvh] bg-background"
      aria-hidden="true"
    >
      <FloatingBricks />
    </div>
  );
}
