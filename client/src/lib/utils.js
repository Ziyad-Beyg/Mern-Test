import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const BASE_URL = "http://localhost:8080/api/v1/customer";
