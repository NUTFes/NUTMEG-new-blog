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
      <h2 className={styles.title}>{name}</h2>
      <p className={styles.description}>{description}</p>

      {/* 使用技術のセクション */}
      <h3 className={styles.sectionTitle}>使用技術：</h3>
      <span className={styles.techList}>
        {technologies.map((tech, index) => (
          <span key={index} className={styles.tech}>
            {tech}{index !== technologies.length - 1 ? ", " : ""}
          </span>
        ))}
      </span>

      {/* PMのセクション */}
      <h3 className={styles.sectionTitle}>PM：</h3>
      <span className={styles.pm}>
        <img src={pm.icon} alt={pm.name} className={styles.pmIcon} />
        <span className={styles.pmName}>{pm.name}</span>
      </span>

      <button className={styles.button}>詳しく見る</button>
    </div>
  );
};

export default TeamCard;