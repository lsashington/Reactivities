import { format, parseISO } from 'date-fns';
import { z } from 'zod';

export function formatDate(date: string | Date, formatStr: string = 'dd MMM yyyy h:mm a') {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;

    if (isNaN(dateObj.getTime())) return 'Invalid Date';

    return format(dateObj, formatStr);
}

export const requiredString = (fieldName: string) => z
    .string({error: `${fieldName} is required`})
    .min(1, {message: `${fieldName} is required`})