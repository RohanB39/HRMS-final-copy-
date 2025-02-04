import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EmployeeLeaveDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employee } = location.state || {};

  if (!employee) {
    return <div>No employee data found</div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>
        Go Back
      </button>
      <h2>Leave History for {employee.name}</h2>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <img
          src={employee.profilePic}
          alt={`${employee.name}'s profile`}
          style={{ width: "100px", height: "100px", borderRadius: "50%", marginRight: "20px" }}
        />
        <div>
          <p><strong>Employee ID:</strong> {employee.id}</p>
          <p><strong>Department:</strong> {employee.department}</p>
          <p><strong>Leave Balance:</strong> {employee.leaveBalance}</p>
          <p><strong>Upcoming Leaves:</strong> {employee.upcomingLeaves}</p>
          <p><strong>Last Leave:</strong> {employee.lastLeave}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeaveDetailPage;
