import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/coffees", () => {
    return HttpResponse.json([]);
  }),

  http.get("/api/user", () => {
    return HttpResponse.json({
      id: "test-user-id",
      email: "test@example.com",
      displayName: "Test User",
      subscriptionStatus: "free",
      createdAt: new Date().toISOString(),
    });
  }),
];
