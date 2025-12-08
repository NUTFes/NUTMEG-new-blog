import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get("url");

  if (!target) {
    return NextResponse.json({ error: "No URL provided" });
  }

  const res = await fetch(target);
  const html = await res.text();
  const $ = cheerio.load(html);

  const ogImage = $('meta[property="og:image"]').attr("content");

  return NextResponse.json({
    ogImage: ogImage || null,
  });
}
