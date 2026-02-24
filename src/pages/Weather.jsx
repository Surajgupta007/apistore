import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap'
import './Pages.css'

function Weather() {
  const API_KEY = 'befdc3ffff772c6e634fca8f1ad7330b'
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

  const [city, setCity] = useState('Jalandhar')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchHistory, setSearchHistory] = useState([])

  // Fetch weather data
  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) {
      setError('Please enter a city name')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(
        `${BASE_URL}?q=${cityName.trim()}&appid=${API_KEY}&units=metric`
      )
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.')
        } else if (response.status === 401) {
          throw new Error('Invalid API key.')
        } else {
          throw new Error(`Error: ${response.status} ${response.statusText}`)
        }
      }

      const data = await response.json()
      setWeatherData(data)
      
      // Add to search history
      if (!searchHistory.includes(cityName.trim())) {
        setSearchHistory([cityName.trim(), ...searchHistory].slice(0, 5))
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data. Please try again.')
      setWeatherData(null)
      console.error('Error fetching weather:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch default city on component mount
  useEffect(() => {
    fetchWeather('Jalandhar')
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchWeather(city)
  }

  const handleHistoryClick = (historyCity) => {
    setCity(historyCity)
    fetchWeather(historyCity)
  }

  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase()
    if (desc.includes('rain')) return '🌧️'
    if (desc.includes('cloud')) return '☁️'
    if (desc.includes('sunny') || desc.includes('clear')) return '☀️'
    if (desc.includes('snow')) return '❄️'
    if (desc.includes('thunder')) return '⛈️'
    if (desc.includes('mist') || desc.includes('fog')) return '🌫️'
    if (desc.includes('wind')) return '💨'
    return '🌤️'
  }

  return (
    <div className="page-wrapper">
      <Container className="py-5">
        {/* Header */}
        <Row className="mb-5">
          <Col md={12} className="text-center">
            <h1 className="display-4 fw-bold mb-3">Weather Search</h1>
            <p className="lead text-muted">
              Enter a city name to get real-time weather information
            </p>
          </Col>
        </Row>

        {/* Search Section */}
        <Row className="mb-5">
          <Col md={8} className="mx-auto">
            <Card className="feature-card">
              <Card.Body className="p-5">
                <Form onSubmit={handleSearch}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold mb-2">City Name</Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="text"
                        placeholder="Enter city name (e.g., London, New York, Tokyo)"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value)
                          setError('')
                        }}
                        className="form-control-lg"
                      />
                      <Button 
                        variant="primary" 
                        type="submit"
                        disabled={loading}
                        className="btn-lg"
                      >
                        {loading ? <Spinner animation="border" size="sm" /> : 'Search'}
                      </Button>
                    </div>
                  </Form.Group>
                </Form>

                {/* Search History */}
                {searchHistory.length > 0 && (
                  <div className="mt-4">
                    <h6 className="mb-3 text-muted">Recent Searches</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {searchHistory.map((historyCity, index) => (
                        <Button
                          key={index}
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleHistoryClick(historyCity)}
                        >
                          {historyCity}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Error Alert */}
        {error && (
          <Row className="mb-5">
            <Col md={8} className="mx-auto">
              <Alert variant="danger" dismissible onClose={() => setError('')}>
                <Alert.Heading>Error</Alert.Heading>
                <p>{error}</p>
              </Alert>
            </Col>
          </Row>
        )}

        {/* Loading Spinner */}
        {loading && (
          <Row className="mb-5 text-center">
            <Col md={12}>
              <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p className="mt-3 text-muted">Fetching weather data...</p>
            </Col>
          </Row>
        )}

        {/* Weather Data Display */}
        {weatherData && !loading && (
          <Row className="mb-5">
            <Col md={8} className="mx-auto">
              <Card className="feature-card bg-gradient">
                <Card.Body className="p-5">
                  {/* Main Weather Info */}
                  <Row className="mb-4">
                    <Col md={12} className="text-center mb-4">
                      <h2 className="mb-2">
                        {weatherData.name}, {weatherData.sys?.country}
                      </h2>
                      <div className="weather-icon" style={{ fontSize: '4rem' }}>
                        {getWeatherIcon(weatherData.weather[0]?.description)}
                      </div>
                      <p className="text-capitalize text-muted mb-2">
                        {weatherData.weather[0]?.description}
                      </p>
                    </Col>
                  </Row>

                  {/* Temperature Display */}
                  <Row className="mb-4 text-center">
                    <Col md={12}>
                      <div className="temperature-display">
                        <h1 className="display-1 fw-bold mb-0" style={{ color: '#667eea' }}>
                          {Math.round(weatherData.main?.temp)}°C
                        </h1>
                        <small className="text-muted">
                          Feels like {Math.round(weatherData.main?.feels_like)}°C
                        </small>
                      </div>
                    </Col>
                  </Row>

                  {/* Weather Details Grid */}
                  <Row className="mb-4">
                    <Col md={6} className="mb-3">
                      <Card className="detail-card bg-light">
                        <Card.Body className="text-center">
                          <h6 className="text-muted mb-2">💧 Humidity</h6>
                          <h4 className="fw-bold mb-0">{weatherData.main?.humidity}%</h4>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Card className="detail-card bg-light">
                        <Card.Body className="text-center">
                          <h6 className="text-muted mb-2">💨 Wind Speed</h6>
                          <h4 className="fw-bold mb-0">{weatherData.wind?.speed} m/s</h4>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col md={6} className="mb-3">
                      <Card className="detail-card bg-light">
                        <Card.Body className="text-center">
                          <h6 className="text-muted mb-2">🌡️ Pressure</h6>
                          <h4 className="fw-bold mb-0">{weatherData.main?.pressure} hPa</h4>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Card className="detail-card bg-light">
                        <Card.Body className="text-center">
                          <h6 className="text-muted mb-2">👁️ Visibility</h6>
                          <h4 className="fw-bold mb-0">
                            {(weatherData.visibility / 1000).toFixed(1)} km
                          </h4>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  {/* Additional Info */}
                  <Row className="border-top pt-4">
                    <Col md={6} className="mb-2">
                      <p className="mb-1">
                        <strong>Min Temp:</strong> {Math.round(weatherData.main?.temp_min)}°C
                      </p>
                      <p>
                        <strong>Max Temp:</strong> {Math.round(weatherData.main?.temp_max)}°C
                      </p>
                    </Col>
                    <Col md={6} className="mb-2">
                      <p className="mb-1">
                        <strong>Wind Direction:</strong> {weatherData.wind?.deg}°
                      </p>
                      <p>
                        <strong>Cloud Coverage:</strong> {weatherData.clouds?.all}%
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* No Data Message */}
        {!weatherData && !loading && !error && (
          <Row className="mb-5">
            <Col md={8} className="mx-auto text-center">
              <Card className="feature-card bg-light">
                <Card.Body className="p-5">
                  <p className="text-muted">
                    Enter a city name to get started with weather information
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Info Box */}
        <Row className="mb-5">
          <Col md={12}>
            <Card className="feature-card bg-info bg-opacity-10">
              <Card.Body className="p-4">
                <h5 className="mb-3">📚 About the Data</h5>
                <p className="mb-2">
                  <strong>Data Source:</strong> OpenWeather API
                </p>
                <p className="mb-2">
                  <strong>Temperature Unit:</strong> Celsius (°C)
                </p>
                <p className="mb-2">
                  <strong>Wind Speed Unit:</strong> Meters per second (m/s)
                </p>
                <p>
                  <strong>Updates:</strong> Data is fetched in real-time when you search for a city
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Weather
