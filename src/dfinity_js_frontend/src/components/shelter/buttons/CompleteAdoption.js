import React from "react";
import { Button } from "react-bootstrap";

const CompleteAdoption = ({ adopt}) => {

  return (
    <Button
     
      variant="dark"
      style={{ backgroundColor: "#FFA500", borderRadius: "20px" }}
      onClick={
        adopt
        
      }
    >
     Complete
    </Button>
  );
};

export default CompleteAdoption;
