import { Link } from "react-router-dom";

const SelectedProjectsCards = ({ project }) => {
  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl
        border border-gray-200/80 bg-white/40 backdrop-blur
        transition-all duration-300
        hover:-translate-y-2 hover:border-blue-200
        hover:shadow-[0_18px_60px_rgba(37,99,235,0.12)]
      "
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={project.ProjectImage}
          className="
            h-full w-full object-cover object-center
            transition-transform duration-500
            group-hover:scale-[1.05]
          "
          alt={project.title}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent" />
        <span className="absolute top-4 right-4 text-xs font-medium text-white/90 bg-black/30 px-3 py-1 rounded-full border border-white/20">
          Case Study
        </span>
      </div>

      <div className="p-6">
        <h4 className="text-lg font-semibold leading-snug">{project.title}</h4>
        <p className="text-gray-600 mt-2 leading-relaxed">{project.description}</p>

        <div className="mt-5 flex items-center justify-between">
          <Link
            to={`/projects/${project.slug}`}
            className="
              inline-flex items-center gap-2
              text-blue-400 font-medium
              transition-colors
              hover:text-blue-500
            "
          >
            View Project
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>

          <span className="text-xs text-gray-400">
            {(project.tags || ["React", "UI", "UX"]).join(" • ")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SelectedProjectsCards;
