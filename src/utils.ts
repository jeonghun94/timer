export const formatTime = (seconds: number) => {
  const duration = new Date(seconds * 1000).toISOString();
  const timeString = duration.split("T")[1];
  const formattedTime = timeString.split(".")[0];

  return formattedTime;
};
