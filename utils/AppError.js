class AppError extends Error {

  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'Fail' : 'Error';
    this.message = message;

    /* Toma la pila de ejecucion hasta donde el error se produjo */
    Error.captureStackTrace(this);
     
  }
}

module.exports = AppError;