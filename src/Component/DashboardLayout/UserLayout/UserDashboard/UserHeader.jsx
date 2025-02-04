import React from "react";
import Logo from "./Header/Logo";
import Notification from "./Header/Notification";
import Profile from "./Header/Profile";
import Menu from "./Header/Menu";
import Headermenu from "./HeaderMenu/Headermenu";
import SwitchTheme from "./Header/SwitchTheme";
import Logout from "./Header/Logout";

const UserHeader = () => {
  return (
    <div className="sticky top-0 z-50">
      <div>
        <div className="w-full  bg-white dark:bg-darknavbarBg  h-auto py-1 z-10 sticky top-0">
          <div className="flex justify-between items-center w-[90%] mx-auto py-2">
            <Logo />
            <div className="flex items-center gap-4">
              {/* <Notification /> */}
              <Profile />
              <Menu />
              <Logout />
              <SwitchTheme />
            </div>
          </div>
        </div>

        {/* header navbar */}
        <Headermenu />
      </div>
      {/* hedaer */}
    </div>
  );
};

export default UserHeader;
