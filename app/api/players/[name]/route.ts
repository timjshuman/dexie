import { NextResponse } from "next/server";
import { getPlayerProgress, savePlayerProgress, type StoredGift } from "@/lib/playerDatabase";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    name: string;
  }>;
};

function parseGiftList(value: unknown, fallback: StoredGift[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value.filter(
    (gift): gift is StoredGift =>
      typeof gift === "object" &&
      gift !== null &&
      "name" in gift &&
      "emoji" in gift &&
      typeof gift.name === "string" &&
      typeof gift.emoji === "string",
  );
}

export async function GET(_request: Request, context: RouteContext) {
  const { name } = await context.params;
  const player = getPlayerProgress(decodeURIComponent(name));

  if (!player) {
    return NextResponse.json({ error: "Player does not exist." }, { status: 404 });
  }

  return NextResponse.json({ player });
}

export async function PUT(request: Request, context: RouteContext) {
  const { name } = await context.params;
  const existingPlayer = getPlayerProgress(decodeURIComponent(name));

  if (!existingPlayer) {
    return NextResponse.json({ error: "Player does not exist." }, { status: 404 });
  }

  const body = (await request.json().catch(() => null)) as {
    level?: unknown;
    score?: unknown;
    earnedGifts?: unknown;
  } | null;

  const savedPlayer = savePlayerProgress(existingPlayer.name, {
    level: typeof body?.level === "number" ? body.level : existingPlayer.level,
    score: typeof body?.score === "number" ? body.score : existingPlayer.score,
    earnedGifts: parseGiftList(body?.earnedGifts, existingPlayer.earnedGifts),
  });

  return NextResponse.json({ player: savedPlayer });
}
