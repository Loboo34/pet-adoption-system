import React from "react";
import { Button } from "react-bootstrap";

const RejectAdoption = ({ fail }) => {
  return (
    <Button
      variant="dark"
      style={{ backgroundColor: "#FFA500", borderRadius: "20px" }}
      onClick={fail}
    >
    Reject
    </Button>
  );
};

export default RejectAdoption;
