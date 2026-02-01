import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );

  response.cookies.set({
    name: "token",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    path: "/",       // MUST match
    secure: false,   // MUST match
    maxAge: 0,       // delete
  });

  return response;
}
