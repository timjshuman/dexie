import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import Database, { type Database as DatabaseType } from "better-sqlite3";

export type StoredGift = {
  name: string;
  emoji: string;
};

export type StoredPlayerProgress = {
  name: string;
  level: number;
  score: number;
  earnedGifts: StoredGift[];
};

type PlayerRow = {
  name: string;
  level: number;
  score: number;
  earned_gifts: string;
};

const DATABASE_PATH = join(process.cwd(), "data", "players.sqlite");
let database: DatabaseType | null = null;

export function normalizeStoredPlayerName(name: string) {
  return name.trim().replace(/\s+/g, " ");
}

function getDatabase() {
  if (!database) {
    mkdirSync(dirname(DATABASE_PATH), { recursive: true });
    database = new Database(DATABASE_PATH);
    database.exec(`
      CREATE TABLE IF NOT EXISTS players (
        name TEXT PRIMARY KEY COLLATE NOCASE,
        level INTEGER NOT NULL DEFAULT 1,
        score INTEGER NOT NULL DEFAULT 0,
        earned_gifts TEXT NOT NULL DEFAULT '[]',
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  return database;
}

function parseGifts(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as StoredGift[]) : [];
  } catch {
    return [];
  }
}

function rowToProgress(row: PlayerRow): StoredPlayerProgress {
  return {
    name: row.name,
    level: row.level,
    score: row.score,
    earnedGifts: parseGifts(row.earned_gifts),
  };
}

export function getPlayerProgress(name: string) {
  const normalizedName = normalizeStoredPlayerName(name);

  if (!normalizedName) {
    return null;
  }

  const row = getDatabase()
    .prepare("SELECT name, level, score, earned_gifts FROM players WHERE name = ? COLLATE NOCASE")
    .get(normalizedName) as PlayerRow | undefined;

  return row ? rowToProgress(row) : null;
}

export function createPlayerProgress(name: string) {
  const normalizedName = normalizeStoredPlayerName(name);

  if (!normalizedName || getPlayerProgress(normalizedName)) {
    return null;
  }

  try {
    getDatabase()
      .prepare(
        "INSERT INTO players (name, level, score, earned_gifts, updated_at) VALUES (?, 1, 0, '[]', CURRENT_TIMESTAMP)",
      )
      .run(normalizedName);
  } catch {
    return null;
  }

  return getPlayerProgress(normalizedName);
}

export function savePlayerProgress(name: string, progress: Omit<StoredPlayerProgress, "name">) {
  const normalizedName = normalizeStoredPlayerName(name);

  if (!normalizedName) {
    return null;
  }

  const result = getDatabase()
    .prepare(
      `
      UPDATE players
      SET level = ?, score = ?, earned_gifts = ?, updated_at = CURRENT_TIMESTAMP
      WHERE name = ? COLLATE NOCASE
    `,
    )
    .run(
      Math.max(1, progress.level),
      Math.max(0, progress.score),
      JSON.stringify(progress.earnedGifts),
      normalizedName,
    );

  if (result.changes === 0) {
    return null;
  }

  return getPlayerProgress(normalizedName);
}
