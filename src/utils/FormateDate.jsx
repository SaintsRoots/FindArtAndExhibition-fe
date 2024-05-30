const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };
  export default formatDate;