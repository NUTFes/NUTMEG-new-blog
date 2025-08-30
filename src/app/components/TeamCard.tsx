import Image from "next/image";
import styles from "./TeamCard.module.css"; 

type TeamProps = {
  name: string;
  description: string;
  technologies: string[];
  pm: { name: string; icon: string };
};

const TeamCard: React.FC<TeamProps> = ({ name, description, technologies, pm }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardPadding}>
        <h2 className={styles.cardTitle}>{name}</h2>
        <p className={styles.cardAbstract}>{description}</p>

        <div className={`${styles.cardSection} ${styles.techInline}`}>
          <h3 className={styles.sectionTitle}>使用技術：</h3>
          <div className={styles.cardTags}>
            {technologies.map((tech, index) => (
              <span key={index} className={styles.tag}>{tech}</span>
            ))}
          </div>
        </div>

        <div className={`${styles.cardSection} ${styles.pmInline}`}>
          <h3 className={styles.sectionTitle}>PM：</h3>
          <div className={styles.pmInfo}>
            <Image src={pm.icon} alt={pm.name} width={30} height={30} className={styles.pmIcon} />
            <span className={styles.pmName}>{pm.name}</span>
          </div>
        </div>

        <div className={styles.arrowBox}>
          <Image src="/Arrow.svg" alt="Arrow" className={styles.arrow} height={40} width={40} />
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
