import Link from "next/link";
import Image from "next/image";
import styles from "./ProjectCard.module.css";

type ProjectProps = {
  logo: string;
  description: string;
  technologies: string[];
  pm: {
    name: string;
    icon: string;
  };
  href: string;
};

const ProjectCard: React.FC<ProjectProps> = ({
  logo,
  description,
  technologies,
  pm,
  href,
}) => {
  return (
    <Link href={href} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.cardPadding}>
          <div className={styles.cardTitle}>
            <Image
              src={logo}
              alt="Project Logo"
              // width={150}
              // height={47}
              fill
              className={styles.logoImage}
            />
          </div>

          <p className={styles.cardAbstract}>{description}</p>

          <div className={`${styles.cardSection} ${styles.techInline}`}>
            <h3 className={styles.sectionTitle}>使用技術：</h3>
            <div className={styles.cardTags}>
              {technologies.map((tech, index) => (
                <span key={index} className={styles.tag}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className={`${styles.cardSection} ${styles.pmInline}`}>
            <h3 className={styles.sectionTitle}>PM：</h3>
            <div className={styles.pmInfo}>
              <Image
                src={pm.icon}
                alt={pm.name}
                width={30}
                height={30}
                className={styles.pmIcon}
              />
              <span className={styles.pmName}>{pm.name}</span>
            </div>
          </div>

          <div className={styles.arrowBox}>
            <Image
              src="/Arrow.svg"
              alt="Arrow"
              width={40}
              height={40}
              className={styles.arrow}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;