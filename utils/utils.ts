export function formatDate(date: Date): string {
  const givenDate = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const isToday = givenDate.toDateString() === today.toDateString();
  const isYesterday = givenDate.toDateString() === yesterday.toDateString();

  if (isToday) {
    return "Today";
  } else if (isYesterday) {
    return "Yesterday";
  } else {
    const day = String(givenDate.getDate()).padStart(2, "0");
    const month = String(givenDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = String(givenDate.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }
}
