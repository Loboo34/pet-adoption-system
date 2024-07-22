import React from "react";
import { Button } from "react-bootstrap";

const CompleteAdoption = ({complete}) => {

  return (
    <Button
     
      variant="dark"
      style={{ backgroundColor: "#FFA500", borderRadius: "20px" }}
      onClick={
       complete
        
      }
    >
     Complete
    </Button>
  );
};

export default CompleteAdoption;
