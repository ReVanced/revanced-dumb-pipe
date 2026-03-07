export const config = { runtime: "edge" };

export default async function handler(req: Request) {
	const TARGET_URL = process.env.TARGET_URL;

	if (!TARGET_URL) {
		return new Response("TARGET_URL not configured", { status: 500 });
	}

	const { pathname, search } = new URL(req.url);
	const targetUrl = `${TARGET_URL}${pathname}${search}`;

	const CF_ACCESS_CLIENT_ID = process.env.CF_ACCESS_CLIENT_ID;
	const CF_ACCESS_CLIENT_SECRET = process.env.CF_ACCESS_CLIENT_SECRET;

	var newHeaders = new Headers(req.headers);
	if (CF_ACCESS_CLIENT_ID && CF_ACCESS_CLIENT_SECRET) {
		newHeaders.set("CF-Access-Client-Id", CF_ACCESS_CLIENT_ID);
		newHeaders.set("CF-Access-Client-Secret", CF_ACCESS_CLIENT_SECRET);
	}

	return fetch(new Request(targetUrl, { ...req, headers: newHeaders }));
}
