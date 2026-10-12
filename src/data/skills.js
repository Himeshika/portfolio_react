import { SiJavascript, SiTypescript, SiMysql, SiMongodb, SiReact, SiNodedotjs, SiExpress, SiTailwindcss, SiSpring, SiGit, SiGithub, SiPostman, SiFigma, SiJest } from 'react-icons/si';
import { FaJava, FaDatabase, FaHtml5, FaCss3Alt, FaCogs, FaLaptopCode, FaCode } from 'react-icons/fa';
import { TbTestPipe } from 'react-icons/tb';

export const skillGroups = [
  {
    label: "Languages",
    index: "01",
    color: "#F43F7A",
    skills: [
      { name: "Java",       Icon: FaJava,       color: "#ED8B00" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "SQL",        Icon: FaDatabase,   color: "#4479A1" },
      { name: "HTML5",      Icon: FaHtml5,      color: "#E34F26" },
      { name: "CSS3",       Icon: FaCss3Alt,    color: "#1572B6" },
    ],
  },
  {
    label: "Backend",
    index: "02",
    color: "#8B5CF6",
    skills: [
      { name: "Spring Boot",     Icon: SiSpring,    color: "#6DB33F" },
      { name: "Spring Security", Icon: SiSpring,    color: "#6DB33F" },
      { name: "Spring Data JPA", Icon: SiSpring,    color: "#6DB33F" },
      { name: "Spring MVC",      Icon: SiSpring,    color: "#6DB33F" },
      { name: "Node.js",         Icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js",      Icon: SiExpress,   color: "#ffffff" },
      { name: "REST APIs",       Icon: FaDatabase,  color: "#7DD3FC" },
      { name: "Hibernate",       Icon: FaDatabase,  color: "#59666C" },
    ],
  },
  {
    label: "Frontend",
    index: "03",
    color: "#C4A6FF",
    skills: [
      { name: "React",        Icon: SiReact,       color: "#61DAFB" },
      { name: "React Router", Icon: SiReact,       color: "#CA4245" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
      { name: "HTML5",        Icon: FaHtml5,       color: "#E34F26" },
      { name: "CSS3",         Icon: FaCss3Alt,     color: "#1572B6" },
    ],
  },
  {
    label: "Databases",
    index: "04",
    color: "#B5179E",
    skills: [
      { name: "MySQL",   Icon: SiMysql,   color: "#4479A1" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
    ],
  },
  {
    label: "Tools",
    index: "05",
    color: "#7DD3FC",
    skills: [
      { name: "Git",          Icon: SiGit,       color: "#F05032" },
      { name: "GitHub",       Icon: SiGithub,    color: "#6e40c9" },
      { name: "Maven",        Icon: FaCogs,      color: "#C71A36" },
      { name: "IntelliJ IDEA",Icon: FaLaptopCode,color: "#FE315D" },
      { name: "VS Code",      Icon: FaCode,      color: "#007ACC" },
      { name: "Postman",      Icon: SiPostman,   color: "#FF6C37" },
      { name: "Figma",        Icon: SiFigma,     color: "#F24E1E" },
      { name: "Jest",         Icon: SiJest,      color: "#C21325" },
      { name: "Supertest",    Icon: TbTestPipe,  color: "#7DD3FC" },
    ],
  },
  {
    label: "Concepts",
    index: "06",
    color: "#F43F7A",
    skills: [
      { name: "OOP",             Icon: FaJava,     color: "#ED8B00" },
      { name: "MVC",             Icon: FaDatabase, color: "#C4A6FF" },
      { name: "REST",            Icon: FaDatabase, color: "#7DD3FC" },
      { name: "JWT / Auth",      Icon: FaDatabase, color: "#F43F7A" },
      { name: "CRUD",            Icon: FaDatabase, color: "#B5179E" },
      { name: "DBMS",            Icon: FaDatabase, color: "#8B5CF6" },
      { name: "SDLC / STLC",    Icon: FaDatabase, color: "#C4A6FF" },
      { name: "Design Patterns", Icon: FaDatabase, color: "#7DD3FC" },
    ],
  },
];
