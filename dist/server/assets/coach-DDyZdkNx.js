import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "../server.js";
//#region node_modules/@tanstack/start-server-core/dist/esm/createServerRpc.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/./_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/lib/coach.ts?tss-serverfn-split
var writeBriefing_createServerFn_handler = createServerRpc({
	id: "e3cf2edf94a5300c89d97e95bc464b40fbd4c8a1023ca2f8d16f8a1b73c044e8",
	name: "writeBriefing",
	filename: "src/lib/coach.ts"
}, (opts) => writeBriefing.__executeServer(opts));
var writeBriefing = createServerFn({ method: "POST" }).validator((input) => input).handler(writeBriefing_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "The coach is not available here."
	};
	const prompt = [
		`Write a daily briefing for ${data.name.trim() || "the practitioner"} on ${data.weekday} ${data.date}.`,
		`Today the figure stands at ${data.truePct}% of the ideal (${Math.round(data.completion * 100)}% of marks filled). Streak ${data.streak}.`,
		`Today by aspect: ${data.aspects.map((a) => `${a.name} ${a.pct}%`).join(", ")}.`,
		`Last seven days: ${data.weekAspects.map((a) => `${a.name} ${a.pct}%`).join(", ")}.`,
		data.lowest.length ? `Thinnest marks: ${data.lowest.map((m) => `${m.name} (${m.aspect}) ${Math.round(m.avg / 5 * 100)}%`).join("; ")}.` : "",
		data.quest ? `Suggested hinge: ${data.quest.name} — ${data.quest.why} If-then: ${data.quest.ifThen} Tiny: ${data.quest.tiny}` : "",
		data.journal ? `They wrote: ${data.journal}` : "",
		"",
		"Voice: a clear older sibling. No emoji. No guru. No toxic positivity. No exclamation marks. Short paragraphs. Ground every claim in the numbers. Pick ONE hinge for tomorrow. Use implementation intentions, identity-based habits, self-compassion without excuse, and consistency over intensity. End with a single sentence they can keep."
	].filter(Boolean).join("\n");
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: 500,
			temperature: .6,
			messages: [{
				role: "system",
				content: "You are the counsel inside Arête, a life character-sheet. You help someone become the figure they already wrote down. You know Gollwitzer (implementation intentions), Clear (identity), Fogg (tiny habits), Neff (self-compassion), Oettingen (WOOP), and the progress principle. You never pile on. You never shame a miss. You never give five priorities."
			}, {
				role: "user",
				content: prompt
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `Counsel failed (${res.status}).`
	};
	const text = (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
	if (!text) return {
		ok: false,
		error: "Counsel came back empty."
	};
	return {
		ok: true,
		text
	};
});
//#endregion
export { writeBriefing_createServerFn_handler };
