import mongoose, { Schema, Document } from "mongoose";

//SUB SCHEMAS 

// Event Basics (Step 1)
const EventBasicsSchema = new Schema(
  {
    eventName: { type: String, required: true },
    eventType: { type: String, required: true },

    dateType: {
      type: String,
      enum: ["single", "range"],
      required: true,
    },

    startDate: { type: Date, required: true },
    endDate: { type: Date },

    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },

    venue: { type: String },
  },
  { _id: false }
);

// Planner Details
const PlannerDetailsSchema = new Schema(
  {
    scope: {
      type: String,
      enum: ["full", "partial", "on-day"],
      required: true,
    },
    budgetMin: { type: Number },
    budgetMax: { type: Number },
    experienceYears: { type: Number },
    theme: { type: String },
  },
  { _id: false }
);

// Performer Details
const PerformerDetailsSchema = new Schema(
  {
    performerType: {
      type: String,
      enum: ["dj", "singer", "band", "anchor", "dancer"],
      required: true,
    },
    genre: { type: String },
    duration: { type: String },
    equipmentRequired: { type: Boolean, default: false },
    budgetMin: { type: Number },
    budgetMax: { type: Number },
  },
  { _id: false }
);

// Crew Details
const CrewDetailsSchema = new Schema(
  {
    crewType: {
      type: String,
      enum: ["sound", "lighting", "stage", "security", "helpers"],
      required: true,
    },
    count: { type: Number },
    hours: { type: String },
    equipmentBy: { type: String },
    budget: { type: Number },
  },
  { _id: false }
);

//MAIN DOCUMENT */

export interface EventRequirementDocument extends Document {
  eventBasics: typeof EventBasicsSchema;
  hireType: "planner" | "performer" | "crew";
  plannerDetails?: typeof PlannerDetailsSchema;
  performerDetails?: typeof PerformerDetailsSchema;
  crewDetails?: typeof CrewDetailsSchema;
  createdBy: mongoose.Types.ObjectId;
  status: "open" | "assigned" | "closed";
}

const EventRequirementSchema = new Schema(
  {
    eventBasics: {
      type: EventBasicsSchema,
      required: true,
    },

    hireType: {
      type: String,
      enum: ["planner", "performer", "crew"],
      required: true,
    },

    plannerDetails: {
      type: PlannerDetailsSchema,
    },

    performerDetails: {
      type: PerformerDetailsSchema,
    },

    crewDetails: {
      type: CrewDetailsSchema,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["open", "assigned", "closed"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.EventRequirement ||
  mongoose.model<EventRequirementDocument>(
    "EventRequirement",
    EventRequirementSchema
  );
