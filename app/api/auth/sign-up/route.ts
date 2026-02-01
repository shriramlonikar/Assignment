import User from "@/models/User";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
    try {

        await connectDB();

        const { email, password, username } = await req.json();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await User.hashPassword(password);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            username,
        });


        const token = newUser.generateJWT();
        const response = NextResponse.json({ message: "User created successfully" }, { status: 201 });

        response.cookies.set({
        name: "token",
        value: token,
        secure: false,
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
        });

        return response;

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ message: "Internal Server Error", error: errorMessage }, { status: 500 });
    }
} 
