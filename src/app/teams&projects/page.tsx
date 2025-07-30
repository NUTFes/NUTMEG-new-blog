// pages/index.tsx
import React from "react";
import styles from "./TeamsProjects.module.css";
import { teamsData } from "../components/teamsData";
import TeamCard from "../components/TeamCard";



const TeamsAndProjects = () => {
  return (
    <>
      <div className={styles.teamsBox}>
            <p className={styles.title}>Teams</p>
                    
        <div className={styles.cardsContainer}>
          {teamsData.map((team) => (
            <TeamCard key={team.id} {...team} />
          ))}
        </div>

      </div>

      <div className={styles.projectsBox}>
            <p className={styles.title}>Projects</p>
          
      </div>
    </>
  );
};

export default TeamsAndProjects;