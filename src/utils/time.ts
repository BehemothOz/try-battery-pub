export const parseTimestampToString = (timestamp: number): string => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;

    return date.toLocaleString('en-UA', options);
};

export const compareDate = (lastDateTimestamp: number, currentDateTimestamp: number): boolean => {
    const last = new Date(lastDateTimestamp);
    const current = new Date(currentDateTimestamp);

    return (
        last.getFullYear() < current.getFullYear() ||
        last.getMonth() < current.getMonth() ||
        last.getDay() < current.getDay()
    );
};
