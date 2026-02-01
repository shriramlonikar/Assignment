import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

interface JwtPayload {
  id: string;
}

export const getUserFromToken = async () => {
  try {
    //Get token from cookies
    const cookieStore = cookies();
    console.log("Cookies:", (await cookieStore).getAll());
    const token = (await cookieStore).get("token")?.value;

    if (!token) return null;

    //Verify token
    const decoded = jwt.verify(
      token,
      process.env.PASSWORD_SALT!
    ) as JwtPayload;

    if (!decoded?.id) return null;

    //Connect DB & fetch user
    await connectDB();

    const user = await User.findById(decoded.id).select("-password");

    if (!user) return null;

    return user;
  } catch (error) {
    return null;
  }
};
