import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allEmployee } from "../../../../../Redux/thunks/allEmployee";

const Profile = () => {
  const dispatch = useDispatch();
  const { allEmployeeData, loggedInUser } = useSelector((state) => state.hr);

  const [avatar, setAvatar] = useState("");
  const [profileImg, setProfileImg] = useState(null);

  // Function to generate initials from a user's name
  const generateInitials = (name) => {
    if (!name) return "N/A";
    const nameParts = name.split(" ");
    const initials =
      nameParts.length > 1
        ? nameParts[0][0] + nameParts[1][0]
        : nameParts[0][0];
    return initials.toUpperCase();
  };

  useEffect(() => {
    // Fetch all employee data
    dispatch(allEmployee());
  }, [dispatch]);

  useEffect(() => {
    // Filter employee data to find the logged-in user's profile image
    if (allEmployeeData && loggedInUser) {
      const matchedEmployee = allEmployeeData.find(
        (employee) => employee.employeeId === loggedInUser.id
      );

      if (matchedEmployee && matchedEmployee.profileImage) {
        setProfileImg(matchedEmployee.profileImage); // Set profile image if available
      } else if (loggedInUser.fullname) {
        const initials = generateInitials(loggedInUser.fullname);
        setAvatar(initials); // Generate initials if no profile image
      }
    }
  }, [allEmployeeData, loggedInUser]);

  return (
    <div className="hidden md:block">
      {profileImg ? (
        <img
          src={`data:image/jpeg;base64,${profileImg}`}
          alt={loggedInUser.fullname}
          className="w-10 h-10 rounded-full"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center">
          {avatar}
        </div>
      )}
    </div>
  );
};

export default Profile;
