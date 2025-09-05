import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ParamsCtx = { params: Promise<{ slug?: string[] }> };

export async function GET(_req: Request, { params }: ParamsCtx) {
  const { slug } = await params;
  const parts = slug ?? [];
  const rel = parts.join("/");

  const base = path.join(process.cwd(), "app", "wespages");
  const candidates = [
    path.join(base, rel, "index.html"),
    path.join(base, `${rel}.html`),
    path.join(base, "index.html"),
  ];

  for (const p of candidates) {
    try {
      const html = await readFile(p, "utf8");
      return new Response(html, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    } catch {}
  }

  return new Response("Not found", { status: 404 });
}
