import moment from "moment";

export const generatePeriodsData = (periods) => {
  return (
    periods.map((period) => ({
      ...period,
      uniqueKey: `${period.start}-${period.stop}-${Math.random()}`,
    })) || []
  );
};

const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0");
};

const convertMiliseconds = (miliseconds) => {
  const total_seconds = Math.ceil(miliseconds / 1000);
  const total_minutes = Math.floor(total_seconds / 60);
  const total_hours = Math.floor(total_minutes / 60);
  const days = Math.floor(total_hours / 24);
  const seconds = total_seconds % 60;
  const minutes = total_minutes % 60;
  const hours = total_hours % 24;

  return (
    <span className="bg-info d-inline px-2 py-1 rounded">
      {days}d : {padTo2Digits(hours)}h : {padTo2Digits(minutes)}m :{" "}
      {padTo2Digits(seconds)}s
    </span>
  );
};

const timeOnFormater = (row) => {
  const startTime = new Date(row.start).getTime();
  const stopTime = new Date(row.stop).getTime();

  return startTime && !isNaN(stopTime)
    ? convertMiliseconds(stopTime - startTime)
    : "0d : 00h : 00m : 00s";
};

const timeFormater = (time) => {
  return moment(time).format("MMMM Do YYYY, h:mm:ss a");
};

const columnXs = { width: "5%" };

export const generateColumns = () => {
  return [
    {
      dataField: "id",
      text: "#",
      sort: true,
      formatter: (cell, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: {
        ...columnXs,
      },
    },
    {
      dataField: "start",
      text: "Start Time",
      sort: true,
      formatter: (cell, row) => {
        return timeFormater(row.start);
      },
    },
    {
      dataField: "stop",
      text: "Stop Time",
      sort: true,
      formatter: (cell, row) => {
        return timeFormater(row.stop);
      },
    },
    {
      dataField: "",
      text: "Total",
      sort: true,
      formatter: (cell, row) => {
        return timeOnFormater(row);
      },
    },
  ];
};
