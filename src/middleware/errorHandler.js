module.exports = (err, req, res, next) => {
  console.error(err); // Logs the error in your terminal so YOU can see it
  res.status(500).json({
    error: 'An unexpected server error occurred' // The safe message the user sees
  });
};