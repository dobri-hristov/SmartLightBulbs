import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { generateHoursOn } from "../utils/time";

const TimerContainer = ({ state, timeOn }) => {
  const [time, setTime] = useState(generateHoursOn(timeOn));

  useEffect(() => {
    const intervalId = setInterval(() => {
      state && setTime(generateHoursOn(timeOn));
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [state]);

  return (
    <Badge bg={`${state ? "primary" : "secondary"}`}>
      {`${time.hours}:${time.minutes}:${time.seconds}`}
    </Badge>
  );
};

export default TimerContainer;
