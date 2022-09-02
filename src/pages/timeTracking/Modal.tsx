import "./time.css";
import React, { useState } from "react";
import { Button } from "@mui/material";

export default function Modal(ChildComponent: any) {
  const [isVisible, setIsVisible] = useState(false);
  if (isVisible) {
    return (
      <div className="modal-container">
        <div className="modal" style={{ zIndex: 1 }}>
          <button className="modal-close" onClick={() => setIsVisible(false)}>
            X
          </button>
          <ChildComponent />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            setIsVisible(true);
          }}
        >
          + Track Time
        </Button>
      </div>
    );
  }
}
