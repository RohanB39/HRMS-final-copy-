import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchTodaysBirthdays } from "../../../../../Redux/thunks/fetchTodaysBirthdays";

const SpecialDay = () => {
  const dispatch = useDispatch();
  const { todaysBirthdays, isLoading, error } = useSelector(
    (state) => state.hr
  );

  useEffect(() => {
    dispatch(fetchTodaysBirthdays());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative">
      {isLoading && (
        <div className="flex items-center justify-center h-32 bg-gray-100">
          <p className="text-gray-600">Loading birthdays...</p>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center h-32 bg-red-100">
          <p className="text-red-600">
            Failed to fetch birthdays. Please try again later.
          </p>
        </div>
      )}

      {!isLoading && !error && todaysBirthdays.length === 0 && (
        <div className="flex flex-col items-start h-32  bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 p-6 font-Work">
          <motion.h2
            className="text-lg text-white mb-1 text-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            No birthdays today!
          </motion.h2>
          <p className="text-white start font-Work text-sm">
            Let's make the most of this day with a productive and positive
            mindset.
          </p>
        </div>
      )}

      {!isLoading && !error && todaysBirthdays.length > 0 && (
        <div
          className="md:flex items-center justify-between gap-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 shadow-lg h-32"
          style={{ position: "relative" }}
        >
          {/* Profile Images */}
          <div className="profile relative flex md:w-[20%]">
            {todaysBirthdays.slice(0, 2).map((employee, index) => (
              <div
                key={index}
                className={`absolute ${
                  index === 0 ? "left-0" : "left-12 lg:left-8"
                }`}
              >
                <div className="relative flex items-center justify-center h-20 w-20 rounded-full border border-white bg-gray-300 transform hover:scale-110 transition-all mt-[-50%]">
                  {employee.profileImage ? (
                    <img
                      src={`data:image/jpeg;base64,${employee.profileImage}`}
                      alt={employee.fullname}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold">
                      {employee.fullName
                        .split(" ")
                        .map((word) => word.charAt(0))
                        .join("")
                        .toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Message */}
          <div className="basis-[80%]">
            <motion.p
              className="text-base font-work dark:text-darkAccent2 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Today marks the birthday of{" "}
              {todaysBirthdays.map((e) => e.fullname).join(", ")} from the{" "}
              {[...new Set(todaysBirthdays.map((e) => e.department))].join(
                " and "
              )}{" "}
              teams.
            </motion.p>
            <small className="dark:text-darkMuted tracking-wide text-white">
              Please take a moment to extend your warm wishes and celebrate this
              special occasion with them.
            </small>
          </div>

          {/* Graffiti Effect */}
          <div
            className="absolute inset-0 bg-[url('/path-to-your-graffiti-image.svg')] opacity-10"
            style={{ pointerEvents: "none" }}
          />
        </div>
      )}
    </div>
  );
};

export default SpecialDay;
