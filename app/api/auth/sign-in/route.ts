import User from "@/models/User";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request){
    try{

        // Ensure DB connection
        await connectDB();

        const {email, password} = await req.json();

        const user = await User.findOne({email}).select("+password");
        if(!user) return NextResponse.json({message: "User Not Found"}, {status: 401});

        const isPasswordValid = await user.isValidPassword(password);
        if(!isPasswordValid) return NextResponse.json({message: "Invalid Credentials"}, {status: 401});

        const token = user.generateJWT();
        
        const response = NextResponse.json({message: "Sign-In Successful"}, {status: 200});
        // console.log(token);
        response.cookies.set({
            name: "token",
            value: token,
            httpOnly: true, 
            sameSite: "lax",
            path: "/", 
            secure: false,
            maxAge: 60 * 60 * 24, // 1 day
        });

        return response;

    } catch(error: unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({message: "Internal Server Error", error: errorMessage}, {status: 500} );
    }
}