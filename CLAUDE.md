# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

An email marketing studio built step by step for the "Email Studio Lab" course (CCAR-F exam prep). The studio plans and writes email campaigns for a small business. The full course, with every build and check prompt and a progress table, is in `assignment.md`. Read the relevant step there before doing course work.

The brand is **Gul Ahmed's winter collection** ("Charm of Winter 2026"), used as a practice exercise in place of the course's sample Kettlebird Tea brand. Research is in `notes/gul-ahmed-brief.md`. The swap table at the top of `assignment.md` maps the course's Kettlebird wording (names, folder paths, lead groups, link, footer) to Gul Ahmed. Apply it whenever a pasted prompt still says Kettlebird or The Steep Club.

## How course work runs

Each step has a **build** prompt and a **check** prompt. The check runs in a fresh session so the reviewer didn't write the work.
- **In a build session:** do what the prompt says, nothing extra, and commit when it asks.
- **In a check session:** test, don't just read. Measure with commands (character counts, link counts, `git check-ignore`, `diff`). Report in the table format the prompt asks for, and **change no files** unless the prompt says otherwise.
- After a step is done, tick it in the progress table in `assignment.md`.

## Rules

- Write in plain English. The user is learning and isn't a programmer.
- Never send email to real people. Lead addresses use `@example.com`, links use a `.example` domain (`https://gulahmed.example/winter`), and sends go only to `@resend.dev` test addresses or the user's own `MY_EMAIL`. A PreToolUse hook enforces this from Step 10.
- Gul Ahmed is a real company. Don't present drafts as official Gul Ahmed mail, and don't publish them.
- Don't state prices, discounts, free shipping or refund promises the brief doesn't support. Shipping is a flat PKR 249, and there are no cash refunds.
- Ask before deleting anything.
- `.claude/settings.local.json` is personal (it holds `MY_EMAIL`) and must never be committed. Team settings go in `.claude/settings.json` and `.mcp.json`.

## Layout as the course builds it

The tree in `assignment.md` ("Your studio at the end") is the target. Where things live is a big part of the lesson:
- Root `CLAUDE.md` imports `@brand/voice.md`, so the brand voice loads in every session (Step 3).
- `leads/CLAUDE.md` holds rules that load only when working in `leads/` (Step 5).
- `.claude/rules/emails.md` uses a `paths:` pattern so its format rules attach only to `campaigns/**/emails/*.md` (Step 6).
- Campaign emails live in `campaigns/<campaign>/emails/`, with per-group copies in `campaigns/<campaign>/groups/<group>/emails/`, written by the `personalize` skill (Step 8).

## Commands

- Search for skills: `npx skills find <words>`. Don't install anything without the user's go-ahead.
- Run the practice email server (Steps 9–11, in a second terminal): `npx emulate@0.12.3 start --service resend`, serving `http://localhost:4000`.
- Run the automatic review (from Step 13): `node scripts/review.mjs campaigns/<campaign>`. It exits with code 1 on any high-severity finding.

Environment: Windows with Git Bash. Node 24 is installed. The GitHub CLI (`gh`) isn't installed, so use the GitHub REST API for repo lookups.
