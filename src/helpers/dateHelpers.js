export const formatDate = (
  dateString,
  { day = '2-digit', month = 'short', year = 'numeric' } = {}
) => {
  if (!dateString) return null;
  return new Intl.DateTimeFormat('en-GB', {
    day,
    month,
    year,
  }).format(new Date(dateString));
};
