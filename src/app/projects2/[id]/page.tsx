import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getProjectProfile, getProjectRecordMap } from "../../lib/project";
import NotionPage from "../../../app/components/NotionPage/notionPage";
import styles from "./projectDetail.module.css";

interface ProjectPageProps {
  params: { id: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = params;

  const project = await getProjectProfile(id);
  const recordMap = await getProjectRecordMap(id);

  if (!project) {
    return <div>プロジェクトが見つかりません</div>;
  }

  return (
    <div className="align-left text-left">
      <div className={styles.container}>

        {/* --- サムネイル --- */}
        {project.thumbnail && (
          <div className={styles.thumbnailWrapper}>
            <Image
              src={project.thumbnail}
              alt={`${project.name} thumbnail`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        {/* --- PM情報 --- */}
        <div className={styles.pmRow}>
          <span className={styles.pmLabel}>PM:</span>

          {project.pmId ? (
            <Link href={`/members/${project.pmId}`} className={`${styles.pmLink} group`}>
              {project.pmIcon && (
                <Image
                  src={project.pmIcon}
                  alt={`${project.pmName} icon`}
                  width={40}
                  height={40}
                  className={`${styles.pmIcon} transition-transform group-hover:scale-105`}
                />
              )}
              <span className={styles.pmName}>{project.pmName}</span>
            </Link>
          ) : (
            <div className={styles.pmLink}>
              {project.pmIcon && (
                <Image
                  src={project.pmIcon}
                  alt={`${project.pmName} icon`}
                  width={40}
                  height={40}
                  className={styles.pmIcon}
                />
              )}
              <span className={styles.pmName}>{project.pmName}</span>
            </div>
          )}
        </div>
      </div>

      {/* --- Notion本文 --- */}
      <div className={styles.notionWrapper}>
        {recordMap && <NotionPage recordMap={recordMap} />}
      </div>
    </div>
  );
}
