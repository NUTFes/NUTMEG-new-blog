// /data/members.ts
//毎回書き換えるの大変だからmemberもNotionデータベースから呼び出すのがいいんじゃないか

export type Member = {
  id: string
  name: string
  icon: string // 画像のURLやパス
  grade: string
  projects: string[] // 複数プロジェクト対応
}

export const members: Member[] = [
  {
    id: "sakai",
    name: "酒井和子",
    icon: "/images/members/sakai.png",
    grade: "B4",
    projects: ["teamDesign"]
  },

]