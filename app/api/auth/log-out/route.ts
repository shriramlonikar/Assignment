import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
    response.cookies.set("token", "", { maxAge: 0 });
    return response;
}