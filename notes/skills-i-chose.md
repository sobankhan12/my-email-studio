# Skills I chose

Researched on 5 November 2026 by searching skills.sh for "email marketing", "email sequence", "campaign plan" and "resend". Star counts come from GitHub on the same day. Nothing is installed yet.

## Use these

**1. For writing campaigns: `anthropics/knowledge-work-plugins`**
- Published by Anthropic, the company that makes Claude. This is their official GitHub organization.
- About 34,800 stars and 3,800 forks. It has an open license (Apache-2.0) and was updated this week.
- The skills to start with are `campaign-plan`, `email-sequence` and `draft-content`. Together they cover planning a campaign, laying out a series of emails, and writing the copy.
- Install one with: `npx skills add anthropics/knowledge-work-plugins@campaign-plan`

**2. For sending email: `resend/resend-skills`**
- Published by Resend, the email-sending service itself, from its official GitHub organization.
- About 212 stars, MIT license, updated this week. The star count is modest, but that's normal for a company's own add-on. It's the official source, and that matters more.
- The main skill is `resend`. The same repo also includes `email-best-practices` (deliverability, unsubscribe rules and so on) and `react-email` (building nicely formatted emails).
- Install with: `npx skills add resend/resend-skills@resend`

A strong runner-up for campaign writing is `coreyhaines31/marketingskills`, with about 58,600 stars, an MIT license and very high install counts. It's well regarded, but it's one person's project rather than an official publisher, so I'd use it as a second opinion and not as the foundation.

## Avoid these

**1. `mbfinotti/sales-skills`** (shows about 33,000 installs per skill)
- Only 3 stars and 0 forks on GitHub, and the repo was created in September 2026, about two months ago.
- Tens of thousands of installs with almost no stars doesn't add up. Install counts on skills.sh can be inflated, and this pattern suggests they were.
- It's also aimed at cold sales outreach, not marketing to your own subscribers.

**2. `caffeinelabs/skills`** (`extension-email-marketing` shows about 30,000 installs)
- Only 2 stars, 1 fork, and no description on the repo.
- Two different skills (`extension-email-marketing` and `extension-email`) show the same 30K install count, which is another sign of padded numbers.
- The repo contains 73 script files plus skills that connect to Gmail and OpenAI. Code that runs and touches your accounts needs the most trust, and this publisher hasn't earned it.

## How I decided

Check these three things before installing any skill:

1. **Who publishes it?** Look at the name before the slash (`anthropics/...`, `resend/...`). Prefer the company that makes the tool, or a well-known author. Click through to GitHub and make sure it's a real organization with a history, not a brand-new account with a similar-looking name.
2. **Do the stars match the installs?** Installs on skills.sh are easy to inflate. GitHub stars, forks and repo age are harder to fake. Thousands of installs with only a handful of stars is a red flag.
3. **What will it actually run?** Open the `SKILL.md` and look for script files before installing. A skill that's only written instructions is low risk. One that runs code, asks for API keys or connects to your email account needs a publisher you trust, an open license, and recent updates.
