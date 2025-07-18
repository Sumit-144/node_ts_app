// Import parse, difference, and format functions from date-fns
import { parse, intervalToDuration } from "date-fns";

// Function to compute age from date of birth
export function computeAge(dob: Date): string {
  const today = new Date();

  const duration = intervalToDuration({ start: dob, end: today });

  const years = duration.years ?? 0;
  const months = duration.months ?? 0;
  const days = duration.days ?? 0;

  return `${years} year${years !== 1 ? "s" : ""}, ${months} month${months !== 1 ? "s" : ""}, ${days} day${days !== 1 ? "s" : ""}`;
}

// Function to compute BMI from height (in cm) and weight (in kg)
export function computeBMI(height: number, weight: number): number {
  // Convert height from cm to meters
  const heightInMeters = height / 100;

  // Calculate BMI using the formula: weight (kg) / (height (m) * height (m))
  const bmi = weight / (heightInMeters * heightInMeters);

  // Return the BMI rounded to two decimal places
  return Math.round(bmi * 100) / 100;
}
