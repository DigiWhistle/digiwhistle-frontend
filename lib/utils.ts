import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { string } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function camelToNormal(text: string) {
  // Insert space before capital letters
  let spaced = text.replace(/(?<!^)(?=[A-Z])/g, " ");

  // Capitalize the first letter
  let capitalized = spaced.charAt(0).toUpperCase() + spaced.slice(1);

  // Add space between numbers and letters
  let final = capitalized.replace(/(\d+)([a-zA-Z])/g, "$1 $2");
  final = final.replace(/([a-zA-Z])(\d+)/g, "$1 $2");

  return final;
}
