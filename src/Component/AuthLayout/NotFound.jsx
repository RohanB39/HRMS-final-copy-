import React from "react";
import { Result, Button } from "antd";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        className="font-fontMerriweather font-semibold"
        extra={
          <Button type="primary" href="/">
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
