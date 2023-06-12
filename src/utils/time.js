import { formatNumber } from "./common";

export const timeLeftContainer = (time) => {
  time = Number(time);
  var h = Math.floor(time / 3600);
  var days = Math.floor(h / 24);
  var m = Math.floor((time % 3600) / 60);
  var s = Math.floor((time % 3600) % 60);

  return (
    <div className="text-center ">
      <p className="m-0">&#8776; {formatNumber(days)} days</p>
      <p className="m-0">
        &#8776; {formatNumber(h)} hours / {formatNumber(m)} minutes /{" "}
        {formatNumber(s)} seconds
      </p>
    </div>
  );
};

export const setNewHours = (hours, timeOn) => {
  const curentTime = new Date().getTime() / 1000;
  const oldTime = new Date(timeOn).getTime() / 1000;
  const total = Math.round(curentTime) - Math.round(oldTime);
  return hours - total;
};

export const generateHoursOn = (timeOn) => {
  const curentTime = new Date().getTime() / 1000;
  const oldTime = new Date(timeOn).getTime() / 1000;
  const total = Math.round(curentTime) - Math.round(oldTime);

  var sec_num = total;
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  hours < 10 && (hours = "0" + hours);
  minutes < 10 && (minutes = "0" + minutes);
  seconds < 10 && (seconds = "0" + seconds);

  return { hours, minutes, seconds };
};
