export const config = { runtime: "edge" };

export default async function handler(req) {
  const TARGET_URL = process.env.TARGET_URL;

  if (!TARGET_URL) {
    return new Response("TARGET_URL not configured", { status: 500 });
  }

  const { pathname, search } = new URL(req.url);
  const targetUrl = `${TARGET_URL}${pathname}${search}`;

  return fetch(new Request(targetUrl, req));
}
