// app/projects2/[id]/page.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getProjectProfile, getProjectRecordMap } from "../../lib/project";
import NotionPage from "../../../app/components/NotionPage/notionPage";

interface ProjectPageProps {
  params: { id: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = params;

  const project = await getProjectProfile(id);
  console.log("PM ID:", project.pmId);
  console.log("PM Name:", project.pmName);
  console.log("PM Icon:", project.pmIcon);

  if (!project) {
    return (
      <div className="error-page">
        <h1>プロジェクトが見つかりません</h1>
      </div>
    );
  }

  const recordMap = await getProjectRecordMap(id);

  return (
    <div className="align-left text-left">
      <div className="max-w-[688px] mt-32 mx-auto px-4">

        {/* サムネ */}
        {project.thumbnail && (
          <div className="relative h-64 mb-4">
            <Image
              src={project.thumbnail}
              alt={`${project.name} thumbnail`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

{/* PM情報 */}

<div className="mt-3">
  {project.pmId ? (
    <Link
      href={`/members/${project.pmId}`}
      className="inline-flex items-center gap-2"
    >
      {project.pmIcon && (
        <Image
          src={project.pmIcon}
          alt={`${project.pmName} icon`}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      )}
      <span className="text-gray-700 text-lg">{project.pmName}</span>
    </Link>
  ) : (
    <span className="inline-flex items-center gap-2">
      {project.pmIcon && (
        <Image
          src={project.pmIcon}
          alt={`${project.pmName} icon`}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      )}
      <span className="text-gray-700 text-lg">{project.pmName}</span>
    </span>
  )}
</div>




        {/* 概要 */}
        <p className="mt-4 text-gray-800 leading-relaxed">{project.summary}</p>
      </div>

      {/* Notion本文 */}
      {recordMap && <NotionPage recordMap={recordMap} />}
    </div>
  );
}
