// Send guard: a PreToolUse hook for the resend MCP server.
// Claude Code passes the tool call as JSON on standard input.
// Exit 0 allows the call. Exit 2 blocks it, and what we print to stderr
// is shown to Claude as the reason.

const SEND_TOOLS = ["send-email", "send-batch-emails"];
const LIST_TOOLS = [
  "send-broadcast",
  "create-automation",
  "send-inbox-draft",
  "send-new-inbox-email",
];

function block(reason) {
  process.stderr.write(`Send guard blocked this: ${reason}\n`);
  process.exit(2);
}

// Pull the bare address out of "Name <addr@x.com>" or "addr@x.com".
function bareAddress(value) {
  const text = String(value).trim();
  const match = text.match(/<([^>]+)>/);
  return (match ? match[1] : text).trim().toLowerCase();
}

function addressesIn(message) {
  const found = [];
  for (const field of ["to", "cc", "bcc"]) {
    const value = message?.[field];
    if (value === undefined || value === null) continue;
    const list = Array.isArray(value) ? value : String(value).split(",");
    for (const item of list) {
      if (String(item).trim()) found.push(bareAddress(item));
    }
  }
  return found;
}

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let call;
  try {
    call = JSON.parse(raw);
  } catch {
    block("could not read the tool call, so it was stopped to be safe.");
  }

  // "mcp__resend__send-email" becomes "send-email".
  const tool = String(call.tool_name || "").replace(/^mcp__resend__/, "");
  const input = call.tool_input || {};

  if (LIST_TOOLS.includes(tool)) {
    block(`${tool} can reach whole lists of people, so it is never allowed in this studio.`);
  }

  if (SEND_TOOLS.includes(tool)) {
    const myEmail = String(process.env.MY_EMAIL || "").trim().toLowerCase();
    const messages = tool === "send-batch-emails" ? input.emails || [] : [input];

    for (const message of messages) {
      for (const address of addressesIn(message)) {
        const allowed =
          address.endsWith("@resend.dev") || (myEmail !== "" && address === myEmail);
        if (!allowed) {
          block(
            `${address} is not allowed. Emails may only go to @resend.dev test addresses or to your own email (MY_EMAIL).`
          );
        }
      }
    }
  }

  process.exit(0);
});
