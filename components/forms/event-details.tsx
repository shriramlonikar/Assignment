"use client";

import React from "react";
import { useEventFormStore } from "@/store/useEventFormStore";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const EventDetailsStep = () => {
  const router = useRouter();

  const {
    hireType,
    setHireType,
    plannerDetails,
    performerDetails,
    crewDetails,
    setPlannerDetails,
    setPerformerDetails,
    setCrewDetails,
    resetForm,
  } = useEventFormStore();

  const handleSubmit = async () => {
    try {
      //Get complete form data from Zustand
      const data = useEventFormStore.getState();

      //Call backend API
      await axios.post("/api/event-requirements", data, { withCredentials: true });

      //Success feedback
      toast.success("Event requirement submitted successfully");

      //Reset form store
      resetForm();

      //Redirect
      router.push("/Dashboard");

    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to submit requirement"
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Who do you want to hire?
        </h2>
        <p className="text-gray-500 mt-1">
          Choose the type of professional you are looking for
        </p>
      </div>

      {/* Hire Type */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Event Planner", value: "planner" },
          { label: "Performer", value: "performer" },
          { label: "Crew", value: "crew" },
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setHireType(item.value as any)}
            className={`border rounded-xl py-4 font-medium transition
              ${
                hireType === item.value
                  ? "border-blue-600 bg-blue-50 text-blue-600"
                  : "border-gray-300 hover:border-blue-400"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ================= PLANNER ================= */}
      {hireType === "planner" && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Planner Requirements</h3>

          <select
            value={plannerDetails.scope}
            onChange={(e) => setPlannerDetails({ scope: e.target.value })}
            className="w-full rounded-lg border px-4 py-2.5"
          >
            <option value="">Planning Scope</option>
            <option value="full">Full Planning</option>
            <option value="partial">Partial Planning</option>
            <option value="on-day">On-Day Coordination</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Min Budget"
              value={plannerDetails.budgetMin}
              onChange={(e) => setPlannerDetails({ budgetMin: e.target.value })}
              className="rounded-lg border px-4 py-2.5"
            />
            <input
              placeholder="Max Budget"
              value={plannerDetails.budgetMax}
              onChange={(e) => setPlannerDetails({ budgetMax: e.target.value })}
              className="rounded-lg border px-4 py-2.5"
            />
          </div>

          <input
            placeholder="Experience (years)"
            value={plannerDetails.experienceYears}
            onChange={(e) =>
              setPlannerDetails({ experienceYears: e.target.value })
            }
            className="w-full rounded-lg border px-4 py-2.5"
          />

          <input
            placeholder="Theme / Style (optional)"
            value={plannerDetails.theme}
            onChange={(e) => setPlannerDetails({ theme: e.target.value })}
            className="w-full rounded-lg border px-4 py-2.5"
          />
        </div>
      )}

      {/* ================= PERFORMER ================= */}
      {hireType === "performer" && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Performer Requirements</h3>

          <select
            value={performerDetails.performerType}
            onChange={(e) =>
              setPerformerDetails({ performerType: e.target.value })
            }
            className="w-full rounded-lg border px-4 py-2.5"
          >
            <option value="">Performer Type</option>
            <option value="dj">DJ</option>
            <option value="singer">Singer</option>
            <option value="band">Band</option>
            <option value="anchor">Anchor</option>
            <option value="dancer">Dancer</option>
          </select>

          <input
            placeholder="Genre / Style"
            value={performerDetails.genre}
            onChange={(e) => setPerformerDetails({ genre: e.target.value })}
            className="w-full rounded-lg border px-4 py-2.5"
          />

          <input
            placeholder="Performance Duration"
            value={performerDetails.duration}
            onChange={(e) => setPerformerDetails({ duration: e.target.value })}
            className="w-full rounded-lg border px-4 py-2.5"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={performerDetails.equipmentRequired}
              onChange={(e) =>
                setPerformerDetails({
                  equipmentRequired: e.target.checked,
                })
              }
            />
            Equipment Required
          </label>

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Min Budget"
              value={performerDetails.budgetMin}
              onChange={(e) =>
                setPerformerDetails({ budgetMin: e.target.value })
              }
              className="rounded-lg border px-4 py-2.5"
            />
            <input
              placeholder="Max Budget"
              value={performerDetails.budgetMax}
              onChange={(e) =>
                setPerformerDetails({ budgetMax: e.target.value })
              }
              className="rounded-lg border px-4 py-2.5"
            />
          </div>
        </div>
      )}

      {/* ================= CREW ================= */}
      {hireType === "crew" && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Crew Requirements</h3>

          <select
            value={crewDetails.crewType}
            onChange={(e) => setCrewDetails({ crewType: e.target.value })}
            className="w-full rounded-lg border px-4 py-2.5"
          >
            <option value="">Crew Category</option>
            <option value="sound">Sound</option>
            <option value="lighting">Lighting</option>
            <option value="stage">Stage</option>
            <option value="security">Security</option>
            <option value="helpers">Helpers</option>
          </select>

          <input
            placeholder="Number of people"
            value={crewDetails.count}
            onChange={(e) => setCrewDetails({ count: e.target.value })}
            className="w-full rounded-lg border px-4 py-2.5"
          />

          <input
            placeholder="Working hours"
            value={crewDetails.hours}
            onChange={(e) => setCrewDetails({ hours: e.target.value })}
            className="w-full rounded-lg border px-4 py-2.5"
          />

          <input
            placeholder="Equipment responsibility"
            value={crewDetails.equipmentBy}
            onChange={(e) => setCrewDetails({ equipmentBy: e.target.value })}
            className="w-full rounded-lg border px-4 py-2.5"
          />

          <input
            placeholder="Budget"
            value={crewDetails.budget}
            onChange={(e) => setCrewDetails({ budget: e.target.value })}
            className="w-full rounded-lg border px-4 py-2.5"
          />
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-6 border-t">
        <button
          type="button"
          disabled={!hireType}
          onClick={handleSubmit}
          className={`w-full py-3 rounded-lg font-semibold transition
            ${
              hireType
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Submit Requirement
        </button>
      </div>
    </div>
  );
};

export default EventDetailsStep;
