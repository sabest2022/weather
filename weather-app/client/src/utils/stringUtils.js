export const capitalizeWords = (str) => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const formatBalance = (number) => {
  const result = Math.floor(number / 100)

  return result
}
