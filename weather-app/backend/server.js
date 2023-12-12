const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.get('/api/weather', async (req, res) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY

    res.json({ message: 'Weather data endpoint reached' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error ' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
