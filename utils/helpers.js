module.exports = {
  // Function to format date as MM/DD/YYYY
  formatDate: (date) => {
    const newDate = new Date(date);
    return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`;
  },

  // Function to format time as HH:MM:SS
  formatTime: (date) => {
    return date.toLocaleTimeString();
  },

  // Function to check if two variables are equal
  areEqual: (a, b) => {
    return a === b;
  },
};
