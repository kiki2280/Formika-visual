import { motion } from "@/lib/motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-12 text-center"
    >
      <h2 className="font-serif text-base font-medium uppercase leading-tight tracking-normal min-[360px]:text-lg sm:text-3xl md:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-xl font-sans text-sm text-muted-foreground md:text-base">
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-5 h-[3px] w-14 rounded-full bg-primary" />
    </motion.div>
  );
}
