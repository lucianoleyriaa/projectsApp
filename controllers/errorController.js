exports.globalErrorController = (err, req, res, next) => {
  // console.log('Desde el controllador de errorres')
  // console.log(err.message);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
}