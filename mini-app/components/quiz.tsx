"use client";

import { useState, useEffect } from "react";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

type Question = {
  text: string;
  options: { text: string; score: number }[];
};

const questions: Question[] = [
  {
    text: "What’s your first thought when you walk into a love hotel?",
    options: [
      { text: "I need to check the room details first", score: 1 },
      { text: "I’m ready to have fun right away", score: 4 },
      { text: "I hope someone is here to talk", score: 3 },
      { text: "I’m already planning my grand entrance", score: 2 },
    ],
  },
  {
    text: "Which accessory would you bring?",
    options: [
      { text: "A small suitcase", score: 1 },
      { text: "A cocktail glass", score: 4 },
      { text: "A bouquet of flowers", score: 3 },
      { text: "A camera and a microphone", score: 2 },
    ],
  },
  {
    text: "How do you greet the staff?",
    options: [
      { text: "With a polite nod", score: 1 },
      { text: "With a playful wink", score: 4 },
      { text: "With a warm smile", score: 3 },
      { text: "With a dramatic entrance", score: 2 },
    ],
  },
  {
    text: "What’s your ideal room vibe?",
    options: [
      { text: "Quiet and private", score: 1 },
      { text: "Bright and lively", score: 4 },
      { text: "Romantic and cozy", score: 3 },
      { text: "Glitzy and flashy", score: 2 },
    ],
  },
  {
    text: "What’s your post‑stay plan?",
    options: [
      { text: "I’ll keep it a secret", score: 1 },
      { text: "I’ll share a photo on socials", score: 4 },
      { text: "I’ll write a love letter", score: 3 },
      { text: "I’ll host a grand party", score: 2 },
    ],
  },
];

const tiers = [
  {
    name: "Guarded Guest",
    image: "/guarded-guest.png",
    description: "Cautious and reserved, you take your time to open up.",
  },
  {
    name: "Vacation Flirt",
    image: "/vacation-flirt.png",
    description: "Fun, flirty, and ready for a good time.",
  },
  {
    name: "Open‑Hearted Romantic",
    image: "/open-hearted-romantic.png",
    description: "Genuinely looking for connection and affection.",
  },
  {
    name: "Reality TV Heartbreaker",
    image: "/reality-tv-heartbreaker.png",
    description: "Main‑character energy that steals every scene.",
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [shuffled, setShuffled] = useState<Question[]>([]);

  useEffect(() => {
    // Randomize answer order for each question
    const newShuffled = questions.map((q) => ({
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5),
    }));
    setShuffled(newShuffled);
  }, []);

  const handleSelect = (score: number) => {
    setAnswers([...answers, score]);
    if (current + 1 < shuffled.length) {
      setCurrent(current + 1);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setAnswers([]);
  };

  if (shuffled.length === 0) return null; // still loading

  if (answers.length === shuffled.length) {
    const total = answers.reduce((a, b) => a + b, 0);
    const tierIndex = Math.min(
      Math.floor((total - 5) / 3),
      tiers.length - 1
    );
    const tier = tiers[tierIndex];

    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-3xl font-bold">{tier.name}</h2>
        <img
          src={tier.image}
          alt={tier.name}
          width={512}
          height={512}
          className="rounded-lg"
        />
        <p className="text-center max-w-md">{tier.description}</p>
        <Share text={`I scored ${tier.name} in the Love Hotel Quiz! ${url}`} />
        <button
          onClick={resetQuiz}
          className="mt-4 px-4 py-2 rounded bg-primary text-primary-foreground"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const q = shuffled[current];
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">{q.text}</h2>
      <div className="flex flex-col gap-2">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(opt.score)}
            className="px-4 py-2 rounded bg-secondary text-secondary-foreground"
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
