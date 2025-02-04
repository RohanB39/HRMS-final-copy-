import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const localizer = momentLocalizer(moment);

const LeaveCalender = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "John Doe - Vacation",
      start: new Date(2025, 0, 15),
      end: new Date(2025, 0, 20),
      type: "Approved",
    },
    {
      id: 2,
      title: "Pending: Jane Smith - Sick Leave",
      start: new Date(2025, 0, 22),
      end: new Date(2025, 0, 24),
      type: "Pending",
    },
    {
      id: 3,
      title: "Public Holiday - Republic Day",
      start: new Date(2025, 0, 26),
      end: new Date(2025, 0, 26),
      type: "Holiday",
    },
  ]);

  const [filters, setFilters] = useState({
    department: "All",
    leaveType: "All",
    dateRange: [null, null],
  });

  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventStyleGetter = (event) => {
    let backgroundColor = "#ddd";
    let borderColor = "#ccc";

    if (event.type === "Approved") {
      backgroundColor = "green";
      borderColor = "darkgreen";
    } else if (event.type === "Pending") {
      backgroundColor = "orange";
      borderColor = "darkorange";
    } else if (event.type === "Holiday") {
      backgroundColor = "gray";
      borderColor = "darkgray";
    }

    // Adjust for dark theme
    if (document.documentElement.classList.contains("dark")) {
      backgroundColor = event.type === "Approved" ? "#2d6a4f" : backgroundColor;
      borderColor = "#ccc"; // Adjust border for dark theme
    }

    return {
      style: {
        backgroundColor,
        color: "#fff",
        borderRadius: "5px",
        border: `1px solid ${borderColor}`,
        padding: "5px",
      },
    };
  };

  const dayPropGetter = () => ({
    style: {
      height: "100px",
      width: "120px",
      border: "1px solid",
      borderColor: document.documentElement.classList.contains("dark")
        ? "#444"
        : "#ccc",
      backgroundColor: document.documentElement.classList.contains("dark")
        ? "#1f2937"
        : "#fff",
      color: document.documentElement.classList.contains("dark")
        ? "#fff"
        : "#000",
    },
  });

  return (
    <div className="font-Work font-normal">
      {/* Header */}
      <header className="mt-12 mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-darkAccent3 leading-tight">
          Leave Calendar
        </h2>
        <p className="text-sm text-gray-600 dark:text-darkMuted w-[80%] mt-2">
          View and manage all employee leaves and holidays
        </p>
      </header>
      <hr className="mb-4 dark:border-darkDevider" />

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {/* Filters Code Remains the Same */}
      </div>

      {/* Calendar */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "500px" }}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayPropGetter}
        onSelectEvent={(event) => setSelectedEvent(event)}
        tooltipAccessor={(event) => `${event.title}`}
        className="dark:bg-darknavbarBg dark:border-darkDevider border"
      />

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed top-1/2 left-1/2 bg-white dark:bg-darknavbarBg transform -translate-x-1/2 -translate-y-1/2 p-5 rounded shadow-lg">
          <h3 className="text-blue-500">{selectedEvent.title}</h3>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Start:</strong> {selectedEvent.start.toLocaleDateString()}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>End:</strong> {selectedEvent.end.toLocaleDateString()}
          </p>
          <button
            onClick={() => setSelectedEvent(null)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default LeaveCalender;
