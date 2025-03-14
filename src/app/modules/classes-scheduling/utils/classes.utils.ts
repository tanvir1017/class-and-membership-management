// Create a function to convert date format from 'yyyy-mm-dd' to 'dd-mm-yyyy'
export const convertDateFormat = (dateStr: string) => {
  const [day, month, year] = dateStr.split("-"); // Split by hyphen
  return new Date(`${year}-${month}-${day}`);
};

// Create class date and time
export const createClassDateTimes = (
  classDate: Date,
  startTime: string,
  endTime: string,
) => {
  // Ensure startTime and endTime are in 'HH:mm' format (splitting by ':')
  const [startHour, startMinute] = startTime.split(":");
  const [endHour, endMinute] = endTime.split(":");

  // Create startDateTime
  const startDateTime = new Date(
    Date.UTC(
      classDate.getUTCFullYear(),
      classDate.getUTCMonth(),
      classDate.getUTCDate(),
      parseInt(startHour), // Start hour (from user input)
      parseInt(startMinute), // Start minute (from user input)
      0, // Seconds
      0, // Milliseconds
    ),
  );

  // Create endDateTime
  const endDateTime = new Date(
    Date.UTC(
      classDate.getUTCFullYear(),
      classDate.getUTCMonth(),
      classDate.getUTCDate(),
      parseInt(endHour), // End hour (from user input)
      parseInt(endMinute), // End minute (from user input)
      0, // Seconds
      0, // Milliseconds
    ),
  );

  return {
    startDateTime,
    endDateTime,
  };
};
