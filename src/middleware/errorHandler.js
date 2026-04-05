module.exports = (err, req, res, next) => {
  console.error(err.stack || err.message); 

  const statusCode = err.status || 500;
  
  const errorMessage = err.message || 'Internal server error';

  res.status(statusCode).json({
    error: errorMessage 
  });
};