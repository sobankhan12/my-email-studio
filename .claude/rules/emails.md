---
paths:
  - "campaigns/**/emails/*.md"
---

# Rules for every email file

Every email file in any campaign's `emails/` folder must follow these rules. Each file holds one finished email, ready to send. Don't add extra subject options, notes or comments.

1. **Subject line first.** Line 1 is `Subject: ...`. The subject text after "Subject: " is 50 characters or fewer.
2. **Preview line second.** Line 2 is `Preview: ...`. The preview text after "Preview: " is 90 characters or fewer.
3. **Personal greeting.** Greet the reader with `{{first_name}}`, for example "Assalam-o-Alaikum {{first_name}},".
4. **Exactly one link.** The email has one main link and no others, written like this:
   `[Button text](https://gulahmed.example/winter)`
5. **Sign-off from `brand/voice.md`.** End the email with:

   Sardiyon ki mohabbat ke saath,
   Team Gul Ahmed

6. **Footer last, as plain text.** After the sign-off, end with these two lines exactly. Write them as normal text, never inside a code block:

   You're getting this because you joined the Gul Ahmed mailing list.
   Gul Ahmed, {{company_address}} · Unsubscribe: {{unsubscribe_url}}

Leave `{{first_name}}`, `{{company_address}}` and `{{unsubscribe_url}}` exactly as written. They're filled in when the email is sent.
