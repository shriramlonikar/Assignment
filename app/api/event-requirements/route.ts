import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getUserFromToken } from "@/lib/getUserFromToken";
import EventRequirement from "@/models/EventRequirement";

export async function POST(req: Request) {
  try {
    //Authenticate user
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    //Parse request body
    const body = await req.json();

    const {
      eventBasics,
      hireType,
      plannerDetails,
      performerDetails,
      crewDetails,
    } = body;

    if (!eventBasics || !hireType) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    //Connect DB
    await connectDB();

    //Build payload (important part)
    const payload: any = {
      eventBasics: {
        ...eventBasics,
        startDate: new Date(eventBasics.startDate),
        endDate: eventBasics.endDate
          ? new Date(eventBasics.endDate)
          : undefined,
      },
      hireType,
      createdBy: user._id,
    };

    // 5️⃣ Attach correct details based on hireType
    if (hireType === "planner") {
      payload.plannerDetails = {
        scope: plannerDetails.scope,
        budgetMin: Number(plannerDetails.budgetMin),
        budgetMax: Number(plannerDetails.budgetMax),
        experienceYears: Number(plannerDetails.experienceYears),
        theme: plannerDetails.theme,
      };
    }

    if (hireType === "performer") {
      payload.performerDetails = {
        performerType: performerDetails.performerType,
        genre: performerDetails.genre,
        duration: performerDetails.duration,
        equipmentRequired: performerDetails.equipmentRequired,
        budgetMin: Number(performerDetails.budgetMin),
        budgetMax: Number(performerDetails.budgetMax),
      };
    }

    if (hireType === "crew") {
      payload.crewDetails = {
        crewType: crewDetails.crewType,
        count: Number(crewDetails.count),
        hours: crewDetails.hours,
        equipmentBy: crewDetails.equipmentBy,
        budget: Number(crewDetails.budget),
      };
    }

    // 6️⃣ Save to DB
    const requirement = await EventRequirement.create(payload);

    return NextResponse.json(
      {
        message: "Event requirement created successfully",
        id: requirement._id,
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Create requirement error:", error);

    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
