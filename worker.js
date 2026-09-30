// worker.js
// The whole server. Read it before you deploy it.
//
// Four things to recognize here, because you will need to recognize them
// later in code you did not write:
//   env.DB      the D1 binding from wrangler.toml (no connection string, nothing to leak)
//   bind(?)     the user's value goes in as a parameter, never pasted into the SQL
//   status 400  the EARS "unwanted behavior" row, executable
//   CORS        headers that tell the browser your page is allowed to call this Worker

const CORS = {
  "access-control-allow-origin": "https://cuddly-space-zebra-5jrr75gjq76c79gg-5500.app.github.dev",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "content-type",
};

const ALLOWED_CATEGORIES = ["Food", "Landmark", "Views", "Activity"];

export default {
  async fetch(request, env) {
    // Anything that throws below becomes a readable 500 instead of a bare
    // "Error 1101: Worker threw exception". The message names the cause,
    // which is what your verification table needs.
    try {
      return await handle(request, env);
    } catch (err) {
      return new Response("server error: " + err.message, { status: 500, headers: CORS });
    }
  },
};

async function handle(request, env) {
  const url = new URL(request.url);

  // Browsers send an OPTIONS "preflight" before a JSON POST from another
  // origin. Answer it with the CORS headers and nothing else.
  // (Not on the Session B slide; it is the one line the slide left out.)
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }

  // The most common Session B failure: the D1 binding did not attach because
  // wrangler.toml still says PASTE_ID_HERE or the id was pasted badly.
  if (!env.DB) {
    return new Response(
      "server error: no D1 binding. Check database_id in wrangler.toml and redeploy.",
      { status: 500, headers: CORS });
  }

  if (request.method === "GET" && url.pathname === "/entries") {
    const { results } = await env.DB.prepare(
      "SELECT * FROM entries ORDER BY id").all();
    return Response.json(results, { headers: CORS });
  }

    if (request.method === "POST" && url.pathname === "/entries") {
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response("body must be JSON", { status: 400, headers: CORS });
    }
    if (!body.text || !body.text.trim()) {
      return new Response("text must not be empty", { status: 400, headers: CORS });
    }
    if (!ALLOWED_CATEGORIES.includes(body.category)) {
      return new Response(
        "category must be one of: " + ALLOWED_CATEGORIES.join(", "),
        { status: 400, headers: CORS });
    }
    const result = await env.DB.prepare("INSERT INTO entries (text, category) VALUES (?, ?)")
      .bind(body.text, body.category).run();
    return new Response(JSON.stringify({ id: result.meta.last_row_id }), {
      status: 201,
      headers: { ...CORS, "content-type": "application/json" },
    });
  }
    
  return new Response("not found", { status: 404, headers: CORS });
}
