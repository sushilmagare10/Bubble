import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in", "/sign-up", "/api(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    const { userId } = auth();

    if (!userId) {
      return auth().redirectToSignIn({ returnBackUrl: req.url });
    }

    // Check if user exists in your database
    const host = req.headers.get("host");
    const protocol = req.headers.get("x-forwarded-proto") ?? "http";
    const baseUrl = `${protocol}://${host}`;
    const response = await fetch(`${baseUrl}/api/check-user`, {
      headers: {
        "x-user-id": userId,
      },
    });

    const { exists } = await response.json();

    if (!exists && !req.url.includes("/sign-up")) {
      return Response.redirect(`${baseUrl}/sign-up`, 302);
    }
  }
});


export const config = {
    matcher: ["/((?!.*\\..*|_next|api|sign-in|sign-up).*)", "/"],
  };