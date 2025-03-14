// Define class status enum
export const ClassStatus = {
  OPEN: "open",
  FULL: "full",
  CLOSED: "closed",
} as const;

// Enum for Class Status (to match your Mongoose schema)
export const ClassStatusArr = ["open", "closed", "cancelled"] as const;
