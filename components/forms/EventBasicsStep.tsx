"use client";

import React from "react";
import { useEventFormStore } from "@/store/useEventFormStore";
import { useRouter } from "next/navigation";

const EventBasicsStep = ({ onNext }: { onNext: () => void }) => {
    const router = useRouter();
    const { eventBasics, setEventBasics } = useEventFormStore();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 px-4">
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Event Details
        </h2>
        <p className="text-gray-500 mt-1">
          Tell us about your event
        </p>
      </div>

      {/* Event Name */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Event Name
        </label>
        <input
          type="text"
          placeholder="Name of the Event"
          value={eventBasics.eventName}
          onChange={(e) =>
            setEventBasics({ eventName: e.target.value })
          }
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Event Type */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Event Type
        </label>
        <select
          value={eventBasics.eventType}
          onChange={(e) =>
            setEventBasics({ eventType: e.target.value })
          }
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select event type</option>
          <option value="wedding">Wedding</option>
          <option value="corporate">Corporate</option>
          <option value="birthday">Birthday</option>
          <option value="concert">Concert</option>
        </select>
      </div>

      {/* Date Type */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">
          Event Date
        </label>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={eventBasics.dateType === "single"}
              onChange={() =>
                setEventBasics({ dateType: "single", endDate: "" })
              }
              className="accent-blue-600"
            />
            <span className="text-sm text-gray-700">Single Date</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={eventBasics.dateType === "range"}
              onChange={() =>
                setEventBasics({ dateType: "range" })
              }
              className="accent-blue-600"
            />
            <span className="text-sm text-gray-700">Date Range</span>
          </label>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            value={eventBasics.startDate}
            onChange={(e) =>
              setEventBasics({ startDate: e.target.value })
            }
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {eventBasics.dateType === "range" && (
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              value={eventBasics.endDate}
              onChange={(e) =>
                setEventBasics({ endDate: e.target.value })
              }
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {/* Location */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">
          Location
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="City"
            value={eventBasics.city}
            onChange={(e) =>
              setEventBasics({ city: e.target.value })
            }
            required
            className="rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="State"
            value={eventBasics.state}
            onChange={(e) =>
              setEventBasics({ state: e.target.value })
            }
            required
            className="rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Country"
            value={eventBasics.country}
            onChange={(e) =>
              setEventBasics({ country: e.target.value })
            }
            required
            className="rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Venue */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Venue (optional)
        </label>
        <input
          type="text"
          placeholder="Hotel, banquet hall, open ground..."
          value={eventBasics.venue}
          onChange={(e) =>
            setEventBasics({ venue: e.target.value })
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Next Button */}
      <button
        onClick={() => router.push("/event-details")}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Continue
      </button>
    </div>
    </div>
  );
};

export default EventBasicsStep;
