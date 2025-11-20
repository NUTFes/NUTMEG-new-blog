import Link from "next/link";
import Image from "next/image";
import styles from "./ProjectCard.module.css";

type ProjectProps = {
  logo?: string;
  name: string; // ロゴがない場合は名前を表示
  summary: string;
  pm: {
    name: string;
    icon?: string;
  };
  href: string;
};

const ProjectCard: React.FC<ProjectProps> = ({ logo, name, summary, pm, href }) => {
  return (
    <Link href={href} className={styles.card}>
      <div className={styles.cardPadding}>
        {/* ロゴ or 名前表示 */}
        <div className={styles.cardTitle}>
          {logo ? (
            <Image
              src={logo}
              alt="Project Logo"
              fill
              className={styles.logoImage}
            />
          ) : (
            <span className={styles.cardTitleFallback}>{name}</span>
          )}
        </div>

        {/* 概要 */}
        <p className={styles.cardAbstract}>{summary}</p>

        {/* PM情報 */}
        <div className={styles.pmInline}>
          {pm.icon && (
            <Image
              src={pm.icon}
              alt={pm.name}
              width={40} // サイズ指定
              height={40}
              className={styles.pmIcon}
            />
          )}
          <span className={styles.pmName}>{pm.name}</span>
        </div>

        {/* 矢印アイコン */}
        <div className={styles.arrowBox}>
          <Image
            src="/ArrowOrange.svg"
            alt="Arrow"
            width={40}
            height={40}
            className={styles.arrow}
          />
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
