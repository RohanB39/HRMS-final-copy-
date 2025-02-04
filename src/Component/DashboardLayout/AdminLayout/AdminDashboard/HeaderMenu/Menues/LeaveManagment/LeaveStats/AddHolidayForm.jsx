import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { addHoliday } from "../../../../../../../../Redux/thunks/addHoliday";
import { holidaysApi } from "../../../../../../../../Redux/thunks/holidaysApi";

const AddHolidayForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.hr);
  const [holidayData, setHolidayData] = useState({
    occasion: "",
    day: "",
    date: "",
    type: "",
    celebrationMode: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "date") {
      const selectedDate = new Date(value);
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const day = daysOfWeek[selectedDate.getDay()];
      setHolidayData((prev) => ({
        ...prev,
        date: value,
        day,
      }));
    } else {
      setHolidayData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiData = {
      holidayName: holidayData.occasion,
      holidayDate: holidayData.date,
      dayOfWeek: holidayData.day,
      type: holidayData.type,
      location: holidayData.celebrationMode,
      description: holidayData.description,
    };
    dispatch(addHoliday(apiData))
      .unwrap()
      .then(() => {
        toast.success("Holiday added successfully!");
        // Clear form fields after successful submission
        setHolidayData({
          occasion: "",
          day: "",
          date: "",
          type: "",
          celebrationMode: "",
          description: "",
        });
        dispatch(holidaysApi());
        onClose();
      })
      .catch((err) => {
        toast.error(`Failed to add holiday: ${err}`);
      });
  };

  return (
    <div className="fixed inset-0 bg-slate-800 dark:bg-gray-950 bg-opacity-50 dark:bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-darkModalBg p-4 shadow-lg w-[90%] md:w-[60%] lg:w-[30%]">
        <h2 className="text-lg font-normal mb-4 font-Work dark:text-darkPrimaryText">
          Add Holiday
        </h2>
        <hr className="mb-2 dark:border-darkDevider" />
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-2">
            <div className="mb-4">
              <label className="block mb-1 font-Work font-normal text-sm dark:text-darkMuted">
                Occasion
              </label>
              <input
                type="text"
                name="occasion"
                value={holidayData.occasion}
                onChange={handleChange}
                required
                className="w-full border px-3 py-1 text-sm dark:bg-darkinputBg dark:border-darkDevider outline-none dark:text-darkPrimaryText "
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="mb-4">
              <label className="block mb-1 font-Work font-normal text-sm dark:text-darkMuted">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={holidayData.date}
                onChange={handleChange}
                required
                className="w-full border px-3 py-1 text-sm dark:bg-darkinputBg dark:border-darkDevider outline-none dark:text-darkPrimaryText "
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-Work font-normal text-sm dark:text-darkMuted">
                Day
              </label>
              <input
                type="text"
                name="day"
                value={holidayData.day}
                readOnly
                required
                className="w-full border px-3 py-1 text-sm dark:bg-darkinputBg dark:border-darkDevider outline-none dark:text-darkPrimaryText "
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="mb-4">
              <label className="block mb-1 font-Work font-normal text-sm dark:text-darkMuted">
                Type
              </label>
              <select
                name="type"
                type="text"
                value={holidayData.type}
                onChange={handleChange}
                required
                className="w-full border px-3 py-1 text-sm dark:bg-darkinputBg dark:border-darkDevider outline-none dark:text-darkPrimaryText "
              >
                <option value="">Select Type</option>
                <option value="religious">Religious</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-Work font-normal text-sm dark:text-darkMuted">
                Celebration Mode
              </label>
              <select
                name="celebrationMode"
                type="text"
                value={holidayData.celebrationMode}
                onChange={handleChange}
                required
                className="w-full border px-3 py-1 text-sm dark:bg-darkinputBg dark:border-darkDevider outline-none dark:text-darkPrimaryText "
              >
                <option value="">Select Mode</option>
                <option value="In Present">In Present</option>
                <option value="Virtual">Virtual</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-Work font-normal text-sm dark:text-darkMuted">
              Description
            </label>
            <textarea
              name="description"
              value={holidayData.description}
              onChange={handleChange}
              required
              className="w-full border px-3 py-1 text-sm min-h-12 max-h-20 dark:bg-darkinputBg dark:border-darkDevider outline-none dark:text-darkPrimaryText "
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="border border-gray-500 p-2 text-sm  dark:text-white"
            >
              {loading ? "Adding..." : "Add Holiday"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-1 text-sm font-Work"
            >
              Cancel
            </button>
          </div>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default AddHolidayForm;
