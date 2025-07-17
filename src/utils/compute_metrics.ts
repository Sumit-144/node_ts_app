// Import parse, difference, and format functions from date-fns
import { parse, intervalToDuration } from "date-fns";

// Function to compute age from date of birth
export function computeAge(dob: string): {
  years: number;
  months: number;
  days: number;
} {
  const birthDate = parse(dob, "dd-MM-yyyy", new Date());
  const today = new Date();

  const duration = intervalToDuration({ start: birthDate, end: today });

  return {
    years: duration.years ?? 0,
    months: duration.months ?? 0,
    days: duration.days ?? 0,
  };
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
