import React from "react";
import SectionHeading from "./SectionHeading";
import SkillCard from "./SkillCard";
const SkillSection = () => {
  return (
    <>
    
      <SectionHeading heading="Skills & Tools" />
      <section className="flex flex-col gap-12">
      
        <SkillCard
          title="Frontend Development"
          description="I build fast, scalable, and maintainable interfaces using modern frontend technologies."
          tech={[
            { label: "React", className: "top-6 left-6", delay: 0, Icon: "" },
            {
              label: "Tailwind",
              className: "top-10 right-10",
              delay: 80,
              Icon: "",
            },
            {
              label: "JavaScript",
              className: "bottom-10 left-10",
              delay: 160,
              Icon: "",
            },
            {
              label: "HTML5",
              className: "bottom-6 right-6",
              delay: 240,
              Icon: "",
            },
            {
              label: "CSS3",
              className: "top-1/2 -translate-y-1/2 right-2",
              delay: 320,
              Icon: "",
            },
          ]}
        />{" "}
        <SkillCard
          title="UI/UX Design"
          description="I don’t just code designs I understand them."
          tech={[
            { label: "React", className: "top-6 left-6", delay: 0, Icon: "" },
            {
              label: "Figma",
              className: "top-10 right-10",
              delay: 80,
              Icon: "",
            },
            {
              label: "Illustrator",
              className: "bottom-10 left-10",
              delay: 160,
              Icon: "",
            },
            {
              label: "Ui",
              className: "bottom-6 right-6",
              delay: 240,
              Icon: "",
            },
            {
              label: "Photoshop",
              className: "top-1/2 -translate-y-1/2 right-40",
              delay: 320,
              Icon: "",
            },
          ]}
        />{" "}
        <SkillCard
          title="Perfomance and Best Practices"
          description="Because Speed and Usability aren't optional."
          tech={[
            { label: "Caching", className: "top-6 left-6", delay: 0, Icon: "" },
            {
              label: "Lazy Loading",
              className: "top-5 right-10",
              delay: 80,
              Icon: "",
            },
            {
              label: "SEO",
              className: "bottom-10 left-10",
              delay: 160,
              Icon: "",
            },
            {
              label: "Code Splitting",
              className: "bottom-6 right-6",
              delay: 240,
              Icon: "",
            },
            {
              label: "Lighthouse",
              className: "top-1/2 -translate-y-1/2 right-40",
              delay: 320,
              Icon: "",
            },
          ]}
        />{" "}
        <SkillCard
          title="Version Control and Collaboration"
          description="Built for real teams, not solo semos."
          tech={[
            { label: "Git", className: "top-6 left-6", delay: 0, Icon: "" },
            {
              label: "Github",
              className: "top-5 right-10",
              delay: 80,
              Icon: "",
            },
            {
              label: "Slack",
              className: "bottom-10 left-10",
              delay: 160,
              Icon: "",
            },
            {
              label: "Jira",
              className: "bottom-6 right-6",
              delay: 240,
              Icon: "",
            },
            {
              label: "Agile",
              className: "top-1/3 -translate-y-1/2 right-2",
              delay: 320,
              Icon: "",
            },
            {
              label: "CI/CD",
              className: "top-1/2 -translate-y-1/2 right-34",
              delay: 320,
              Icon: "",
            },
          ]}
        />{" "}
      </section>{" "}
    </>
  );
};
export default SkillSection;
