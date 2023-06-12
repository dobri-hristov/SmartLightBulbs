import React from "react";
import { Badge } from "react-bootstrap";
import { gettimeLeftStatus } from "../utils/devices";
import { TIMELEFT_STATUS } from "../utils/constants";

const TimeLeftStatus = ({ currentHours, initialHours }) => {
  const status = gettimeLeftStatus(currentHours, initialHours);

  return (
    <Badge
      bg={
        status === TIMELEFT_STATUS.GOOD ||
        status === TIMELEFT_STATUS.EXCELENT ||
        status === TIMELEFT_STATUS.PERFECT
          ? "success"
          : status
      }
      className="p-1"
    >
      {status === TIMELEFT_STATUS.PERFECT && "around 100%"}
      {status === TIMELEFT_STATUS.EXCELENT && "more than 75%"}
      {status === TIMELEFT_STATUS.GOOD && "more than 50%"}
      {status === TIMELEFT_STATUS.WARNING && "less than 50%"}
      {status === TIMELEFT_STATUS.DANGER && "less than 25%"}
    </Badge>
  );
};

export default TimeLeftStatus;
