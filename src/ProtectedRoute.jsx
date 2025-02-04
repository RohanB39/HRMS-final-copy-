import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const authCode = params.get("authCode");
  const VALID_AUTH_CODE = "c23049kjdfn320sdkfn3409sdfn3409lkskdn32skjb$%^";
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
