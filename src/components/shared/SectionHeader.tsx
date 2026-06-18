interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ number, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="relative mb-12">
      <span
        className="pointer-events-none absolute -left-2 -top-8 select-none font-heading text-[8rem] font-bold leading-none text-primary/[0.03] sm:text-[10rem]"
        aria-hidden="true"
      >
        {number}
      </span>
      <div className="relative">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="section-divider mt-8" />
    </div>
  );
}
