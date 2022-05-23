// Helper function used to format the date from sql timestamp to Users local standard
module.exports = {
  format_date: (date) => {
    // Format date in local format
    return date.toLocaleDateString();
  },
};
