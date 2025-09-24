"use client";

import React, { useEffect, useRef, useState } from "react";

// Thank you jonathan for the recipe 😊

const prompts = [
  { prompt: "Design a recipe for sustainable chicken nachos.", response: `125g Nacho Chips
50g Shredded Cheese
The Chicken
250g Aussie Chicken Breast
1 Tbsp Tomato Paste
1 tsp sugar
½ Cup Chicken Stock
3 tsp taco seasoning
1 garlic clove (minced)

Preheat oven to 180° C                        
Place Nacho Seasoning in a bowl along with 2 Tbsp of the chicken broth. Mix to form a loose paste, and add the chicken, turning to coat in paste.
 Add oil to a medium high heat. Cook chicken for 3 minutes on each side, reserving paste left in bowl. Remove chicken into a shallow dish.
Return pan to stove, along with remaining chicken stock, tomato paste, and sugar. Scrape in any paste left in the bowl. Mix to dissolve, scraping the base of the pan, and bring a to a simmer.
Meanwhile. shred chicken with forks or chop.
Return chicken to sauce, toss and simmer for 3 minutes until sauce reduces down to a thick sauce. Keep warm
 Alternate corn chips, warm whicken and cheese on a tray. Bake for 7 minutes or until cheese is melted.

And voilà! You’ve made an easy, cheap and sustainable meal.` },
  { prompt: "Create a multistage program that trains athlete's endurance.", response: "The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start." },
  { prompt: "yuh now write a story that reflects my morals frfr ong", response: "And boom. Sparks ignited under the skateboard's charcoal, thrusting the board directly towards the neon-lit halfpipe. Supra felt the surge—an electric pulse in his shoes, fingertips tingling. The crowd blurred into streaks of color as the wheels shrieked over the concrete, carving a path through the midnight haze. Every muscle tightened, every breath sharpened. The board soared up the ramp, defying gravity for a split second, before landing with a thunderous clap. Cheers erupted, echoing off the walls, but Supra was already scanning for the next line, hungry for another burst of speed and fire." },
  { prompt: "What makes you different to ChatGPT and Claude?", response:"I'm glad you asked. Unlike other large language models that just regurgitate words from probability, I learn the subtleties that make your writing special. I pick up on your unique style, tone, and the little quirks that make your voice stand out. This way, I can help you create content that truly feels like you, rather than just sounding generic or robotic. But otherwise, I'm the same as everyone else. 😅" },
  { prompt: "When do you learn my writing style?", response:"During setup, you can provide me with samples of your writing, where I analyse these samples to understand your unique style, tone, and preferences. The more diverse and representative the samples are, the better I can capture the nuances of your writing. Once I've learned from these samples, I can help you generate content that aligns closely with your personal style."},
  { prompt: "What do you do with my data?", response:"We keep all your samples and their analysis locally on your device and do not collect them for our own purposes, however you can choose to send us your conversation data to help up make the model better." },
  { prompt: "How does the model run?", response:"What a useful question. The model is ran locally on the user's device, which is why the app doesn't require internet connection. This does however bring about the issue of users not having powerful enough hardware to sufficiently run the model; we fix this by scaling the model to different parameter and context window counts." }
];


interface HeroProps {
  className?: string;
}

const HeroInteractive: React.FC<HeroProps> = ({ className = "" }) => {
  const [index, setIndex] = useState(0);
  const [promptText, setPromptText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [queue, setQueue] = useState<number[]>([]);

  const lastTimeoutRef = useRef<number | null>(null);
  const cancelRef = useRef(false);
  const cycleRef = useRef<number | null>(null);

  // shuffle helper
  const shuffleArray = (arr: number[]) =>
    [...arr].sort(() => Math.random() - 0.5);

  const typeSafely = async (
    text: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    speed = 30
  ) => {
    for (let i = 0; i < text.length; i++) {
      if (cancelRef.current) return;
      await new Promise<void>((resolve) => {
        lastTimeoutRef.current = window.setTimeout(() => {
          setter((prev) => prev + text[i]);
          resolve();
        }, speed);
      });
    }
  };

  useEffect(() => {
    cancelRef.current = false;

    const runPair = async () => {
      const pair = prompts[index];

      setPromptText("");
      setResponseText("");

      await typeSafely(pair.prompt, setPromptText, 28);

      if (cancelRef.current) return;
      await new Promise((r) => {
        lastTimeoutRef.current = window.setTimeout(() => {
          setResponseText("\n");
          r(undefined);
        }, 300);
      });

      if (cancelRef.current) return;
      await typeSafely(pair.response, setResponseText, 22);
    };

    runPair();

    if (cycleRef.current) {
      window.clearInterval(cycleRef.current);
      cycleRef.current = null;
    }

    cycleRef.current = window.setInterval(() => {
      setQueue((prevQueue) => {
        if (prevQueue.length <= 1) {
          // if empty or single left → reshuffle full set
          const freshQueue = shuffleArray(
            prompts.map((_, idx) => idx)
          );
          setIndex(freshQueue[0]);
          return freshQueue.slice(1);
        } else {
          setIndex(prevQueue[0]);
          return prevQueue.slice(1);
        }
      });
    }, 12000);

    return () => {
      cancelRef.current = true;
      if (lastTimeoutRef.current) {
        window.clearTimeout(lastTimeoutRef.current);
        lastTimeoutRef.current = null;
      }
      if (cycleRef.current) {
        window.clearInterval(cycleRef.current);
        cycleRef.current = null;
      }
    };
  }, [index]);

  // Initialize queue on mount
  useEffect(() => {
    const shuffled = shuffleArray(prompts.map((_, idx) => idx));
    setIndex(shuffled[0]);
    setQueue(shuffled.slice(1));
  }, []);

  return (
    <div
      className={`absolute inset-0 flex items-start justify-start px-6 md:px-12 pt-8 overflow-hidden ${className}`}
      style={{
        transform: "translateZ(0)",
        isolation: "isolate",
      }}
    >
      <div className="absolute inset-0 bg-black backdrop-blur-md" />

      <div className="absolute inset-0 flex items-center backdrop-blur-[0px]">
        <div className="w-[1200px] h-[1200px] blurxl rounded-full opacity-50" />
      </div>

      <div className="relative max-w-[4000px] w-full opacity-75">
        <div className="max-w-none text-left">
          <div
            className="font-extrabold leading-[1.1] tracking-tight break-words text-[clamp(24px,5vw,64px)] font-mono whitespace-pre-line"
            style={{ color: "rgba(135, 135, 135, 0.9)" }}
          >
            <span>{promptText}</span>
            <span style={{ color: "rgba(94, 94, 94, 0.75)" }}>
              {responseText}
            </span>
            <span className="inline-block animate-blink ml-1">|</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroInteractive;