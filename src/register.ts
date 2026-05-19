// Registry self-registration helper. Self-contained, no external dependencies.
// Works on Bun + Node 20+ (uses WebCrypto subtle for HMAC).

export interface RegisterOpts {
  fqdn: string;
  parent_fqdn?: string;
  name: string;
  description?: string;
  widget_url?: string;
  data?: unknown;
  registry_url: string;
  signing_secret: string;
}

export type RegisterResult =
  | { ok: true; body: unknown }
  | { ok: false; error: string };

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  const bytes = new Uint8Array(sig);
  let hex = "";
  for (const b of bytes) hex += b.toString(16).padStart(2, "0");
  return hex;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function registerWithRegistry(
  opts: RegisterOpts,
): Promise<RegisterResult> {
  const payload: Record<string, unknown> = { name: opts.name };
  if (opts.parent_fqdn !== undefined) payload.parent_fqdn = opts.parent_fqdn;
  if (opts.description !== undefined) payload.description = opts.description;
  if (opts.widget_url !== undefined) payload.widget_url = opts.widget_url;
  if (opts.data !== undefined) payload.data = opts.data;

  const body = JSON.stringify(payload);
  const sig = await hmacSha256Hex(opts.signing_secret, body);
  const url = `${opts.registry_url.replace(/\/+$/, "")}/manifest/${opts.fqdn}`;

  const delays = [1000, 2000, 4000];
  let lastError = "unknown error";

  console.log(`[registry] registering ${opts.fqdn} at ${opts.registry_url}...`);

  for (let attempt = 0; attempt < delays.length; attempt++) {
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "x-signature": `sha256=${sig}`,
        },
        body,
      });

      if (res.ok) {
        const respBody = await res.json().catch(() => ({}));
        console.log(`[registry] registering ${opts.fqdn} ... ok`);
        return { ok: true, body: respBody };
      }

      const text = await res.text().catch(() => "");
      lastError = `HTTP ${res.status} ${res.statusText} ${text}`.trim();

      if (res.status >= 400 && res.status < 500) {
        console.log(`[registry] registering ${opts.fqdn} ... failed: ${lastError}`);
        return { ok: false, error: lastError };
      }
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
    }

    if (attempt < delays.length - 1) {
      await sleep(delays[attempt]);
    }
  }

  console.log(`[registry] registering ${opts.fqdn} ... failed: ${lastError}`);
  return { ok: false, error: lastError };
}
