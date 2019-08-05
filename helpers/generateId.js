const generateId = (prefix = 'N') => {
  return prefix + _randomGenerator()
}

const _randomGenerator = (length = 10) => {
  let String = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    result += String.charAt(Math.floor(Math.random() * String.length))
  }
  return result
}

module.exports = {
  generateId
}