export const translateDate = (date) => {
    const localDate = new Date(date);
    return localDate.toLocaleString();
}