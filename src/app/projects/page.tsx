"use client";

import React from "react";
import styles from "./TeamsProjects.module.css";
import { teamsData } from "../components/teamsData";
import { projectsData } from "../components/projectsData";

import TeamCard from "../components/TeamCard";
import ProjectCard from "../components/ProjectCard";

import Link from "next/link";
import { useRouter } from "next/navigation";

const TeamsAndProjects = () => {
  const router = useRouter();

  return (
    <>
      <div className={styles.projects}>
        <div className={styles.projectsBox}>

          <div className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLinkSmall}>Home</Link>
            <span className={styles.breadcrumbLinkArrow}> &gt; </span>
            <button
              className={styles.breadcrumbLinkBig}
              onClick={() => router.replace("/teams&projects")}
            >
              Projects
            </button>
          </div>

          <div className={styles.cardsContainer}>
            <div className={styles.cardsContainerProject}>
                {projectsData.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            </div>

        </div>
      </div>

      <div className={styles.teams}>
        <div className={styles.teamsBox}>
          <div className={styles.bigTitleTeams}>Teams</div>
          <div className={styles.cardsContainerTeams}>
            {teamsData.map((team) => (
              <TeamCard key={team.id} {...team} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamsAndProjects;