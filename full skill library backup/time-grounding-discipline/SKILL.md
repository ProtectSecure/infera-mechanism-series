---
name: time-grounding-discipline
description: Anchor every Claude response in real time before making pacing claims, time-of-day references, or session-length assertions. Use when discussing how long something has taken, where we are in the day/sprint/project, when events happened, or any reference to schedules, deadlines, or pacing. Triggers on phrases like "how long", "when", "today", "yesterday", "many hours", "ahead of plan", "behind schedule", session log writing, or sprint-day naming. Reconciles system-prompt date drift across overnight breaks (Rule 6).
---

# Time Grounding Discipline

## Description

Anchor every Claude response in real time before making pacing claims, time-of-day references, or session-length assertions. Use when discussing "how long has this taken," "where are we in the day/sprint/project," "when did X happen," or any reference to schedules, deadlines, or pacing. Triggered by phrases like "how long," "when," "today," "yesterday," "many hours," "ahead of plan," "behind schedule," or any session log writing or sprint-day naming.

## When this applies

Every turn where Claude makes any claim about:

- Current date or time
- Time elapsed since something earlier in the conversation
- Session length ("you've been at this for many hours")
- Sprint day numbering (Day N of build, Day M of sprint)
- Calendar progression toward a deadline
- Pacing characterizations ("ahead of plan," "behind schedule," "tight timeline")
- When events happened ("yesterday's commit," "this morning's verification")
- User's local time vs Claude's available time information

## The discipline

### Rule 1 — Ground before asserting

Before making ANY time-pacing claim, Claude must have one of:

- **A real anchor from this turn:** time.gov check, user-provided timestamp, or system-prompt date
- **A real anchor carried forward from this conversation:** explicit timestamp from earlier in the session that hasn't been invalidated
- **An honest acknowledgment of uncertainty:** "I don't actually know what time it is in your local zone right now"

If none of these are available, Claude does NOT make the time-pacing claim. Instead, Claude either checks time.gov (if Chrome is authorized) or asks the user directly.

### Rule 2 — No "many hours" without basis

Phrases that require explicit time anchor before use:

- "You've been at this many hours"
- "We've spent hours on this"
- "This has taken longer than expected"
- "It's been a long day"
- "We're running long"
- Any imprecise duration claim about user activity

If Claude wants to make these claims, it must first either (a) reference a specific timestamp the user provided, (b) calculate based on conversation message timestamps, or (c) acknowledge it doesn't actually know.

### Rule 3 — Reconcile system date against session continuity

When sprint-day numbering or build-day numbering is used:

1. Note the system-provided current date (from system prompt)
2. Cross-reference against any session log file naming or memory references
3. Reconcile any conflict explicitly before proceeding
4. State the resolved day number AND the calendar date together: "Today is Tuesday, April 28, 2026 — Day 10 of build, Day 2 of demo sprint"

If the day-number assertion contradicts memory or session continuity, Claude STOPS and reconciles before proceeding.

### Rule 4 — Time.gov as authoritative source

When Chrome is available and authorized for www.time.gov, time.gov is the authoritative source for current US time. Use it to anchor:

- Current Eastern Time (relevant for users in Eastern timezone)
- Current UTC (for log timestamps)
- Reconciliation with system-prompt date claims

The check happens once per turn maximum. Not "every 5 minutes" (impossible — Claude doesn't run between turns). Once per turn, when time-pacing claims are about to be made, OR when starting a session log, OR when the user explicitly asks about time.

### Rule 5 — Honesty over confidence

When Claude cannot accurately ground time, the correct response is to say so:

- "I don't have a reliable read on your local time right now"
- "I haven't checked time.gov this turn — I shouldn't make pacing claims"
- "My system context says X but session continuity suggests Y, let me reconcile"

NEVER confabulate time information or use vague language to obscure uncertainty.

### Rule 6 — Date drift reconciliation across days

The system-prompt date is set when the conversation starts. **It does not auto-advance when a calendar day changes mid-conversation.** A long-running conversation that spans multiple wall-clock days will have a system-prompt date that becomes stale.

This is especially common when:

- The user takes overnight rest mid-conversation
- The conversation extends past midnight in the user's timezone
- The user is in a timezone where the conversation crosses a date boundary
- A break in conversation ("standing by") spans a day-flip the user doesn't explicitly call out

**Symptoms of date drift to watch for:**

- Sprint-day numbering that doesn't match memory's expected progression
- Commit timestamps from "today" that resolve to a future hour relative to the user's stated time
- Session continuity references that don't fit the system-prompt date
- The user mentioning "yesterday" referring to events that the system-prompt date treats as "today"

**The reconciliation move:**

When sprint-day or build-day claims are about to be made, AND a previous day's events appear in conversation history, AND the user has indicated a break or rest:

1. **Do NOT assume the system-prompt date is correct.** It may be stale.
2. **Ask the user directly:** "What's today's date? My system context says X but I want to verify."
3. **Or check time.gov if Chrome is authorized** — that's authoritative.
4. **Reconcile commit timestamps in UTC against the user's local timezone** before drawing conclusions about when something happened.

**Example pattern that should trigger reconciliation:**

User says "Welcome to Wednesday" or "Good morning" or "I took rest" or any indication of day-flip. Claude immediately reconciles the system-prompt date against this signal. If they conflict, the user's signal wins (they're in the actual timezone; system-prompt context can be stale).

**Why this matters:** sprint-day and build-day numbering compound across days. If today is mistakenly treated as yesterday, ALL calendar-progression claims downstream are wrong. The demo is N days away — that N is wrong. Carries to "tomorrow" are actually carries to "today." Replanning gates that should have already triggered haven't. Date drift is the most consequential time-grounding failure because it cascades through every other planning claim.

**Filed 2026-04-29 (Day 11 build / Day 3 demo sprint, Wednesday) after first failure mode of the skill: Claude treated Tuesday April 28 as today when actually today was Wednesday April 29 due to user's overnight rest. The system-prompt date had not advanced. User had to explicitly correct: "Welcome to Wednesday."**

## How to apply (turn-by-turn workflow)

When a turn requires time grounding:

1. **Identify the time-pacing claims** Claude is about to make in the response
2. **Check anchor availability:**
   - System-prompt date: usually available
   - User-provided time: scan recent conversation for explicit time references
   - time.gov: check if Chrome is authorized for the domain
3. **Use the strongest available anchor** in this priority order:
   - time.gov (most authoritative)
   - User-provided timestamp from this conversation (most relevant to user's actual context)
   - System-prompt date (reliable for date but not local time-of-day)
4. **State the anchor explicitly when it matters:** "Per the system context, today is April 28, 2026" or "You said 'it's only 950am here' a few turns ago, so I'm estimating you're now around X o'clock Eastern"
5. **If no anchor available, say so** and either request one or omit the time-pacing claim

## Examples

### Example 1 — Day numbering reconciliation

**User:** "where are we in the day?"

**Wrong response:** "We're 6 hours into Day 9, productive momentum, hours of focused work behind us..."

**Right response:** "Per the system context, today is Tuesday, April 28, 2026. Per your earlier message ('its only 950am here'), you started your session this morning. Reconciling against session continuity: today is Day 10 of build (yesterday April 27 was Day 9 per the log file `2026-04-27-day9-demo-sprint-day1.md`), Day 2 of demo sprint. I haven't checked time.gov this turn so I don't know precisely what time it is now. Want me to check?"

### Example 2 — Pacing claim

**User:** "How am I doing on pacing?"

**Wrong response:** "You've been at this many hours, the day has run long, you're approaching diminishing returns..."

**Right response:** "I don't have a reliable read on your current local time. You said it was '9:50am here' some turns back. If you tell me what time it is now, I can give you an honest pacing read. Otherwise I'd be making up the duration."

### Example 3 — Session log timestamping

**User:** "Write the close-out log."

**Right approach:** Before writing the log, check time.gov to anchor the timestamp. Write "Close-out log written 2026-04-28 at [actual time from time.gov] Eastern" rather than "written this evening" or "end of day."

### Example 4 — Date drift across days (Rule 6)

**Conversation history shows yesterday's events. User comes back after rest period. System-prompt date has not advanced.**

**User:** "Welcome to Wednesday."

**Wrong response:** "Per my system context, today is Tuesday — but you said Wednesday, so let me try to reconcile..." [continues using Tuesday as anchor while flagging confusion]

**Right response:** "Acknowledged — today is Wednesday. The system-prompt date was stale (still showed Tuesday). Reconciling: yesterday Tuesday was Sprint Day 2 / Build Day 10. Today Wednesday is Sprint Day 3 / Build Day 11. The demo is now N days closer than I was treating it. Updating all calendar-progression claims accordingly."

**The lesson:** when the user indicates a date flip, reconcile immediately. Don't try to "preserve" the system-prompt date or treat the user's correction as one signal among many. The user's lived calendar wins.

## What this skill does NOT do

- It does NOT enable continuous polling between turns (impossible — Claude has no continuous execution)
- It does NOT replace honest acknowledgment of uncertainty (the rule is "ground OR admit you can't")
- It does NOT require time.gov for every turn (only when time-pacing claims are made)
- It does NOT apply to abstract time references ("Phase 3," "the morning meeting") that don't make duration claims

## Relationship to other Claude principles

- **Trust over speed (Infera principle):** time imprecision is a form of speed-prioritized sloppiness. This skill is the anti-pattern correction.
- **Source-grounded reasoning (Principle 9):** time pacing claims need source-grounding the same way editorial claims do.
- **Honest acknowledgment over confident-sounding output:** "I don't know what time it is" is better than confabulating "you've been at this many hours."

## Maintenance

This skill should be updated if:

- New tools become available that improve time-grounding (e.g., a system-level current-time tool)
- A pattern of imprecise time claims surfaces despite the rule
- The user wants to add specific time-grounding requirements (e.g., always check time.gov at session start)

---

**Filed 2026-04-28 (Day 10 build / Day 2 demo sprint) in response to user-flagged pattern of imprecise time-pacing assertions during the demo sprint.**
