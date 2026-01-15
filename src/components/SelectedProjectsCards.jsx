/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SelectedProjectsCards = ({ project }) => {
  return (
    <motion.article
      className="group relative"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
  
      <Link
        to={`/projects/${project.slug}`}
        aria-label={`Open case study: ${project.title}`}
        className="
          block h-full
          relative overflow-hidden rounded-2xl
          border border-slate-200/80 bg-white/60 backdrop-blur
          transition-all duration-300
          hover:-translate-y-2 hover:border-blue-200
          hover:shadow-[0_18px_60px_rgba(37,99,235,0.12)]
          focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200/70
          active:-translate-y-0.5
        "
      >
   
        <div className="h-1.5 w-full bg-linear-to-r from-blue-200 via-blue-300 to-blue-200" />

        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={project.ProjectImage}
            className="
              h-full w-full object-cover object-center
              transition-transform duration-500
              group-hover:scale-[1.06]
            "
            alt={project.title}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            loading="lazy"
          />

          
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/30 via-slate-900/10 to-transparent" />

   
          <span
            className="
              absolute top-4 right-4
              text-xs font-semibold
              text-blue-700 bg-blue-100/90
              px-3 py-1 rounded-full
              border border-blue-200/70
              shadow-sm
            "
          >
            Case Study
          </span>

          
          <span
            aria-hidden="true"
            className="
              pointer-events-none absolute -left-1/2 top-0 h-full w-1/2
              rotate-12 bg-linear-to-r from-transparent via-white/25 to-transparent
              opacity-0 group-hover:opacity-100
              translate-x-0 group-hover:translate-x-[220%]
              transition-all duration-700
            "
          />
        </div>

        <div className="p-6">
          <h4 className="text-lg font-semibold leading-snug text-slate-800">
            {project.title}
          </h4>

          <p className="text-slate-600 mt-2 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="mt-5 flex flex-col-reverse  items-center justify-between gap-4">
          
            <span
              className="
               inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-2
                text-blue-500 font-semibold
                transition-colors
                group-hover:text-blue-600
              "
            >
              View Project
              <motion.span
                className="inline-block"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                →
              </motion.span>
            </span>

            <span className="text-xs text-slate-400 text-right">
              {(project.tags || ["React", "UI", "UX"]).join(" • ")}
            </span>
          </div>

        
          <div className="mt-3 text-xs text-slate-400">
            Tap to open case study
          </div>
        </div>

       
        <div
          className="
            pointer-events-none absolute inset-x-0 bottom-0 h-px
            bg-linear-to-r from-transparent via-blue-300/60 to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
          "
        />
      </Link>
    </motion.article>
  );
};

export default SelectedProjectsCards;
