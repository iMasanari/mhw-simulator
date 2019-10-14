export default (str: string) => {
  const num = +str

  if (str === '' || Number.isNaN(num)) {
    return null
  }

  return num
}
