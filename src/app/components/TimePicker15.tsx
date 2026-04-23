import React from "react";

type TimePicker15Props = {
  value: string;
  onChange: (value: string) => void;
};

const minuteOptions = ["00", "15", "30", "45"];

function parseTime(value: string) {
  // Parse stored 24-hour HH:MM into values suitable for the 12-hour picker UI.
  const match = value.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) {
    // Fallback for empty/invalid time values.
    return { hour12: "12", minute: "00", period: "AM" as const };
  }

  const hour24 = Number(match[1]);
  const minuteRaw = match[2];
  const period: "AM" | "PM" = hour24 >= 12 ? "PM" : "AM";
  const hour12 = String(hour24 % 12 || 12).padStart(2, "0");
  // Clamp minute to our allowed increments only.
  const minute = minuteOptions.includes(minuteRaw) ? minuteRaw : "00";
  return { hour12, minute, period };
}

function to24Hour(hour12: string, minute: string, period: "AM" | "PM") {
  // Convert picker UI values back into storage format (HH:MM, 24-hour).
  let hour = Number(hour12) % 12;
  if (period === "PM") {
    hour += 12;
  }
  return `${String(hour).padStart(2, "0")}:${minute}`;
}

export function TimePicker15({ value, onChange }: TimePicker15Props) {
  const { hour12, minute, period } = parseTime(value);

  // Centralized updater so any dropdown change emits a consistent HH:MM value.
  const update = (
    nextHour12: string = hour12,
    nextMinute: string = minute,
    nextPeriod: "AM" | "PM" = period,
  ) => {
    onChange(to24Hour(nextHour12, nextMinute, nextPeriod));
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      <select
        value={hour12}
        onChange={(event) => update(event.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        {Array.from({ length: 12 }, (_, idx) => String(idx + 1).padStart(2, "0")).map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </select>

      <select
        value={minute}
        onChange={(event) => update(hour12, event.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        {/* Only allow 15-minute increments in UI. */}
        {minuteOptions.map((minuteOption) => (
          <option key={minuteOption} value={minuteOption}>
            {minuteOption}
          </option>
        ))}
      </select>

      <select
        value={period}
        onChange={(event) => update(hour12, minute, event.target.value as "AM" | "PM")}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
}
