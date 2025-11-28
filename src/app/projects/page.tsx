// src/app/projects/page.tsx
import ProjectCard from "../components/ProjectCard2";
import { getAllProjects } from "../lib/project";
import Breadcrumb from "../components/Breadcrumb"; 
import styles from "./ProjectsPage.module.css";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className={styles.projects}>
      <div className={styles.projectsBox}>
        <Breadcrumb current="Projects" />
        <div className={styles.cardsContainerProject}>
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              name={project.name}
              logo={project.logo}
              summary={project.summary || ""}
              pm={{ name: project.pmName || "未設定", icon: project.pmIcon || undefined }}
              href={`/projects/${project.id}`}
            />
          ))}
        </div>
        <div className={styles.footerSpacer} />
      </div>
    </div>
  );
}
