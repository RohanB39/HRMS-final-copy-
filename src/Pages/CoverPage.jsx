import React from "react";
import { useNavigate } from "react-router-dom";

import style from "./CoverPage.module.css";
import Logo from "../Component/DashboardLayout/AdminLayout/AdminDashboard/Header/Logo";
import SwitchTheme from "../Component/DashboardLayout/AdminLayout/AdminDashboard/Header/SwitchTheme";

const Coverpage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <div className={`${style.coverPageWrapper} bg-mainBg dark:bg-darkmainBg`}>
      <div className="w-full h-20 ">
        <div className="flex items-center justify-between pt-4 lg:pt-6 w-[95%] mx-auto">
          <Logo />
          <span>
            <SwitchTheme />
          </span>
        </div>
      </div>
      <div className={style.portraits}>
        <div className={style.pr1}>
          <img src="../../public/portraits/pr1.webp" alt="" />
          <div className={style.icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-3"
            >
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
          </div>
        </div>

        <div className={style.pr2}>
          <img src="../../public/portraits/pr2.webp" alt="" />
          <div className={`${style.icon} ${style.pulse} ${style.circle}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-3"
            >
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
          </div>
          <div
            className={`${style.infoCard1} bg-cardBg  dark:bg-darkcardBg dark:text-darkAccent3`}
          >
            <p>Track performance</p>
          </div>
        </div>
        <div className={style.pr5}>
          <img src="../../public/portraits/pr5.webp" alt="" />
          <div className={`${style.icon}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-2"
            >
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
          </div>
        </div>
        <div className={style.pr6}>
          <img src="../../public/portraits/pr6.webp" alt="" />
          {/* <div className={style.icon}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-3">
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
          </div> */}
          <div
            className={`${style.infoCard3} bg-cardBg dark:bg-darkcardBg dark:text-darkAccent`}
          >
            <p> Quick Access </p>
          </div>
        </div>
        <div className={style.pr7}>
          <img src="../../public/portraits/pr7.webp" alt="" />
          <div className={`${style.icon} ${style.circle} ${style.pulse}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-2"
            >
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
          </div>
        </div>
        <div className={style.pr8}>
          <img src="../../public/portraits/pr8.webp" alt="" />
          <div className={`${style.icon} ${style.pulse} ${style.circle}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
          </div>
          <div
            className={`${style.infoCard2} bg-cardBg  dark:bg-darkcardBg dark:text-darkAccent2`}
          >
            <p> Track Leave </p>
          </div>
        </div>
        <div className={style.pr9}>
          <img src="../../public/portraits/pr9.webp" alt="" />
          <div className={style.icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-2"
            >
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
          </div>
        </div>
        <div className={style.pr10}>
          <img src="../../public/portraits/pr10.webp" alt="" />
          <div className={style.icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-1"
            >
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
          </div>
        </div>
        <div className={style.pr11}>
          <img src="../../public/portraits/pr11.webp" alt="" />
          <div className={style.icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-1"
            >
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
          </div>
        </div>

        <div className={style.pr12}>
          <img src="../../public/portraits/pr12.webp" alt="" />
          <div className={style.icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-1"
            >
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
          </div>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.heading}>
          <h4 className="text-primaryBg dark:text-darkPrimaryText dark:font-semibold font-Title tracking-widest">
            Envision the Future <br /> Expanding Possibilities for Your
            Workforce
          </h4>
          <p className=" dark:text-gray-400 font-Work tracking-wide">
            Empower your team with innovative solutions that streamline HR
            processes, enhance productivity, and foster growth. Together, we
            create an environment where your workforce thrives and drives
            success.
          </p>
          <div
            className={`${style.btn} dark:bg-darkAccent2 dark:text-darkmainBg font-Work   dark:hover:bg-darkAccent`}
          >
            <button onClick={handleLoginClick}>Log In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coverpage;
