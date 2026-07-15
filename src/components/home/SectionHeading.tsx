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
      className="text-center mb-12"
    >
      <h2 className="font-serif uppercase tracking-[0.18em] text-3xl md:text-4xl lg:text-[2.75rem] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-5 h-[3px] w-14 rounded-full bg-primary" />
    </motion.div>
  );
}
