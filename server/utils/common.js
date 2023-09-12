const colorize = require('json-colorizer');

const errorLogFormat = (err) => {
  let errorMessage = err
  if (typeof(err) === 'object' && err instanceof Error) {
    errorMessage = {
      name: err.name,
      message: err.message,
      stack: err.stack || ''
    }
  }
  if (typeof(err) === 'string') {
    errorMessage = {
      message: err
    }
  }
  console.log("[errorLog]: ", colorize(JSON.stringify(errorMessage)))
}

module.exports = {
  errorLogFormat,
}
