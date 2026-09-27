import { createServerFn } from "@tanstack/react-start";

export type CoachInput = {
  name: string;
  date: string;
  weekday: string;
  truePct: number;
  completion: number;
  streak: number;
  journal?: string;
  aspects: { name: string; pct: number }[];
  weekAspects: { name: string; pct: number }[];
  lowest: { name: string; aspect: string; avg: number }[];
  quest?: { name: string; aspect: string; why: string; ifThen: string; tiny: string };
};

export const writeBriefing = createServerFn({ method: "POST" })
  .validator((input: CoachInput) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "The coach is not available here." };
    }

    const you = data.name.trim() || "the practitioner";
    const prompt = [
      `Write a daily briefing for ${you} on ${data.weekday} ${data.date}.`,
      `Today the figure stands at ${data.truePct}% of the ideal (${Math.round(data.completion * 100)}% of marks filled). Streak ${data.streak}.`,
      `Today by aspect: ${data.aspects.map((a) => `${a.name} ${a.pct}%`).join(", ")}.`,
      `Last seven days: ${data.weekAspects.map((a) => `${a.name} ${a.pct}%`).join(", ")}.`,
      data.lowest.length
        ? `Thinnest marks: ${data.lowest.map((m) => `${m.name} (${m.aspect}) ${Math.round((m.avg / 5) * 100)}%`).join("; ")}.`
        : "",
      data.quest
        ? `Suggested hinge: ${data.quest.name} — ${data.quest.why} If-then: ${data.quest.ifThen} Tiny: ${data.quest.tiny}`
        : "",
      data.journal ? `They wrote: ${data.journal}` : "",
      "",
      "Voice: a clear older sibling. No emoji. No guru. No toxic positivity. No exclamation marks. Short paragraphs. Ground every claim in the numbers. Pick ONE hinge for tomorrow. Use implementation intentions, identity-based habits, self-compassion without excuse, and consistency over intensity. End with a single sentence they can keep.",
    ]
      .filter(Boolean)
      .join("\n");

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 500,
        temperature: 0.6,
        messages: [
          {
            role: "system",
            content:
              "You are the counsel inside Arête, a life character-sheet. You help someone become the figure they already wrote down. You know Gollwitzer (implementation intentions), Clear (identity), Fogg (tiny habits), Neff (self-compassion), Oettingen (WOOP), and the progress principle. You never pile on. You never shame a miss. You never give five priorities.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!res.ok) {
      return { ok: false as const, error: `Counsel failed (${res.status}).` };
    }

    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return { ok: false as const, error: "Counsel came back empty." };
    return { ok: true as const, text };
  });
