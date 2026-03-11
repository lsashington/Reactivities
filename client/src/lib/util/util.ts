import { format, parseISO } from 'date-fns';

export function formatDate(date: string | Date, formatStr: string = 'dd MMM yyyy h:mm a') {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;

    if (isNaN(dateObj.getTime())) return 'Invalid Date';

    return format(dateObj, formatStr);
}