import { create } from "zustand";

/* EVENT BASICS (STEP 1) */

type EventDateType = "single" | "range";

interface EventBasics {
  eventName: string;
  eventType: string;
  dateType: EventDateType;
  startDate: string;
  endDate?: string;
  city: string;
  state: string;
  country: string;
  venue?: string;
}

/*EVENT DETAILS (STEP 2)*/

type HireType = "planner" | "performer" | "crew" | "";

interface PlannerDetails {
  scope: string;              // full / partial / on-day
  budgetMin: string;
  budgetMax: string;
  experienceYears: string;
  theme?: string;
}

interface PerformerDetails {
  performerType: string;     
  genre: string;
  duration: string;
  equipmentRequired: boolean;
  budgetMin: string;
  budgetMax: string;
}

interface CrewDetails {
  crewType: string;           // sound, lighting, etc.
  count: string;
  hours: string;
  equipmentBy: string;
  budget: string;
}

/* STORE INTERFACE*/

interface EventFormStore {
  // Step 1
  eventBasics: EventBasics;
  setEventBasics: (data: Partial<EventBasics>) => void;

  // Step 2
  hireType: HireType;
  plannerDetails: PlannerDetails;
  performerDetails: PerformerDetails;
  crewDetails: CrewDetails;

  setHireType: (type: HireType) => void;
  setPlannerDetails: (data: Partial<PlannerDetails>) => void;
  setPerformerDetails: (data: Partial<PerformerDetails>) => void;
  setCrewDetails: (data: Partial<CrewDetails>) => void;

  // Utility
  resetForm: () => void;
}

/*STORE IMPLEMENTATION*/

export const useEventFormStore = create<EventFormStore>((set) => ({
  /* -------- Step 1 -------- */
  eventBasics: {
    eventName: "",
    eventType: "",
    dateType: "single",
    startDate: "",
    endDate: "",
    city: "",
    state: "",
    country: "",
    venue: "",
  },

  setEventBasics: (data) =>
    set((state) => ({
      eventBasics: { ...state.eventBasics, ...data },
    })),

  /* -------- Step 2 -------- */
  hireType: "",

  plannerDetails: {
    scope: "",
    budgetMin: "",
    budgetMax: "",
    experienceYears: "",
    theme: "",
  },

  performerDetails: {
    performerType: "",
    genre: "",
    duration: "",
    equipmentRequired: false,
    budgetMin: "",
    budgetMax: "",
  },

  crewDetails: {
    crewType: "",
    count: "",
    hours: "",
    equipmentBy: "",
    budget: "",
  },

  setHireType: (type) => set({ hireType: type }),

  setPlannerDetails: (data) =>
    set((state) => ({
      plannerDetails: { ...state.plannerDetails, ...data },
    })),

  setPerformerDetails: (data) =>
    set((state) => ({
      performerDetails: { ...state.performerDetails, ...data },
    })),

  setCrewDetails: (data) =>
    set((state) => ({
      crewDetails: { ...state.crewDetails, ...data },
    })),

  /* -------- Reset -------- */
  resetForm: () =>
    set({
      eventBasics: {
        eventName: "",
        eventType: "",
        dateType: "single",
        startDate: "",
        endDate: "",
        city: "",
        state: "",
        country: "",
        venue: "",
      },
      hireType: "",
      plannerDetails: {
        scope: "",
        budgetMin: "",
        budgetMax: "",
        experienceYears: "",
        theme: "",
      },
      performerDetails: {
        performerType: "",
        genre: "",
        duration: "",
        equipmentRequired: false,
        budgetMin: "",
        budgetMax: "",
      },
      crewDetails: {
        crewType: "",
        count: "",
        hours: "",
        equipmentBy: "",
        budget: "",
      },
    }),
}));
