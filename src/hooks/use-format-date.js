function useFormatDate(inputDate) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Create a new Date object from the input date string
  const date = new Date(inputDate);

  // Get the month, day, and year
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Format the date in the desired format
  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
}

export default useFormatDate;
