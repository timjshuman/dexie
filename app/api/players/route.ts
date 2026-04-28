import { NextResponse } from "next/server";
import { createPlayerProgress, normalizeStoredPlayerName } from "@/lib/playerDatabase";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { name?: unknown } | null;
  const name = typeof body?.name === "string" ? normalizeStoredPlayerName(body.name) : "";

  if (!name) {
    return NextResponse.json({ error: "Player name is required." }, { status: 400 });
  }

  const player = createPlayerProgress(name);

  if (!player) {
    return NextResponse.json({ error: `Player "${name}" already exists.` }, { status: 409 });
  }

  return NextResponse.json({ player }, { status: 201 });
}
