const SelectedProjectsCards = (props) => {
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
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80"
          className="
            h-full w-full object-cover object-center
            transition-transform duration-500
            group-hover:scale-[1.05]
          "
          alt={props.projectTitle}
        />

        
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

       
        <span className="absolute top-4 right-4 text-xs font-medium text-white/90 bg-black/30 px-3 py-1 rounded-full border border-white/20">
          Case Study
        </span>
      </div>

      <div className="p-6">
        <h4 className="text-lg font-semibold leading-snug">
          {props.projectTitle}
        </h4>

        <p className="text-gray-600 mt-2 leading-relaxed">
          {props.projectDescription}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <a
            href="#"
            className="
              inline-flex items-center gap-2
              text-blue-400 font-medium
              transition-colors
              hover:text-blue-500
            "
          >
            View Project
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>

        
          <span className="text-xs text-gray-400">React • UI • UX</span>
        </div>
      </div>
    </div>
  );
};

export default SelectedProjectsCards;
