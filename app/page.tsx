"use client";

import Image from "next/image";
import { type CSSProperties, type FormEvent, useEffect, useMemo, useState } from "react";

type Challenge = {
  word: string;
  clue: string;
  emoji: string;
  prompt: string;
  missingIndex: number;
  choices: string[];
};

type Gift = {
  name: string;
  emoji: string;
};

type PlayerProgress = {
  level: number;
  score: number;
  earnedGifts: Gift[];
};

const CHALLENGE_COUNT = 10;
const MAX_LEVEL = 10;
const PLAYER_PROGRESS_KEY = "princess-word-quest-players";

const gifts: Gift[] = [
  { name: "crown", emoji: "👑" },
  { name: "dress", emoji: "👗" },
  { name: "ring", emoji: "💍" },
  { name: "bracelet", emoji: "📿" },
];

const baseChallengeBank: Challenge[] = [
  {
    word: "crown",
    clue: "A princess wears it on her head.",
    emoji: "👑",
    prompt: "Pick the missing sound in c r _ w n.",
    missingIndex: 2,
    choices: ["o", "a", "u"],
  },
  {
    word: "castle",
    clue: "A tall home with towers and flags.",
    emoji: "🏰",
    prompt: "Pick the missing sound in c a s _ l e.",
    missingIndex: 3,
    choices: ["t", "d", "p"],
  },
  {
    word: "magic",
    clue: "A sparkle spell from a fairy wand.",
    emoji: "✨",
    prompt: "Pick the missing sound in m a _ i c.",
    missingIndex: 2,
    choices: ["g", "j", "k"],
  },
  {
    word: "unicorn",
    clue: "A gentle horse with one shining horn.",
    emoji: "🦄",
    prompt: "Pick the missing sound in u n i _ o r n.",
    missingIndex: 3,
    choices: ["c", "k", "s"],
  },
  {
    word: "garden",
    clue: "A flowery place outside the palace.",
    emoji: "🌷",
    prompt: "Pick the missing sound in g a r _ e n.",
    missingIndex: 3,
    choices: ["d", "b", "p"],
  },
  {
    word: "dragon",
    clue: "A friendly fire-breather who guards treasure.",
    emoji: "🐉",
    prompt: "Pick the missing sound in d r a _ o n.",
    missingIndex: 3,
    choices: ["g", "j", "q"],
  },
  {
    word: "fairy",
    clue: "A tiny helper with wings and a wand.",
    emoji: "🧚",
    prompt: "Pick the missing sound in f a i _ y.",
    missingIndex: 3,
    choices: ["r", "l", "n"],
  },
  {
    word: "jewel",
    clue: "A shiny gem in the royal treasure box.",
    emoji: "💎",
    prompt: "Pick the missing sound in j e _ e l.",
    missingIndex: 2,
    choices: ["w", "v", "y"],
  },
  {
    word: "royal",
    clue: "A word for kings, queens, and princesses.",
    emoji: "🛡️",
    prompt: "Pick the missing sound in r o _ a l.",
    missingIndex: 2,
    choices: ["y", "i", "e"],
  },
  {
    word: "sparkle",
    clue: "A bright twinkle from unicorn magic.",
    emoji: "🌟",
    prompt: "Pick the missing sound in s p a r _ l e.",
    missingIndex: 4,
    choices: ["k", "c", "g"],
  },
  {
    word: "palace",
    clue: "A grand royal home with beautiful rooms.",
    emoji: "🏯",
    prompt: "Pick the missing sound in p a l a _ e.",
    missingIndex: 4,
    choices: ["c", "s", "z"],
  },
  {
    word: "ribbon",
    clue: "A pretty bow for a princess braid.",
    emoji: "🎀",
    prompt: "Pick the missing sound in r i _ b o n.",
    missingIndex: 2,
    choices: ["b", "p", "d"],
  },
  {
    word: "flower",
    clue: "A colorful bloom in the royal garden.",
    emoji: "🌸",
    prompt: "Pick the missing sound in f l o _ e r.",
    missingIndex: 3,
    choices: ["w", "v", "r"],
  },
  {
    word: "bridge",
    clue: "A path over the sparkling castle river.",
    emoji: "🌉",
    prompt: "Pick the missing sound in b r i _ g e.",
    missingIndex: 3,
    choices: ["d", "t", "b"],
  },
  {
    word: "mirror",
    clue: "A shiny glass that shows a princess smile.",
    emoji: "🪞",
    prompt: "Pick the missing sound in m i _ r o r.",
    missingIndex: 2,
    choices: ["r", "l", "n"],
  },
  {
    word: "velvet",
    clue: "A soft royal fabric for a cape.",
    emoji: "🧵",
    prompt: "Pick the missing sound in v e l _ e t.",
    missingIndex: 3,
    choices: ["v", "f", "b"],
  },
  {
    word: "forest",
    clue: "A leafy place where unicorns wander.",
    emoji: "🌲",
    prompt: "Pick the missing sound in f o r _ s t.",
    missingIndex: 3,
    choices: ["e", "a", "i"],
  },
  {
    word: "golden",
    clue: "A bright color for crowns and treasure.",
    emoji: "🪙",
    prompt: "Pick the missing sound in g o l _ e n.",
    missingIndex: 3,
    choices: ["d", "t", "b"],
  },
  {
    word: "rainbow",
    clue: "A colorful arc above the unicorn meadow.",
    emoji: "🌈",
    prompt: "Pick the missing sound in r a i n _ o w.",
    missingIndex: 4,
    choices: ["b", "p", "d"],
  },
  {
    word: "princess",
    clue: "A kind royal friend in the castle.",
    emoji: "👸",
    prompt: "Pick the missing sound in p r i n _ e s s.",
    missingIndex: 4,
    choices: ["c", "s", "z"],
  },
  {
    word: "wand",
    clue: "A magic stick used for gentle spells.",
    emoji: "🪄",
    prompt: "Pick the missing sound in w a _ d.",
    missingIndex: 2,
    choices: ["n", "m", "r"],
  },
  {
    word: "tiara",
    clue: "A sparkling crown for a princess.",
    emoji: "👑",
    prompt: "Pick the missing sound in t i _ r a.",
    missingIndex: 2,
    choices: ["a", "e", "o"],
  },
  {
    word: "gown",
    clue: "A fancy dress for a royal ball.",
    emoji: "👗",
    prompt: "Pick the missing sound in g o _ n.",
    missingIndex: 2,
    choices: ["w", "v", "u"],
  },
  {
    word: "carriage",
    clue: "A royal ride pulled by horses.",
    emoji: "🎠",
    prompt: "Pick the missing sound in c a r r _ a g e.",
    missingIndex: 4,
    choices: ["i", "e", "y"],
  },
  {
    word: "meadow",
    clue: "A grassy field where unicorns play.",
    emoji: "🌼",
    prompt: "Pick the missing sound in m e a _ o w.",
    missingIndex: 3,
    choices: ["d", "t", "b"],
  },
  {
    word: "potion",
    clue: "A bubbly drink made by a kind wizard.",
    emoji: "🧪",
    prompt: "Pick the missing sound in p o _ i o n.",
    missingIndex: 2,
    choices: ["t", "d", "p"],
  },
  {
    word: "crystal",
    clue: "A shiny stone that glows with magic.",
    emoji: "🔮",
    prompt: "Pick the missing sound in c r y s _ a l.",
    missingIndex: 4,
    choices: ["t", "d", "p"],
  },
  {
    word: "lantern",
    clue: "A small light for a moonlit castle path.",
    emoji: "🏮",
    prompt: "Pick the missing sound in l a n _ e r n.",
    missingIndex: 3,
    choices: ["t", "d", "p"],
  },
  {
    word: "swan",
    clue: "A graceful bird on the palace pond.",
    emoji: "🦢",
    prompt: "Pick the missing sound in s _ a n.",
    missingIndex: 1,
    choices: ["w", "v", "u"],
  },
  {
    word: "pearl",
    clue: "A smooth treasure from a seashell.",
    emoji: "🦪",
    prompt: "Pick the missing sound in p e _ r l.",
    missingIndex: 2,
    choices: ["a", "o", "u"],
  },
  {
    word: "throne",
    clue: "A special chair for a queen or king.",
    emoji: "🪑",
    prompt: "Pick the missing sound in t h r _ n e.",
    missingIndex: 3,
    choices: ["o", "a", "e"],
  },
  {
    word: "blossom",
    clue: "A flower opening in the royal garden.",
    emoji: "🌺",
    prompt: "Pick the missing sound in b l o _ s o m.",
    missingIndex: 3,
    choices: ["s", "z", "c"],
  },
  {
    word: "star",
    clue: "A bright light in the night sky.",
    emoji: "⭐",
    prompt: "Pick the missing sound in s t _ r.",
    missingIndex: 2,
    choices: ["a", "e", "o"],
  },
  {
    word: "wish",
    clue: "A dream whispered to a wishing star.",
    emoji: "💫",
    prompt: "Pick the missing sound in w i _ h.",
    missingIndex: 2,
    choices: ["s", "z", "c"],
  },
  {
    word: "queen",
    clue: "A royal leader who wears a crown.",
    emoji: "👸",
    prompt: "Pick the missing sound in q u _ e n.",
    missingIndex: 2,
    choices: ["e", "a", "i"],
  },
  {
    word: "king",
    clue: "A royal leader in the castle.",
    emoji: "🤴",
    prompt: "Pick the missing sound in k i _ g.",
    missingIndex: 2,
    choices: ["n", "m", "r"],
  },
  {
    word: "pony",
    clue: "A small horse that trots near the castle.",
    emoji: "🐴",
    prompt: "Pick the missing sound in p o _ y.",
    missingIndex: 2,
    choices: ["n", "m", "r"],
  },
  {
    word: "spell",
    clue: "Magic words spoken by a fairy.",
    emoji: "✨",
    prompt: "Pick the missing sound in s p _ l l.",
    missingIndex: 2,
    choices: ["e", "a", "i"],
  },
  {
    word: "gem",
    clue: "A tiny jewel in the treasure chest.",
    emoji: "💎",
    prompt: "Pick the missing sound in g _ m.",
    missingIndex: 1,
    choices: ["e", "a", "i"],
  },
  {
    word: "harp",
    clue: "A pretty instrument for royal music.",
    emoji: "🎵",
    prompt: "Pick the missing sound in h a _ p.",
    missingIndex: 2,
    choices: ["r", "l", "n"],
  },
];

type ChallengeSeed = {
  word: string;
  clue: string;
  emoji: string;
  missingIndex?: number;
  choices?: string[];
};

const letterChoiceGroups: Record<string, string[]> = {
  a: ["a", "e", "o"],
  b: ["b", "d", "p"],
  c: ["c", "k", "s"],
  d: ["d", "b", "t"],
  e: ["e", "a", "i"],
  f: ["f", "v", "p"],
  g: ["g", "j", "k"],
  h: ["h", "n", "r"],
  i: ["i", "e", "y"],
  j: ["j", "g", "y"],
  k: ["k", "c", "g"],
  l: ["l", "r", "i"],
  m: ["m", "n", "w"],
  n: ["n", "m", "r"],
  o: ["o", "a", "u"],
  p: ["p", "b", "q"],
  q: ["q", "p", "g"],
  r: ["r", "l", "n"],
  s: ["s", "z", "c"],
  t: ["t", "d", "p"],
  u: ["u", "o", "a"],
  v: ["v", "f", "w"],
  w: ["w", "v", "u"],
  x: ["x", "s", "z"],
  y: ["y", "i", "e"],
  z: ["z", "s", "c"],
};

function getMissingIndex(word: string) {
  const middle = Math.floor(word.length / 2);
  const candidateIndexes = Array.from({ length: word.length }, (_, index) => index)
    .filter((index) => index > 0 && index < word.length - 1)
    .sort((left, right) => Math.abs(left - middle) - Math.abs(right - middle));

  return candidateIndexes[0] ?? 0;
}

function getChoices(correctLetter: string) {
  const choices = letterChoiceGroups[correctLetter] ?? [correctLetter, "a", "e"];
  return choices.includes(correctLetter) ? choices : [correctLetter, ...choices].slice(0, 3);
}

function makePrompt(word: string, missingIndex: number) {
  return `Pick the missing sound in ${word
    .split("")
    .map((letter, index) => (index === missingIndex ? "_" : letter))
    .join(" ")}.`;
}

function makeChallenge(seed: ChallengeSeed): Challenge {
  const missingIndex = seed.missingIndex ?? getMissingIndex(seed.word);

  return {
    word: seed.word,
    clue: seed.clue,
    emoji: seed.emoji,
    prompt: makePrompt(seed.word, missingIndex),
    missingIndex,
    choices: seed.choices ?? getChoices(seed.word[missingIndex]),
  };
}

const additionalChallengeSeeds: ChallengeSeed[] = [
  { word: "apple", clue: "A sweet snack packed for a royal picnic.", emoji: "🍎" },
  { word: "arrow", clue: "A pointed tool carried by a brave castle guard.", emoji: "🏹" },
  { word: "baker", clue: "A helper who makes cakes for the royal feast.", emoji: "🧁" },
  { word: "basket", clue: "A woven holder for garden flowers.", emoji: "🧺" },
  { word: "beacon", clue: "A bright signal on the castle tower.", emoji: "🕯️" },
  { word: "berry", clue: "A tiny fruit found near the unicorn meadow.", emoji: "🫐" },
  { word: "blanket", clue: "A soft cover for a cozy palace nap.", emoji: "🛏️" },
  { word: "bubble", clue: "A floating pop from a magic potion.", emoji: "🫧" },
  { word: "bunny", clue: "A small friend hopping through the garden.", emoji: "🐰" },
  { word: "button", clue: "A tiny fastener on a princess coat.", emoji: "🔘" },
  { word: "candle", clue: "A warm light for a castle room.", emoji: "🕯️" },
  { word: "canyon", clue: "A deep valley beyond the royal hills.", emoji: "⛰️" },
  { word: "carrot", clue: "A crunchy treat for a castle pony.", emoji: "🥕" },
  { word: "cedar", clue: "A tall tree near the forest path.", emoji: "🌲" },
  { word: "charm", clue: "A little magic gift on a bracelet.", emoji: "📿" },
  { word: "cheer", clue: "A happy shout at the royal parade.", emoji: "📣" },
  { word: "cherry", clue: "A red fruit on the royal dessert table.", emoji: "🍒" },
  { word: "cloak", clue: "A warm cape for a moonlit quest.", emoji: "🧥" },
  { word: "cloud", clue: "A fluffy shape above the palace.", emoji: "☁️" },
  { word: "cookie", clue: "A sweet treat from the castle kitchen.", emoji: "🍪" },
  { word: "copper", clue: "A shiny metal coin in the treasure room.", emoji: "🪙" },
  { word: "coral", clue: "A pink treasure from the mermaid lagoon.", emoji: "🪸" },
  { word: "cupcake", clue: "A tiny cake with royal frosting.", emoji: "🧁" },
  { word: "curtain", clue: "A fabric cover on a palace window.", emoji: "🪟" },
  { word: "daisy", clue: "A sunny flower in the princess garden.", emoji: "🌼" },
  { word: "dancer", clue: "A graceful performer at the royal ball.", emoji: "💃" },
  { word: "delight", clue: "A happy feeling after solving a word.", emoji: "😊" },
  { word: "diamond", clue: "A sparkling jewel in the crown.", emoji: "💎" },
  { word: "dolphin", clue: "A friendly swimmer near the island castle.", emoji: "🐬" },
  { word: "dream", clue: "A sleepy story about unicorns.", emoji: "💭" },
  { word: "dress", clue: "A pretty outfit for the palace party.", emoji: "👗" },
  { word: "drum", clue: "A loud instrument in the royal parade.", emoji: "🥁" },
  { word: "eagle", clue: "A strong bird flying above the castle.", emoji: "🦅" },
  { word: "emerald", clue: "A green gem in the treasure chest.", emoji: "💚" },
  { word: "feather", clue: "A soft piece from a royal swan.", emoji: "🪶" },
  { word: "festival", clue: "A joyful party in Princess Land.", emoji: "🎪" },
  { word: "flame", clue: "A warm glow from the dragon friend.", emoji: "🔥" },
  { word: "flute", clue: "A sweet instrument for fairy music.", emoji: "🎶" },
  { word: "fountain", clue: "A splashy water feature in the palace garden.", emoji: "⛲" },
  { word: "friend", clue: "A kind helper on the spelling quest.", emoji: "🤝" },
  { word: "garland", clue: "A chain of flowers for the castle gate.", emoji: "🌺" },
  { word: "gentle", clue: "Soft and kind like the unicorn.", emoji: "🤍" },
  { word: "gift", clue: "A wrapped surprise for the princess.", emoji: "🎁" },
  { word: "glitter", clue: "Tiny sparkles on a magic path.", emoji: "✨" },
  { word: "glove", clue: "A hand cover for a royal outfit.", emoji: "🧤" },
  { word: "goblet", clue: "A fancy cup for the royal feast.", emoji: "🏆" },
  { word: "grape", clue: "A purple fruit in the palace kitchen.", emoji: "🍇" },
  { word: "guitar", clue: "A string instrument for meadow music.", emoji: "🎸" },
  { word: "halo", clue: "A bright ring of light around a star.", emoji: "🌟" },
  { word: "happy", clue: "How the princess feels when words are solved.", emoji: "😊" },
  { word: "hazel", clue: "A warm brown color in the forest.", emoji: "🌰" },
  { word: "helmet", clue: "A guard wears it to protect their head.", emoji: "🪖" },
  { word: "honey", clue: "A sweet treat from friendly bees.", emoji: "🍯" },
  { word: "island", clue: "A little land across the sparkling water.", emoji: "🏝️" },
  { word: "jacket", clue: "A warm coat for a chilly castle walk.", emoji: "🧥" },
  { word: "jester", clue: "A funny friend who makes the queen laugh.", emoji: "🃏" },
  { word: "jingle", clue: "A tiny bell sound on a magic sleigh.", emoji: "🔔" },
  { word: "journey", clue: "A trip across Princess Land.", emoji: "🗺️" },
  { word: "keeper", clue: "A helper who watches the castle keys.", emoji: "🗝️" },
  { word: "kitten", clue: "A tiny cat sleeping near the throne.", emoji: "🐱" },
  { word: "ladder", clue: "A tool for climbing to the tower window.", emoji: "🪜" },
  { word: "lagoon", clue: "A blue pool near the mermaid rocks.", emoji: "🌊" },
  { word: "lily", clue: "A soft flower by the palace pond.", emoji: "🪷" },
  { word: "locket", clue: "A tiny necklace holding a picture.", emoji: "💝" },
  { word: "lucky", clue: "Feeling good fortune on a quest.", emoji: "🍀" },
  { word: "lunar", clue: "Something glowing like the moon.", emoji: "🌙" },
  { word: "marble", clue: "A smooth stone in the palace floor.", emoji: "⚪" },
  { word: "melody", clue: "A pretty tune from the fairy band.", emoji: "🎵" },
  { word: "mermaid", clue: "A magical friend in the ocean kingdom.", emoji: "🧜‍♀️" },
  { word: "moon", clue: "A bright night light over the castle.", emoji: "🌙" },
  { word: "muffin", clue: "A small cake from the royal kitchen.", emoji: "🧁" },
  { word: "mystic", clue: "Something full of secret magic.", emoji: "🔮" },
  { word: "necklace", clue: "A shiny chain worn at the royal ball.", emoji: "📿" },
  { word: "noodle", clue: "A silly curly food for a feast.", emoji: "🍜" },
  { word: "opal", clue: "A glowing gem with rainbow colors.", emoji: "💎" },
  { word: "orchard", clue: "A place where fruit trees grow.", emoji: "🍏" },
  { word: "otter", clue: "A playful swimmer in the castle river.", emoji: "🦦" },
  { word: "parade", clue: "A happy march through the kingdom.", emoji: "🎉" },
  { word: "petal", clue: "One soft piece of a flower.", emoji: "🌸" },
  { word: "pillow", clue: "A soft cushion for sleepy princess dreams.", emoji: "🛌" },
  { word: "pirate", clue: "A treasure hunter sailing near the castle.", emoji: "🏴‍☠️" },
  { word: "planet", clue: "A round world in the starry sky.", emoji: "🪐" },
  { word: "plume", clue: "A fancy feather on a royal hat.", emoji: "🪶" },
  { word: "pocket", clue: "A small pouch in a dress or coat.", emoji: "👝" },
  { word: "puppy", clue: "A playful dog in the palace yard.", emoji: "🐶" },
  { word: "puzzle", clue: "A game with pieces to solve.", emoji: "🧩" },
  { word: "quartz", clue: "A clear crystal from the magic cave.", emoji: "💎" },
  { word: "quill", clue: "A feather pen for writing royal letters.", emoji: "🪶" },
  { word: "rabbit", clue: "A fast hopper in the garden.", emoji: "🐇" },
  { word: "ranger", clue: "A forest helper who knows every trail.", emoji: "🧭" },
  { word: "river", clue: "Water flowing past the castle bridge.", emoji: "🏞️" },
  { word: "rocket", clue: "A speedy ship flying past the stars.", emoji: "🚀" },
  { word: "rose", clue: "A lovely flower near the palace gate.", emoji: "🌹" },
  { word: "ruby", clue: "A red gem in the princess necklace.", emoji: "❤️" },
  { word: "saddle", clue: "A seat for riding a pony.", emoji: "🐎" },
  { word: "sailor", clue: "A boat helper on the royal lake.", emoji: "⛵" },
  { word: "sapphire", clue: "A blue jewel in the crown.", emoji: "💙" },
  { word: "scarf", clue: "A warm wrap for a breezy castle day.", emoji: "🧣" },
  { word: "secret", clue: "A hidden thing whispered by fairies.", emoji: "🤫" },
  { word: "shadow", clue: "A dark shape made by castle lights.", emoji: "🌗" },
  { word: "shell", clue: "A beach treasure from the mermaid shore.", emoji: "🐚" },
  { word: "shield", clue: "A strong guard carried by a brave knight.", emoji: "🛡️" },
  { word: "silver", clue: "A shiny color for moonlit treasure.", emoji: "🥈" },
  { word: "singer", clue: "A performer with a lovely voice.", emoji: "🎤" },
  { word: "slipper", clue: "A fancy shoe for the royal dance.", emoji: "🥿" },
  { word: "snowflake", clue: "A tiny frozen sparkle from the sky.", emoji: "❄️" },
  { word: "song", clue: "Music sung by palace friends.", emoji: "🎶" },
  { word: "spider", clue: "A tiny web maker in the tower.", emoji: "🕷️" },
  { word: "splash", clue: "Water jumping from the fountain.", emoji: "💦" },
  { word: "spring", clue: "A season when flowers wake up.", emoji: "🌱" },
  { word: "starlight", clue: "Glow from stars above the castle.", emoji: "🌟" },
  { word: "story", clue: "A tale about princesses and unicorns.", emoji: "📖" },
  { word: "summer", clue: "A warm sunny season in the kingdom.", emoji: "☀️" },
  { word: "sunbeam", clue: "A line of light through a castle window.", emoji: "🌞" },
  { word: "sunset", clue: "The colorful sky at the end of the day.", emoji: "🌅" },
  { word: "sword", clue: "A brave knight carries it carefully.", emoji: "🗡️" },
  { word: "tassel", clue: "A dangling decoration on a royal pillow.", emoji: "🎗️" },
  { word: "temple", clue: "A quiet old building in the hills.", emoji: "🏛️" },
  { word: "thistle", clue: "A prickly purple flower near the path.", emoji: "🌿" },
  { word: "ticket", clue: "A pass to the royal show.", emoji: "🎟️" },
  { word: "tower", clue: "A tall part of the castle.", emoji: "🗼" },
  { word: "treasure", clue: "Gold and jewels hidden in a chest.", emoji: "💰" },
  { word: "tulip", clue: "A bright flower in the garden.", emoji: "🌷" },
  { word: "turtle", clue: "A slow friend by the castle pond.", emoji: "🐢" },
  { word: "violet", clue: "A purple flower in Princess Land.", emoji: "🪻" },
  { word: "whisper", clue: "A very quiet fairy voice.", emoji: "🤫" },
  { word: "willow", clue: "A tree with long bending branches.", emoji: "🌳" },
  { word: "window", clue: "An opening that lets castle light inside.", emoji: "🪟" },
  { word: "wizard", clue: "A magic helper with a tall hat.", emoji: "🧙" },
  { word: "wonder", clue: "A feeling of happy surprise.", emoji: "🤩" },
  { word: "zebra", clue: "A striped animal visiting the royal zoo.", emoji: "🦓" },
  { word: "acorn", clue: "A tiny nut under the forest tree.", emoji: "🌰" },
  { word: "anchor", clue: "A heavy tool for a royal boat.", emoji: "⚓" },
  { word: "apron", clue: "A cloth worn by the castle baker.", emoji: "🥣" },
  { word: "artist", clue: "A painter making royal portraits.", emoji: "🎨" },
  { word: "autumn", clue: "A season with golden leaves.", emoji: "🍂" },
  { word: "badger", clue: "A forest animal near the meadow.", emoji: "🦡" },
  { word: "banner", clue: "A flag hanging over the castle gate.", emoji: "🚩" },
  { word: "beetle", clue: "A tiny bug on a garden leaf.", emoji: "🐞" },
  { word: "breeze", clue: "A soft wind through the palace curtains.", emoji: "🍃" },
  { word: "brilliant", clue: "Very bright like a magic jewel.", emoji: "💡" },
  { word: "brook", clue: "A tiny stream in the forest.", emoji: "🏞️" },
  { word: "butterfly", clue: "A colorful flyer in the garden.", emoji: "🦋" },
  { word: "cabbage", clue: "A leafy food in the royal kitchen.", emoji: "🥬" },
  { word: "cactus", clue: "A prickly plant from the sunny desert.", emoji: "🌵" },
  { word: "camera", clue: "A tool for taking royal pictures.", emoji: "📷" },
  { word: "captain", clue: "A leader of the royal ship.", emoji: "🧑‍✈️" },
  { word: "cavern", clue: "A dark cave with glowing crystals.", emoji: "🕳️" },
  { word: "celery", clue: "A crunchy green snack for a picnic.", emoji: "🥬" },
  { word: "circle", clue: "A round shape like a magic ring.", emoji: "⭕" },
  { word: "clover", clue: "A lucky green plant by the path.", emoji: "🍀" },
  { word: "cobweb", clue: "A dusty spider web in the tower.", emoji: "🕸️" },
  { word: "comet", clue: "A bright streak in the night sky.", emoji: "☄️" },
  { word: "compass", clue: "A tool that helps find the path.", emoji: "🧭" },
  { word: "costume", clue: "A dress-up outfit for the royal play.", emoji: "🎭" },
  { word: "crayon", clue: "A colorful stick for drawing castles.", emoji: "🖍️" },
  { word: "cuddle", clue: "A warm hug from a puppy friend.", emoji: "🧸" },
  { word: "dandelion", clue: "A yellow flower in the meadow.", emoji: "🌼" },
  { word: "dazzle", clue: "A bright sparkle that catches the eye.", emoji: "✨" },
  { word: "dessert", clue: "A sweet treat after the royal dinner.", emoji: "🍰" },
];

const challengeBank: Challenge[] = [
  ...baseChallengeBank,
  ...additionalChallengeSeeds.map(makeChallenge),
];

function shuffleLetters(letters: string[]) {
  const shuffled = [...letters];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

function createChallengeSet() {
  const shuffled = [...challengeBank];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled.slice(0, CHALLENGE_COUNT).map((challenge) => ({
    ...challenge,
    choices: shuffleLetters(challenge.choices),
  }));
}

function getRandomGift(earnedGifts: Gift[]) {
  const earnedGiftNames = new Set(earnedGifts.map((gift) => gift.name));
  const availableGifts = gifts.filter((gift) => !earnedGiftNames.has(gift.name));

  if (availableGifts.length === 0) {
    return null;
  }

  return availableGifts[Math.floor(Math.random() * availableGifts.length)];
}

const praise = [
  "Royal reading!",
  "Sparkly spelling!",
  "You helped the unicorn!",
  "Princess power!",
  "Castle champion!",
];

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.82;
  utterance.pitch = 1.05;
  window.speechSynthesis.speak(utterance);
}

function normalizePlayerName(name: string) {
  return name.trim().replace(/\s+/g, " ");
}

function getStoredPlayers() {
  try {
    return JSON.parse(window.localStorage.getItem(PLAYER_PROGRESS_KEY) ?? "{}") as Record<
      string,
      PlayerProgress
    >;
  } catch {
    return {};
  }
}

function getDefaultProgress(): PlayerProgress {
  return {
    level: 1,
    score: 0,
    earnedGifts: [],
  };
}

function getStoredPlayerProgress(playerName: string) {
  const players = getStoredPlayers();
  return players[playerName] ?? null;
}

function playerExists(playerName: string) {
  return Boolean(getStoredPlayerProgress(playerName));
}

function savePlayerProgress(playerName: string, progress: PlayerProgress) {
  const players = getStoredPlayers();
  players[playerName] = progress;
  window.localStorage.setItem(PLAYER_PROGRESS_KEY, JSON.stringify(players));
}

function getPlayerAvatar(playerName: string | null) {
  return normalizePlayerName(playerName ?? "").toLowerCase() === "harrison"
    ? "/harrison.png"
    : "/princess.png";
}

export default function Home() {
  const [challenges, setChallenges] = useState<Challenge[]>(() =>
    challengeBank.slice(0, CHALLENGE_COUNT),
  );
  const [level, setLevel] = useState(1);
  const [completedLevel, setCompletedLevel] = useState<number | null>(null);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showWord, setShowWord] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [successBurst, setSuccessBurst] = useState(0);
  const [earnedGifts, setEarnedGifts] = useState<Gift[]>([]);
  const [awardedGift, setAwardedGift] = useState<Gift | null>(null);
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [loginName, setLoginName] = useState("");
  const [loginError, setLoginError] = useState("");
  const [authMode, setAuthMode] = useState<"login" | "create">("login");
  const [playerLoaded, setPlayerLoaded] = useState(false);

  useEffect(() => {
    const randomizeAfterHydration = window.setTimeout(() => {
      setChallenges(createChallengeSet());
      setPlayerLoaded(true);
    }, 0);

    return () => window.clearTimeout(randomizeAfterHydration);
  }, []);

  useEffect(() => {
    if (!playerLoaded || !playerName) {
      return;
    }

    savePlayerProgress(playerName, {
      level,
      score,
      earnedGifts,
    });
  }, [earnedGifts, level, playerLoaded, playerName, score]);

  const challenge = challenges[challengeIndex];
  const correctLetter = challenge.word[challenge.missingIndex];
  const isCorrect = selectedLetter === correctLetter;
  const isFinalChallenge = challengeIndex === challenges.length - 1;
  const progressPercent = Math.round(
    (challengeIndex / Math.max(challenges.length - 1, 1)) * 100,
  );
  const progressStyle = { "--progress": `${progressPercent}%` } as CSSProperties;

  const displayWord = useMemo(() => {
    return challenge.word
      .split("")
      .map((letter, index) => {
        if (index === challenge.missingIndex && !showWord) {
          return "_";
        }

        return letter;
      })
      .join(" ");
  }, [challenge, showWord]);
  const displayedGifts =
    gameComplete && awardedGift && !earnedGifts.includes(awardedGift)
      ? [...earnedGifts, awardedGift]
      : earnedGifts;
  const playerAvatar = getPlayerAvatar(playerName);

  function chooseLetter(letter: string) {
    if (isCorrect) {
      return;
    }

    setSelectedLetter(letter);

    if (letter === correctLetter) {
      setScore((current) => current + 10);
      setStreak((current) => current + 1);
      setShowWord(true);
      setSuccessBurst((current) => current + 1);
      speak(`${praise[challengeIndex % praise.length]} The word is ${challenge.word}.`);
    } else {
      setStreak(0);
      speak(`Try again. Listen for the sound ${correctLetter}.`);
    }
  }

  function nextChallenge() {
    if (isFinalChallenge) {
      const nextLevel = Math.min(level + 1, MAX_LEVEL);
      const gift = getRandomGift(earnedGifts);

      setCompletedLevel(level);
      setLevel(nextLevel);
      setAwardedGift(gift);
      if (gift) {
        setEarnedGifts((current) => [...current, gift]);
      }
      setGameComplete(true);
      speak(
        gift
          ? nextLevel > level
            ? `Amazing work! You earned a ${gift.name}. Level ${nextLevel} is unlocked.`
            : `Amazing work! You earned a ${gift.name}. You completed the top level.`
          : "Amazing work! You collected every gift.",
      );
      return;
    }

    setChallengeIndex((current) => (current + 1) % challenges.length);
    setSelectedLetter(null);
    setShowWord(false);
  }

  function applyPlayerProgress(name: string, progress: PlayerProgress) {
    setPlayerName(name);
    setLoginName(name);
    setLoginError("");
    setAuthMode("login");
    setLevel(Math.min(Math.max(progress.level ?? 1, 1), MAX_LEVEL));
    setScore(Math.max(progress.score ?? 0, 0));
    setEarnedGifts(
      (progress.earnedGifts ?? []).filter((gift) => gifts.some(({ name }) => name === gift.name)),
    );
    setChallengeIndex(0);
    setSelectedLetter(null);
    setShowWord(false);
    setGameComplete(false);
    setCompletedLevel(null);
    setAwardedGift(null);
    setSuccessBurst(0);
  }

  function loginPlayer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedName = normalizePlayerName(loginName);

    if (!normalizedName) {
      return;
    }

    const progress = getStoredPlayerProgress(normalizedName);

    if (!progress) {
      setLoginError(`Player "${normalizedName}" does not exist. Choose Create Player to make one.`);
      return;
    }

    applyPlayerProgress(normalizedName, progress);
  }

  function createPlayer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedName = normalizePlayerName(loginName);

    if (!normalizedName) {
      return;
    }

    if (playerExists(normalizedName)) {
      setLoginError(`Player "${normalizedName}" already exists. Press Start quest to log in.`);
      return;
    }

    const progress = getDefaultProgress();
    savePlayerProgress(normalizedName, progress);
    applyPlayerProgress(normalizedName, progress);
  }

  function startNextQuest() {
    setChallenges(createChallengeSet());
    setChallengeIndex(0);
    setSelectedLetter(null);
    setShowWord(false);
    setGameComplete(false);
    setCompletedLevel(null);
    setAwardedGift(null);
    setSuccessBurst(0);
  }

  function logOutPlayer() {
    setPlayerName(null);
    setLoginName("");
    setLoginError("");
    setAuthMode("login");
    setLevel(1);
    setCompletedLevel(null);
    setChallengeIndex(0);
    setSelectedLetter(null);
    setScore(0);
    setStreak(0);
    setShowWord(false);
    setGameComplete(false);
    setSuccessBurst(0);
    setEarnedGifts([]);
    setAwardedGift(null);
    setChallenges(createChallengeSet());
  }

  if (!playerLoaded) {
    return (
      <main className="game-shell login-shell">
        <section className="login-card">
          <p className="eyebrow">Princess Land Spelling Quest</p>
          <h1 className="sparkle-title" id="game-title">
            Loading your quest
          </h1>
        </section>
      </main>
    );
  }

  if (!playerName && authMode === "create") {
    return (
      <main className="game-shell login-shell">
        <section className="login-card" aria-labelledby="create-player-title">
          <p className="eyebrow">Create Player</p>
          <h1 className="sparkle-title" id="create-player-title">
            Start a new princess quest
          </h1>
          <p className="intro">Choose a player name to save your stars and gifts on this device.</p>
          <form className="login-form" onSubmit={createPlayer}>
            <label htmlFor="new-player-name">Player name</label>
            <input
              autoComplete="given-name"
              id="new-player-name"
              maxLength={24}
              onChange={(event) => {
                setLoginName(event.target.value);
                setLoginError("");
              }}
              placeholder="Player Name"
              type="text"
              value={loginName}
            />
            {loginError && (
              <p className="login-error" role="alert">
                {loginError}
              </p>
            )}
            <button className="primary-button" disabled={!normalizePlayerName(loginName)} type="submit">
              Create Player
            </button>
            <button
              className="create-player-link"
              onClick={() => {
                setAuthMode("login");
                setLoginError("");
              }}
              type="button"
            >
              Log in
            </button>
          </form>
        </section>
      </main>
    );
  }

  if (!playerName) {
    return (
      <main className="game-shell login-shell">
        <section className="login-card" aria-labelledby="login-title">
          <p className="eyebrow">Player Login</p>
          <h1 className="sparkle-title" id="login-title">
            Save the Unicorn by unlocking castle words
          </h1>
          <p className="intro">Enter your player name to load your saved score and gifts.</p>
          <form className="login-form" onSubmit={loginPlayer}>
            <label htmlFor="player-name">Player name</label>
            <input
              autoComplete="given-name"
              id="player-name"
              maxLength={24}
              onChange={(event) => {
                setLoginName(event.target.value);
                setLoginError("");
              }}
              placeholder="Player Name"
              type="text"
              value={loginName}
            />
            {loginError && (
              <p className="login-error" role="alert">
                {loginError}
              </p>
            )}
            <button className="primary-button" disabled={!normalizePlayerName(loginName)} type="submit">
              Start quest
            </button>
            <button
              className="create-player-link"
              onClick={() => {
                setAuthMode("create");
                setLoginError("");
              }}
              type="button"
            >
              Create Player
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="game-shell">
      <section className="hero-card" aria-labelledby="game-title">
        <div className="sky-decoration" aria-hidden="true">
          <span className="cloud cloud-one" />
          <span className="cloud cloud-two" />
          <span className="sparkle sparkle-one">✦</span>
          <span className="sparkle sparkle-two">✧</span>
        </div>

        <div className="hero-copy">
          <button
            className="reset-link"
            onClick={logOutPlayer}
            type="button"
          >
            Log out
          </button>
          <p className="eyebrow">Everette&apos;s Princess Land Spelling Quest</p>
          <p className="player-badge">
            Player: <strong>{playerName}</strong>
          </p>
          <h1 className="sparkle-title" id="game-title">
            <span aria-hidden="true">✦</span>
            Save the Unicorn by unlocking castle words
            <span aria-hidden="true">✦</span>
          </h1>
          <p className="intro">
            It is up to you {playerName} to help save the Unicorn and unlock the castle words. You can do it!
          </p>
        </div>

        <div className="score-board" aria-label="Game score">
          <div>
            <span>Level</span>
            <strong>{level}</strong>
          </div>
          <div>
            <span>Stars</span>
            <strong>{score}</strong>
          </div>
          <div>
            <span>Streak</span>
            <strong>{streak}</strong>
          </div>
          <div className="gift-score">
            <span>Gifts</span>
            <strong>{displayedGifts.length}</strong>
            <small aria-label="Earned gifts">
              {displayedGifts.length > 0
                ? displayedGifts.map((gift, index) => (
                    <span key={`${gift.name}-${index}`} title={gift.name}>
                      {gift.emoji}
                    </span>
                  ))
                : "None yet"}
            </small>
          </div>
        </div>
      </section>

      {gameComplete ? (
        <section className="celebration-card" aria-labelledby="celebration-title">
          <div className="fireworks" aria-hidden="true">
            <span className="firework firework-one" />
            <span className="firework firework-two" />
            <span className="firework firework-three" />
            <span className="firework firework-four" />
          </div>

          <div className="reunion-scene" aria-hidden="true">
            <span className="reunion-sparkle sparkle-a">✦</span>
            <span className="reunion-sparkle sparkle-b">✧</span>
            <div className="reunion-castle">🏰</div>
            <div className="reunion-characters">
              <span className="reunion-unicorn">🦄</span>
              <span className="reunion-heart">💖</span>
              <Image
                alt={`${playerName} profile`}
                className="reunion-princess-image"
                height={160}
                src={playerAvatar}
                width={160}
              />
            </div>
          </div>

          <div className="celebration-copy">
            <p className="eyebrow">Level {completedLevel ?? level} complete</p>
            <h2 id="celebration-title">The unicorn found the princess!</h2>
            <p>
              You finished all {challenges.length} castle word challenges and
              brought the unicorn safely home.{" "}
              {completedLevel !== null && level > completedLevel
                ? `Level ${level} is now unlocked for this game.`
                : "You reached the highest level for this game."}
            </p>
            {awardedGift && (
              <div className="gift-award" aria-live="polite">
                <span aria-hidden="true">{awardedGift.emoji}</span>
                <strong>You earned a {awardedGift.name}!</strong>
              </div>
            )}
            {!awardedGift && earnedGifts.length === gifts.length && (
              <div className="gift-award" aria-live="polite">
                <span aria-hidden="true">🎁</span>
                <strong>You collected every gift!</strong>
              </div>
            )}
            <div className="gift-inventory" aria-label="Accumulated gifts">
              <span>Your gifts:</span>
              {displayedGifts.length > 0 ? (
                <div className="gift-list">
                  {displayedGifts.map((gift, index) => (
                    <span className="gift-chip" key={`${gift.name}-${index}`}>
                      <span aria-hidden="true">{gift.emoji}</span>
                      {gift.name}
                    </span>
                  ))}
                </div>
              ) : (
                <strong>None yet</strong>
              )}
            </div>
            <button className="primary-button restart-link" onClick={startNextQuest} type="button">
              {completedLevel !== null && level > completedLevel
                ? `Start level ${level}`
                : "Play again"}
            </button>
          </div>
        </section>
      ) : (
        <section className="quest-card" aria-live="polite">
          <div className="scene" aria-hidden="true">
            <div className="castle">
              <div className="castle-wing left-wing">
                <span className="wing-window" />
              </div>
              <div className="castle-wing right-wing">
                <span className="wing-window" />
              </div>
              <div className="tower left-tower">
                <span className="flag" />
                <span className="castle-window" />
                <span className="castle-window lower-window" />
              </div>
              <div className="tower right-tower">
                <span className="flag" />
                <span className="castle-window" />
                <span className="castle-window lower-window" />
              </div>
              <div className="keep">
                <span className="flag center-flag" />
                <span>♕</span>
                <div className="castle-banner left-banner" />
                <div className="castle-banner right-banner" />
                <div className="castle-balcony" />
                <div className="keep-window left-keep-window" />
                <div className="keep-window right-keep-window" />
                <div className="castle-gate" />
              </div>
            </div>
            <Image
              alt={`${playerName} waiting by the castle`}
              className="princess-image"
              height={160}
              priority
              src={playerAvatar}
              width={160}
            />
            <div className="scene-progress-arrow" style={progressStyle}>
              <span className="scene-progress-line">
                <span className="scene-progress-fill" />
                <Image
                  alt={`${playerName} progress marker`}
                  className="scene-progress-marker"
                  height={42}
                  src={playerAvatar}
                  width={42}
                />
              </span>
            </div>
            <div className="unicorn">🦄</div>
          </div>

          <div className="challenge-panel">
            {isCorrect && (
              <div
                className="success-fireworks"
                aria-hidden="true"
                key={`success-fireworks-${successBurst}`}
              >
                <span className="success-firework success-firework-one" />
                <span className="success-firework success-firework-two" />
                <span className="success-firework success-firework-three" />
              </div>
            )}

            <div className="challenge-header">
              <span className="challenge-emoji" aria-hidden="true">
                {challenge.emoji}
              </span>
              <div>
                <p className="challenge-count">
                  Level {level} - Challenge {challengeIndex + 1} of{" "}
                  {challenges.length}
                </p>
                <h2>{challenge.clue}</h2>
              </div>
            </div>

            <div className="quest-progress" style={progressStyle}>
              <div className="progress-label">
                <span>{playerName}&apos;s Journey</span>
                <strong>
                  {challengeIndex + 1}/{challenges.length}
                </strong>
              </div>
              <div
                aria-label={`Challenge progress: ${challengeIndex + 1} of ${challenges.length}`}
                aria-valuemax={challenges.length}
                aria-valuemin={1}
                aria-valuenow={challengeIndex + 1}
                className="progress-track"
                role="progressbar"
              >
                <span className="progress-path">
                  <span className="progress-fill" />
                  <Image
                    alt={`${playerName} progress marker`}
                    className="progress-princess-marker"
                    height={32}
                    src={playerAvatar}
                    width={32}
                  />
                </span>
                <span className="progress-unicorn-start" aria-label="Unicorn">
                  🦄
                </span>
              </div>
            </div>

            <div className="word-display" aria-label={`Word puzzle: ${displayWord}`}>
              {challenge.word.split("").map((letter, index) => {
                const isMissingLetter = index === challenge.missingIndex;
                const shouldHintLetter = showWord && isMissingLetter && !isCorrect;

                return (
                  <span
                    className={`word-letter ${shouldHintLetter ? "needed-letter" : ""}`}
                    key={`${challenge.word}-${letter}-${index}`}
                  >
                    {isMissingLetter && !showWord ? "_" : letter}
                  </span>
                );
              })}
            </div>

            <p className="prompt">{challenge.prompt}</p>

            <div className="button-row" role="group" aria-label="Letter choices">
              {challenge.choices.map((letter) => {
                const buttonState =
                  selectedLetter === letter
                    ? letter === correctLetter
                      ? "correct"
                      : "incorrect"
                    : "";
                const hintState =
                  (showWord || Boolean(selectedLetter)) && !isCorrect && letter === correctLetter
                    ? "hint"
                    : "";

                return (
                  <button
                    className={`letter-button ${buttonState} ${hintState}`}
                    disabled={isCorrect}
                    key={letter}
                    onClick={() => chooseLetter(letter)}
                    type="button"
                  >
                    {letter}
                  </button>
                );
              })}
            </div>

            {selectedLetter && (
              <div className={`feedback ${isCorrect ? "happy" : "gentle"}`}>
                {isCorrect ? (
                  <p>
                    {praise[challengeIndex % praise.length]} The word is{" "}
                    {challenge.word}.
                  </p>
                ) : (
                  <p>
                    Good try. The missing letter sounds like{" "}
                    <strong>{correctLetter}</strong>.
                  </p>
                )}
              </div>
            )}

            <div className="action-row">
              <button
                className="secondary-button"
                onClick={() => speak(`${challenge.clue} ${challenge.prompt}`)}
                type="button"
              >
                Hear clue
              </button>
              <button
                className="secondary-button"
                onClick={() => {
                  setShowWord(true);
                  speak(challenge.word);
                }}
                type="button"
              >
                Show word
              </button>
              {isCorrect && (
                <button className="primary-button" onClick={nextChallenge} type="button">
                  {isFinalChallenge ? "Finish quest" : "Next quest"}
                </button>
              )}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
