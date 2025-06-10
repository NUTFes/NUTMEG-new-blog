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
      <div className={styles.techList}>
        {technologies.map((tech, index) => (
          <span key={index} className={styles.tech}>{tech}</span>
        ))}
      </div>
      <div className={styles.pm}>
        <img src={pm.icon} alt={pm.name} className={styles.pmIcon} />
        <span className={styles.pmName}>{pm.name}</span>
      </div>
      <button className={styles.button}>詳しく見る</button>
    </div>
  );
};

export default TeamCard;