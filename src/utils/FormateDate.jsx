const formatDate = (dateString) => {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
};
export default formatDate;
