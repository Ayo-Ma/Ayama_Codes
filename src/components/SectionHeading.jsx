import React from "react";

const SectionHeading = (props) => {
  return (
    <section className="heading mx-auto">
      <h2 className="text-3xl font-semibold mb-3 text-center text-blue-400">{props.heading}</h2>
      <p className="text-gray-500 mb-6 text-center max-w-3xl mx-auto">
        {props.paragraph}
      </p>
    </section>
  );
};

export default SectionHeading;
