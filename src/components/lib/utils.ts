import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const SERVICE_ID = 'service_yx8u848';
export const TEMPLATE_ID = 'template_65jyb2c';
export const PUBLIC_KEY = 'utN44enYz6NGqHwsv';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
