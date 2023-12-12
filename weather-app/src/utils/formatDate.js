export const convertTimestampToTime = (timestamp) => {
  const date = new Date(timestamp * 1000)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

export const convertTimestampToDayOfWeek = (timestamp) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const date = new Date(timestamp * 1000)
  const dayOfWeek = daysOfWeek[date.getDay()]

  return dayOfWeek
}
