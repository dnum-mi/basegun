export function isUserUsingCrosscall () {
  const userAgent = window.navigator.userAgent
  const keyWords = ['Mobile', 'Mozilla', 'Crosscall']

  const isUsingCrosscall = keyWords.every(keyWord => {
    return userAgent.includes(keyWord)
  })
  return isUsingCrosscall
}
