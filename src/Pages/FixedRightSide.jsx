import React from "react";
import style from "../Component/AuthLayout/Login.module.css";

const RightSideLogin = () => {
  return (
    <div>
      <div className={`${style.rightSide} `}>
        <div className={`${style.outerCircle} dark:bg-darknavbarBg`}>
          <div className={`${style.innerCircle} dark:bg-darknavbarBg`}>
            <img src="../../../public/portraits/pr3.webp" alt="" />
            <div className={style.icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M1 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V6Zm4 1.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2 3a4 4 0 0 0-3.665 2.395.75.75 0 0 0 .416 1A8.98 8.98 0 0 0 7 14.5a8.98 8.98 0 0 0 3.249-.604.75.75 0 0 0 .416-1.001A4.001 4.001 0 0 0 7 10.5Zm5-3.75a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm0 6.5a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm.75-4a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className={style.portraits}>
            <div className={style.port1}>
              <img src="../../../public/portraits/pr15.webp" alt="" />
            </div>
            <div className={style.port2}>
              <img src="../../../public/portraits/pr1.webp" alt="" />
            </div>
            <div className={style.port3}>
              <img src="../../../public/portraits/pr5.webp" alt="" />
            </div>
            <div className={style.port4}>
              <img src="../../../public/portraits/pr6.webp" alt="" />
            </div>
            <div className={style.port5}>
              <img src="../../../public/portraits/pr7.webp" alt="" />
            </div>
            <div className={style.port6}>
              <img src="../../../public/portraits/pr9.webp" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideLogin;
