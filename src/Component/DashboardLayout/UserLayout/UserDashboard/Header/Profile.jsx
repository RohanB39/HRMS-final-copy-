import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import { useSelector } from "react-redux";

const Profile = () => {
  const { loggedInUser } = useSelector((state) => state.hr);
  // console.log(loggedInUser)

  const [avatar, setAvatar] = useState("");

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

  // Handle avatar generation
  useEffect(() => {
    if (loggedInUser && loggedInUser.fullname) {
      const initials = generateInitials(loggedInUser.fullname);
      setAvatar(initials);
    } else {
      setAvatar("N/A");
    }
  }, [loggedInUser]);

  return (
    <div className="hidden md:block">
      <div className="w-10 h-10 rounded-full bg-yellow-300 text-darkmainBg flex items-center justify-center">
        {avatar}
      </div>
    </div>
  );
};

export default Profile;
