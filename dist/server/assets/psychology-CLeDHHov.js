import { _ as keysBefore, g as isSunday, h as isMonday, l as variance, n as aspectAverages, o as scoreDay, p as formatWeekday, r as averagesForRange, s as streakEndingAt, u as addDays, v as startOfIsoWeek } from "./store-BoIZToYY.js";
//#region src/lib/psychology.ts
function possessive(name) {
	const n = name.trim();
	if (!n) return "your";
	return n.toLowerCase() === "you" ? "your" : `${n}'s`;
}
function displayName(name) {
	return name.trim() || "you";
}
function buildQuest(today, logs, metrics, aspects) {
	const window = keysBefore(addDays(today, -1), 7);
	const avgs = averagesForRange(window, logs, metrics).filter((a) => a.n >= 2);
	if (avgs.length === 0) {
		const first = metrics.find((m) => m.active);
		if (!first) return null;
		const aspect = aspects.find((a) => a.id === first.aspectId);
		if (!aspect) return null;
		return {
			metric: first,
			aspect,
			avg: 0,
			why: "Start with one mark. The figure is built from repetition, not intensity.",
			ifThen: `If the day starts, then ${first.name.toLowerCase()} happens before the feed.`,
			identity: `You are someone who keeps ${first.name.toLowerCase()}.`,
			tiny: tinyFor(first)
		};
	}
	avgs.sort((a, b) => a.avg - b.avg);
	const lowest = avgs[0];
	const aspect = aspects.find((a) => a.id === lowest.metric.aspectId);
	if (!aspect) return null;
	const pct = Math.round(lowest.avg / 5 * 100);
	return {
		metric: lowest.metric,
		aspect,
		avg: lowest.avg,
		why: `${lowest.metric.name} is the thinnest line on the figure — ${pct}% across the last week. Raising one mark moves the whole percentage more than grazing twenty.`,
		ifThen: ifThenFor(lowest.metric),
		identity: `You are the kind of person who does not skip ${lowest.metric.name.toLowerCase()}.`,
		tiny: tinyFor(lowest.metric)
	};
}
function buildInsights(today, name, logs, metrics, aspects) {
	const out = [];
	const you = displayName(name);
	const poss = possessive(name);
	const todayLog = logs[today];
	const yesterday = addDays(today, -1);
	const yLog = logs[yesterday];
	const todayScore = scoreDay(today, todayLog, metrics, aspects);
	const yScore = scoreDay(yesterday, yLog, metrics, aspects);
	const weekKeys = keysBefore(today, 7);
	const weekAvgs = aspectAverages(weekKeys, logs, metrics, aspects);
	const metricAvgs = averagesForRange(weekKeys, logs, metrics);
	const streak = streakEndingAt(today, logs, metrics);
	const yStreakBroken = !yLog || metrics.filter((m) => m.active && yLog.scores[m.id] != null).length === 0;
	const lowestAspect = [...weekAvgs].sort((a, b) => a.pct - b.pct)[0];
	const highestAspect = [...weekAvgs].sort((a, b) => b.pct - a.pct)[0];
	const lowestMetric = [...metricAvgs].filter((m) => m.n >= 2).sort((a, b) => a.avg - b.avg)[0];
	const highestMetric = [...metricAvgs].filter((m) => m.n >= 2).sort((a, b) => b.avg - a.avg)[0];
	if (lowestAspect && lowestAspect.n >= 4) out.push({
		id: "thin-aspect",
		kicker: lowestAspect.aspect.name,
		title: `${lowestAspect.aspect.name} is carrying the least weight.`,
		body: `${lowestAspect.aspect.tagline} This week it sat at ${lowestAspect.pct}%. Do not try to rescue the whole aspect. Pick the one mark inside it that you can keep even on a bad day. Identity follows evidence, not mood.`,
		priority: 90
	});
	if (lowestMetric) out.push({
		id: "one-thing",
		kicker: "One thing",
		title: `Protect ${lowestMetric.metric.name.toLowerCase()} before you add anything.`,
		body: `${ifThenFor(lowestMetric.metric)} Implementation intentions beat willpower because they move the decision to yesterday. If you already failed it today, the plan is for the next occurrence — not a speech to yourself.`,
		priority: 88
	});
	if (highestMetric && highestMetric.avg >= 4) out.push({
		id: "win",
		kicker: "Keep",
		title: `${highestMetric.metric.name} is already ${you === "you" ? "yours" : poss}.`,
		body: `The progress principle is simple: visible wins fuel the next hour more than distant goals. Do not starve the thing that is working to feed the thing that is not. Guard ${highestMetric.metric.name.toLowerCase()}. Let it stay easy.`,
		priority: 55
	});
	if (highestAspect && lowestAspect && highestAspect.pct - lowestAspect.pct >= 18) out.push({
		id: "imbalance",
		kicker: "Balance",
		title: `${highestAspect.aspect.name} is covering for ${lowestAspect.aspect.name}.`,
		body: `A figure with one giant limb and three thin ones is not strong — it is compensated. ${highestAspect.aspect.name} at ${highestAspect.pct}% will not save a life that is ${lowestAspect.pct}% ${lowestAspect.aspect.name.toLowerCase()}. Borrow twenty minutes from the strong side. Give them to the thin one.`,
		priority: 70
	});
	if (todayScore.rated >= 8) {
		const values = metrics.filter((m) => m.active && todayLog?.scores[m.id] != null).map((m) => todayLog.scores[m.id]);
		if (variance(values) >= 1.35) out.push({
			id: "all-or-nothing",
			kicker: "Split day",
			title: "Today is a split: some fives, some ones.",
			body: `All-or-nothing days feel dramatic and teach the nervous system that a miss is a collapse. A three kept is worth more than a five followed by a zero. Finish the remaining marks at an honest 3 if you have to. Consistency writes the character. Intensity writes the mood.`,
			priority: 80
		});
	}
	if (yStreakBroken && !todayScore.rated) out.push({
		id: "missed",
		kicker: "Yesterday",
		title: "You missed a day. That is data, not a verdict.",
		body: `Self-compassion is not letting yourself off. It is refusing to turn a miss into a story about who you are. People who bounce back fastest treat yesterday as a closed file. Open today with the smallest mark — ${lowestMetric ? lowestMetric.metric.name.toLowerCase() : "one metric"}, two minutes, done. The streak restarts the moment you rate something.`,
		priority: 95
	});
	else if (yStreakBroken && todayScore.rated > 0) out.push({
		id: "restart",
		kicker: "Restart",
		title: "You already reopened the book.",
		body: `The fresh start is not Monday. It is the next mark after a miss. You have ${todayScore.rated} down. Do not try to make today legendary. Make it complete.`,
		priority: 86
	});
	if (streak >= 3 && todayScore.rated > 0) out.push({
		id: "streak",
		kicker: `${streak} days`,
		title: "The chain is the point. Do not break it for a perfect day.",
		body: `A ${streak}-day chain is identity evidence. Protect it with a floor, not a ceiling: every active mark gets a number, even if three of them are twos. A logged imperfect day beats an unlogged heroic one. Seinfeld was right about the chain. He was silent about shame — skip the shame.`,
		priority: 72
	});
	if (isMonday(today)) out.push({
		id: "monday",
		kicker: "Monday",
		title: "Fresh start is a real effect. Spend it on one hinge.",
		body: `People change more on Mondays because the calendar gives the mind a clean edge. Do not waste that edge on a twelve-item overhaul. Name the one mark that would make ${you} proud on Friday. Write the if-then. Then go do the first two minutes before noon.`,
		priority: 78
	});
	if (isSunday(today)) {
		const weekStart = startOfIsoWeek(today);
		const daysLogged = keysBefore(today, 7).filter((k) => {
			const log = logs[k];
			if (!k || !log) return false;
			return metrics.some((m) => m.active && log.scores[m.id] != null);
		}).length;
		out.push({
			id: "sunday",
			kicker: "Close the week",
			title: `You showed up ${daysLogged} of 7 days.`,
			body: `Weekly review is how a practice becomes a life. Name one thing you will protect next week (${weekStart} already closed). Wish, outcome, obstacle, plan: what do you want, how will it feel, what will try to stop you, and what will you do when it does. That is WOOP. It works because it rehearses the obstacle, not the dream.`,
			priority: 84
		});
	}
	if (yScore.truePct > 0 && todayScore.rated >= 6) {
		if (todayScore.truePct + 8 < yScore.truePct) out.push({
			id: "dip",
			kicker: "Dip",
			title: "Today is thinner than yesterday. That is allowed.",
			body: `A downward day after a strong one is regression to the mean, not moral failure. Do not chase yesterday's number. Chase completion. Rate honestly. Go to bed. The figure is a moving average, not a screenshot.`,
			priority: 68
		});
		else if (todayScore.truePct >= yScore.truePct + 10) out.push({
			id: "recovery",
			kicker: "Rise",
			title: "Today climbed. Do not cash it in for a speech.",
			body: `The rise is evidence. Lock it with a boring tomorrow: same wake, same first mark, same floor. Heroes narrate. Practitioners repeat.`,
			priority: 60
		});
	}
	const weekScores = weekKeys.map((k) => scoreDay(k, logs[k], metrics, aspects)).filter((s) => s.rated > 0).map((s) => s.truePct);
	if (weekScores.length >= 4) {
		if (variance(weekScores) >= 14) out.push({
			id: "swing",
			kicker: "Swing",
			title: "The week is swinging too hard.",
			body: `High variance means the practice is still mood-driven. The goal is a narrower band, even if the average dips a little while you stabilize. Cap the ceiling for three days: no fives required. Floor of three on the marks you can control. Boring is the skill.`,
			priority: 74
		});
	}
	if (todayScore.rated > 0 && todayScore.rated < todayScore.active) {
		const left = todayScore.active - todayScore.rated;
		out.push({
			id: "finish",
			kicker: `${left} left`,
			title: `Finish the sheet. Honesty over heat.`,
			body: `An incomplete character sheet teaches you that the figure is optional. It is not. Rate the rest in five minutes. If a mark was truly absent, it is a one — not a skip. Skipping is how the notebook used to lie.`,
			priority: 76
		});
	}
	if (lowestMetric) out.push({
		id: "tiny",
		kicker: "Tiny",
		title: `Make ${lowestMetric.metric.name.toLowerCase()} too small to refuse.`,
		body: `${tinyFor(lowestMetric.metric)} BJ Fogg is right: emotion follows action that succeeds. A two-minute version that happens beats a forty-minute version you admire. After it happens, you may continue. You may not start at the heroic version.`,
		priority: 66
	});
	out.push({
		id: "identity",
		kicker: "Figure",
		title: `Every mark is a vote for who ${you} is.`,
		body: `You do not rise to the ideal. You fall to the person you have evidence for. Twenty marks a day is a lot of evidence. Cast the votes. Then let the percentage be a mirror, not a judge.`,
		priority: 40
	});
	out.sort((a, b) => b.priority - a.priority);
	const seen = /* @__PURE__ */ new Set();
	const unique = [];
	for (const i of out) {
		if (seen.has(i.id)) continue;
		seen.add(i.id);
		unique.push(i);
	}
	return unique.slice(0, 5);
}
function localBriefing(today, name, logs, metrics, aspects) {
	const you = displayName(name);
	const quest = buildQuest(today, logs, metrics, aspects);
	const insights = buildInsights(today, name, logs, metrics, aspects);
	const score = scoreDay(today, logs[today], metrics, aspects);
	const streak = streakEndingAt(today, logs, metrics);
	const week = aspectAverages(keysBefore(today, 7), logs, metrics, aspects);
	const lines = [];
	lines.push(`${formatWeekday(today)}.`);
	if (score.rated === 0) lines.push(`${you === "you" ? "You have" : you + " has"} not marked the sheet yet. That is the whole assignment. Open it. Rate what already happened. Leave the rest honest.`);
	else if (score.completion < 1) lines.push(`The figure is ${score.truePct}% of the ideal with ${score.rated} of ${score.active} marks down. Finish the sheet before you try to improve it.`);
	else lines.push(`Today closed at ${score.truePct}% of the ideal. Streak ${streak}. That number is a snapshot. The practice is the chain.`);
	if (quest) {
		lines.push("");
		lines.push(`The hinge is ${quest.metric.name} (${quest.aspect.name}).`);
		lines.push(quest.why);
		lines.push(quest.ifThen);
		lines.push(quest.tiny);
	}
	const aspectLine = week.map((a) => `${a.aspect.name} ${a.pct}%`).join(" · ");
	if (aspectLine) {
		lines.push("");
		lines.push(`Seven-day figure: ${aspectLine}.`);
	}
	const top = insights[0];
	if (top && top.id !== "one-thing") {
		lines.push("");
		lines.push(top.body);
	}
	lines.push("");
	lines.push("Do not collect advice. Keep the one mark. Then go to bed without a speech.");
	return lines.join("\n");
}
function ifThenFor(metric) {
	return {
		training: "If the workday ends, then shoes go on before the couch. Ten minutes counts.",
		sleep: "If the clock passes the hour you named, then the phone goes in another room. The book can be dull.",
		nutrition: "If you plate a meal, then protein and a plant land first. Dessert is a decision, not a drift.",
		recovery: "If the evening starts, then ten minutes of downshift before any more input.",
		prayer: "If you wake, then prayer happens before the feed. Phone stays face-down until you have spoken.",
		scripture: "If coffee is poured, then one chapter sits beside it. Not a plan to read later.",
		integrity: "If a small dishonest convenience appears, then you name it out loud to yourself and take the slower true option.",
		stillness: "If you sit down at a screen, then two minutes of nothing first. Timer on. No bargaining.",
		family: "If you come through the door, then the first ten minutes belong to them. Phone in a drawer.",
		home: "If the house is quiet, then one unprompted kindness — a question, a chore, a hand.",
		friendship: "If you think of someone, then you send the message in the next five minutes. Thinking is not contact.",
		service: "If you have a spare hour, then one act that does not benefit you. Calendar it like work.",
		"deep-work": "If the morning is still intact, then ninety minutes on the hard thing before mail.",
		money: "If money moves, then it is named: give, save, spend. Unnamed money is a leak.",
		building: "If you open the project, then one brick that would still matter in a year. Not tidy-up.",
		creating: "If the day has an edge, then twenty minutes of making with no audience.",
		study: "If you sit to learn, then a timer for twenty-five and a closed door. Notes on paper.",
		reading: "If the evening begins, then ten pages before any episode.",
		focus: "If a new tab tempts you, then you write the current task on paper first. Return is a choice.",
		curiosity: "If a real question shows up, then you follow it for fifteen minutes instead of scrolling past it."
	}[metric.id] ?? `If the cue for ${metric.name.toLowerCase()} appears, then you do the two-minute version immediately.`;
}
function tinyFor(metric) {
	return {
		training: "Two minutes of movement. Shoes on is the win.",
		sleep: "Lights down one notch. Phone on a dresser, not a pillow.",
		nutrition: "Drink water and eat one real thing before the convenient thing.",
		recovery: "Lie on the floor for two minutes. Breathe out longer than in.",
		prayer: "One honest sentence. Out loud. Before the lock screen.",
		scripture: "Seven verses. Mark the last one with a date.",
		integrity: "Tell the small truth you were going to round off.",
		stillness: "Sit. Two minutes. Hands empty.",
		family: "Ask one question you do not know the answer to, and wait.",
		home: "Do the chore they usually do, without announcing it.",
		friendship: "Send the unsent text. Two lines is enough.",
		service: "One message of help with a specific offer, not 'let me know'.",
		"deep-work": "Open the hard file. Write the next sentence. Timer for ten.",
		money: "Open the account. Name tomorrow's one move in a note.",
		building: "One commit, one paragraph, one call. A brick.",
		creating: "A sketch, a riff, a paragraph. Keep it ugly.",
		study: "One page of the hard thing, annotated.",
		reading: "Three pages. Bookmark. Lamp off is allowed after.",
		focus: "Close the extra tabs. One window. One task name at the top.",
		curiosity: "Write the question down. Search it after you finish the current mark."
	}[metric.id] ?? `Do a two-minute version of ${metric.name.toLowerCase()} and stop if you must.`;
}
//#endregion
export { buildQuest as n, localBriefing as r, buildInsights as t };
