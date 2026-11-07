---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize campaign emails per lead group

Campaign folder: $ARGUMENTS

## 1. Check the input

If no campaign folder was given above (it's empty), **stop**. Use Glob on `campaigns/*/` to list the campaign folders that exist, reply with that list and a one-line example such as `/personalize campaigns/winter-2026-launch`, and write nothing.

If the folder has no `emails/` folder or no `.md` files in it, stop and say so.

## 2. Gather what you need

1. Read `leads/leads.csv` and find the distinct values in the `group` column. Today these are `unstitched-lovers`, `ready-to-wear` and `family-gifting`, but always use what the file says.
2. Read `leads/CLAUDE.md` for a one-line description of each group, if it has one. If not, use these:
   - `unstitched-lovers`: buy fabric and have it stitched to their own design.
   - `ready-to-wear`: want a finished outfit without visiting a tailor.
   - `family-gifting`: shop winter gifts for parents, siblings and in-laws.
3. Read `brand/voice.md` (voice, words to use and avoid, claims we never make) and `.claude/rules/emails.md` (the email format).
4. Use Glob to list `<campaign folder>/emails/*.md`, and read each email.

## 3. Write one version per group

For every email and every group, write a copy to:

`<campaign folder>/groups/<group>/emails/<same file name>`

Each copy must be the original email with **only two changes**:
1. **The opening line:** the first sentence after the `{{first_name}}` greeting, rewritten so it speaks to that group.
2. **One example:** one sentence or bullet in the body that gives an example, swapped for one that fits that group.

Keep everything else exactly the same, character for character: the `Subject:` and `Preview:` lines, the greeting, the structure, every other sentence, the one link, the sign-off and the footer. Leave every `{{placeholder}}` as written.

Every copy must still follow `.claude/rules/emails.md` and `brand/voice.md`. Don't add a word or claim that `brand/voice.md` forbids, and don't add prices, offers or delivery promises the original doesn't make.

## 4. Reply with a short summary only

Don't paste the emails back. Reply with:
- how many files you wrote (emails × groups), and
- one example opening line per group.
