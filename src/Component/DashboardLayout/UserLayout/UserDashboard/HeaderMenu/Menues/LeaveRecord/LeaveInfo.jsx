import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaveInfo } from "../../../../../../../Redux/thunks/fetchLeaveInfo";

const LeaveInfo = () => {
  const dispatch = useDispatch();
  const {
    leaveAssignments = [],
    loading,
    error,
  } = useSelector((state) => state.employees);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.employeeId) {
      const employeeId = loggedInUser.employeeId;
      dispatch(fetchLeaveInfo(employeeId));
    }
  }, [dispatch]);

  return (
    <div className="mt-12">
      <h3 className="font-Work text-lg font-normal dark:text-darkAccent3">
        Leave Balance
      </h3>
      <p className="text-sm font-Work dark:text-darkMuted">
        View your leave balance details, including remaining and approved
        leaves, to stay updated on your available time off.
      </p>

      {loading && <p className="text-blue-500">Loading...</p>}

      {!loading && (
        <div className="overflow-x-auto  flex snap-x snap-mandatory space-x-4 mt-4 mb-2 md:grid grid-cols-5 scrollbarHide">
          {leaveAssignments.map((leave, index) => (
            <div
              key={index}
              className="min-w-[calc(100%-10%)] snap-start md:border px-2 py-2 flex md:block lg:flex justify-between items-center dark:border-darkDevider shadow-sm text-white border border-gray-400 dark:bg-darkcardBg"
            >
              <div>
                <h3 className="font-normal text-sm font-Work text-darkmainBg dark:text-darkAccent3">
                  {leave.leaveName}
                </h3>
              </div>
              <span className="font-semibold text-darknavbarBg text-[22px] dark:text-darkAccent2">
                {leave.leaveBalance}{" "}
                <small className="text-xs text-gray-400 dark:text-orange-200">
                  {error ? 0 : leave.approvedLeaves}
                </small>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaveInfo;
