export const formatCity = (city) => {
  let formattedCity = city.replace(/\s+/g, '-')
  formattedCity = formattedCity.toLowerCase()

  return formattedCity
}
