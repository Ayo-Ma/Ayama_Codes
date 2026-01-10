// SkillCard.jsx
import React from "react";

function TechBadge({ label, Icon, className, delay = 0 }) {
  return (
    <span
      className={[
       
        "absolute z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2",
        "backdrop-blur-md shadow-lg",
        
        "opacity-0 scale-90 translate-y-2",
        "transition-all duration-500 ease-out",
        "group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0",
       
        "motion-reduce:transition-none motion-reduce:transform-none",
        className,
      ].join(" ")}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {Icon ? <Icon className="h-4 w-4 text-white/90" /> : null}
      <span className="text-xs font-medium text-white/90">{label}</span>
    </span>
  );
}

export default function SkillCard({
  title,
  description,
  tech = [], // [{ label, Icon, className, delay }]
}) {
  return (
    <div
      className={[
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-6",
        "hover:border-white/20 transition-colors",
      ].join(" ")}
    >
    
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -inset-24 bg-linear-to-tr from-blue-500/10 via-transparent to-blue-200/5 blur-2xl" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        {tech.map((t) => (
          <TechBadge
            key={t.label}
            label={t.label}
            Icon={t.Icon}
            className={t.className}
            delay={t.delay}
          />
        ))}
      </div>

   
      <h4 className="text-3xl font-bold text-white">{title}</h4>
      <p className="mt-2 max-w-xl text-gray-400">{description}</p>

    
      <p className="mt-6 text-xs text-white/40">
        Hover to reveal technologies
      </p>
    </div>
  );
}
