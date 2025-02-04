import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInApi } from "../../../../../Redux/thunks/signInApi";
import { signOutApi } from "../../../../../Redux/thunks/signOutApi";
import { Link } from "react-router-dom";
import {
  signInEmployee,
  signOutEmployee,
} from "../../../../../Redux/Features/hrSlice";
import { Spin } from "antd";
import toast from "react-hot-toast";
import { buttontext } from "../../../../../Redux/thunks/buttontext";

const EmployeeInfoGraph = () => {
  const { loggedInUser } = useSelector((state) => state.hr);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { buttontextData } = useSelector((state) => state.hr);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Loading...");

  useEffect(() => {
    if (loggedInUser?.employeeId) {
      dispatch(buttontext(loggedInUser.employeeId));
    }
  }, [dispatch, loggedInUser]);

  useEffect(() => {
    if (buttontextData) {
      setButtonLabel(buttontextData);
    }
  }, [buttontextData]);
  const handleSignIn = async () => {
    if (!loggedInUser) {
      toast.error("No user logged in!");
      return;
    }

    setLoading(true);
    const signinTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = "AIzaSyC9awj6ipJIZ94ikj0DZt_9_tmHUfrqP-U";
        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
        try {
          const geocodeResponse = await fetch(geocodingUrl);
          const geocodeData = await geocodeResponse.json();

          if (geocodeData.status === "OK" && geocodeData.results.length > 0) {
            const addressComponents = geocodeData.results[0].address_components;

            let placeName = "";
            let cityName = "";

            // Extract place name
            addressComponents.forEach((component) => {
              if (component.types.includes("establishment")) {
                placeName = component.long_name;
              }
              if (component.types.includes("locality")) {
                cityName = component.long_name;
              }
            });

            // Fallback: If no establishment found, use the first formatted address
            if (!placeName) {
              placeName =
                geocodeData.results[0].formatted_address.split(",")[0];
            }

            // Ensure we have a city name
            if (!cityName) {
              const cityComponent = addressComponents.find((component) =>
                component.types.includes("administrative_area_level_2")
              );
              cityName = cityComponent
                ? cityComponent.long_name
                : "Unknown City";
            }

            const signinLocation = `${placeName}, ${cityName}`;

            const signinData = {
              employeeId: loggedInUser.employeeId,
              signInTime: signinTime,
              signInLocation: signinLocation,
            };

            const resultAction = await dispatch(signInApi(signinData));
            if (signInApi.fulfilled.match(resultAction)) {
              const responseMessage = resultAction.payload;
              console.log("Response message:", responseMessage);
              if (responseMessage.includes("successfully")) {
                dispatch(signInEmployee(signinData));
                setSuccessMessage(responseMessage);
                toast.success(responseMessage);
              } else {
                toast.error("Sign-in failed with unexpected response!");
              }
            } else {
              toast.error("Sign-in failed!");
            }
          } else {
            toast.error("Unable to fetch location details.");
          }
        } catch (error) {
          console.error("Error fetching location details:", error);
          toast.error("An error occurred while fetching location!");
        } finally {
          setLoading(false);
        }
      },
      () => {
        toast.error("Unable to fetch location.");
        setLoading(false);
      }
    );
  };

  const handleSignOut = async () => {
    setLoading(true);
    const signOutTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    if (!navigator.geolocation) {
      toast.error("Geolocation not supported.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = "AIzaSyC9awj6ipJIZ94ikj0DZt_9_tmHUfrqP-U";
        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

        try {
          const geocodeResponse = await fetch(geocodingUrl);
          const geocodeData = await geocodeResponse.json();

          if (geocodeData.status === "OK" && geocodeData.results.length > 0) {
            const addressComponents = geocodeData.results[0].address_components;

            let placeName = "";
            let cityName = "";

            // Extract place name
            addressComponents.forEach((component) => {
              if (component.types.includes("establishment")) {
                placeName = component.long_name;
              }
              if (component.types.includes("locality")) {
                cityName = component.long_name;
              }
            });

            // Fallback: If no establishment found, use the first part of the formatted address
            if (!placeName) {
              placeName =
                geocodeData.results[0].formatted_address.split(",")[0];
            }

            // Ensure we have a city name
            if (!cityName) {
              const cityComponent = addressComponents.find((component) =>
                component.types.includes("administrative_area_level_2")
              );
              cityName = cityComponent
                ? cityComponent.long_name
                : "Unknown City";
            }

            const signOutLocation = `${placeName}, ${cityName}`;

            const signOutData = {
              employeeId: loggedInUser.employeeId,
              signOutTime,
              signOutLocation,
            };

            const resultAction = await dispatch(signOutApi(signOutData));
            if (signOutApi.fulfilled.match(resultAction)) {
              const responseMessage = resultAction.payload;
              if (responseMessage.includes("successfully")) {
                toast.success(responseMessage);
                dispatch(signOutEmployee());
              } else {
                toast.error("Sign-out failed with unexpected response!");
              }
            } else {
              toast.error("Sign-out failed!");
            }
          } else {
            toast.error("Unable to fetch location details.");
          }
        } catch (error) {
          toast.error("An error occurred during sign-out!");
        } finally {
          setLoading(false);
        }
      },
      () => {
        toast.error("Unable to fetch location.");
        setLoading(false);
      }
    );
  };

  const toggleSignInOut = () => {
    if (buttonLabel === "Sign Out") {
      handleSignOut();
      setButtonLabel("Sign In");
    } else {
      handleSignIn();
      setButtonLabel("Sign Out");
    }
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 bg-white dark:bg-darkmainBg flex justify-center items-center z-50">
          <div className="flex flex-col items-center">
            <Spin size="large" />
            <p className="mt-4 text-lg font-medium text-gray-700 dark:text-darkAccent3 font-Work tracking-wide">
              {isSignedIn ? "Signing out..." : "Signing in..."}
            </p>
          </div>
        </div>
      )}

      <div className="lg:h-full dark:bg-darkmainBg border dark:border-darkDevider border-gray-400 h-[200px] relative">
        <div className="flex justify-between items-start p-4">
          <div>
            <h3 className="dark:text-darkMuted font-normal">
              Welcome
              <br />
              <span className="font-medium text-2xl uppercase font-Work md:tracking-[2px] dark:text-darkPrimaryText">
                {loggedInUser?.fullname || "Guest"}
              </span>
            </h3>
            <small className="dark:text-yellow-400 font-Work font-normal tracking-wider">
              {isSignedIn ? "You're logged in!" : "Log in to start."}
            </small>
          </div>
          {isSignedIn && (
            <p className="text-[12px] text-nowrap md:text-sm font-Work text-gray-500 dark:text-darkMuted tracking-wide">
              Emp_ID: {loggedInUser?.employeeId}
            </p>
          )}
        </div>

        <div className="flex items-center p-4 absolute bottom-0 right-0 w-full gap-5">
          <div className="flex-grow border-t border-gray-700 dark:border-gray-400"></div>

          <div className="flex gap-5">
            <button
              onClick={toggleSignInOut}
              className={`${
                buttonLabel === "Sign Out" ? "bg-red-500" : "bg-yellow-400"
              } px-4 py-2 text-sm text-darkmainBg tracking-wide shadow-2xl hover:bg-yellow-600`}
              disabled={loading}
            >
              {loading ? "Processing..." : buttonLabel}
            </button>
            <Link
              to="/register"
              className="border-darkDevider border flex items-center text-sm px-4 py-1 dark:text-gray-200 dark:hover:border-darkMuted shadow-2xl"
            >
              <button className="flex items-center">Add Employee</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfoGraph;
