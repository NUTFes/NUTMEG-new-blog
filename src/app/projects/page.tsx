"use client";

import React from "react";
import ProjectCard from "../components/ProjectCard2";
import { getAllProjects } from "../lib/project";
import Breadcrumb from "../components/Breadcrumb"; 
import styles from "./ProjectsPage.module.css";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className={styles.projects}>
      <div className={styles.projectsBox}>
        {/* パンくずリスト */}
        <Breadcrumb current="Projects" />

        {/* プロジェクトカード */}
        <div className={styles.cardsContainerProject}>
          {projects.map((project) => (
            <ProjectCard
            name={project.name}
            logo={project.logo}
            summary={project.summary || ""} // ← undefined の場合は空文字
            pm={{ name: project.pmName || "未設定", icon: project.pmIcon || undefined }}
            href={`/projects2/${project.id}`}
            />
          ))}
        </div>

        {/* フッターとの余白 */}
        <div className={styles.footerSpacer} />
      </div>
    </div>
  );
}
