export function parseClassTime(classDateStr: string, timeStr: string): Date {
  const classDate = new Date(classDateStr); // Convert class date to Date object
  const timeParts = timeStr.split(" ")[4].split(":"); // Extract hours and minutes

  return new Date(
    Date.UTC(
      classDate.getUTCFullYear(),
      classDate.getUTCMonth(),
      classDate.getUTCDate(),
      parseInt(timeParts[0]), // Hours
      parseInt(timeParts[1]), // Minutes
    ),
  );
}
