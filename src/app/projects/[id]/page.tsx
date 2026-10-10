import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { ExtendedRecordMap } from "notion-types";
import { getProjectProfile, getProjectRecordMap } from "../../lib/project";
import NotionPage from "../../components/NotionPage/notionPage";
import styles from "./projectDetail.module.css";
import BackButtonClient from './BackButtonClient';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export const runtime = "edge";

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  const project = await getProjectProfile(id);

  if (!project) {
    return <div>プロジェクトが見つかりません</div>;
  }

  // 本文の取得に失敗してもページ全体を落とさず、プロフィール部分は表示する
  let recordMap: ExtendedRecordMap | null = null;
  try {
    recordMap = await getProjectRecordMap(id);
  } catch (error) {
    console.error("Failed to fetch project page:", error);
  }

  return (
    <div className="align-left text-left">
      <div className={`${styles.container} space-y-6`}>

        {/* --- 上の戻るボタン --- */}
        <div className="mt-4">
          <BackButtonClient />
        </div>

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
        <div className="mb-32 space-y-6">

        {recordMap ? (
          <NotionPage recordMap={recordMap} />
        ) : (
          <p className="max-w-[688px] mx-auto px-4 text-gray-600 dark:text-gray-300">
            本文の読み込みに失敗しました。しばらく時間をおいてから再度お試しください。
          </p>
        )}

        {/* --- 下の戻るボタン --- */}

        <div className="mt-4 max-w-[688px] mx-auto px-4">
        <BackButtonClient />
        </div>

        </div>

    </div>
  );
}
