import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Spinner, Alert, Form } from 'react-bootstrap'
import './Pages.css'

function Movies() {
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const TVMAZE_API_URL = 'https://api.tvmaze.com'

  // Fetch shows from TVMaze API (free, no authentication required)
  const fetchMovies = async (query = '') => {
    setLoading(true)
    setError(null)
    
    try {
      let url
      if (query.trim()) {
        url = `${TVMAZE_API_URL}/search/shows?q=${encodeURIComponent(query)}`
      } else {
        url = `${TVMAZE_API_URL}/shows?page=0`
      }
      
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (Array.isArray(data) && data.length > 0) {
        // Convert response format depending on search or normal fetch
        const shows = query ? data.map(item => item.show) : data
        setMovies(shows)
        setFilteredMovies(shows)
        setError(null)
      } else {
        setError('No shows found. Try another search!')
        setMovies([])
        setFilteredMovies([])
      }
    } catch (err) {
      setError('Error fetching shows: ' + err.message)
      setMovies([])
      setFilteredMovies([])
    } finally {
      setLoading(false)
    }
  }

  // Load shows on component mount
  useEffect(() => {
    fetchMovies()
  }, [])

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      fetchMovies(searchTerm)
    } else {
      fetchMovies()
    }
  }

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="page-wrapper">
      <Container className="py-5">
        {/* Header */}
        <Row className="mb-5">
          <Col md={12}>
            <h1 className="display-4 fw-bold mb-2">🎬 TV Shows & Entertainment</h1>
            <p className="lead text-muted">
              Discover popular TV shows powered by TVMaze API
            </p>
          </Col>
        </Row>

        {/* Search Bar */}
        <Row className="mb-4">
          <Col md={8} className="mx-auto">
            <Form onSubmit={handleSearch} className="search-form">
              <Form.Group className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="Search by show title (e.g., Breaking Bad, Game of Thrones, The Office)..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                />
                <Button variant="primary" type="submit" className="search-btn">
                  Search
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>

        {/* Error Alert */}
        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3 text-muted">Loading shows from TVMaze API...</p>
          </div>
        )}

        {/* Results Info */}
        {!loading && filteredMovies.length > 0 && (
          <Row className="mb-4">
            <Col md={12}>
              <p className="text-muted">
                Found <strong>{filteredMovies.length}</strong> show(s)
              </p>
            </Col>
          </Row>
        )}

        {/* Shows Grid */}
        {!loading && filteredMovies.length > 0 && (
          <Row>
            {filteredMovies.map(show => (
              <Col md={6} lg={4} className="mb-4" key={show.id}>
                <Card className="movie-card h-100 shadow-sm">
                  <div className="movie-poster-wrapper">
                    {show.image && show.image.original ? (
                      <Card.Img 
                        variant="top" 
                        src={show.image.original} 
                        alt={show.name}
                        className="movie-poster"
                        style={{ height: '350px', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="450"%3E%3Crect fill="%23f0f0f0" width="300" height="450"/%3E%3Ctext x="50%25" y="50%25" font-size="20" fill="%23999" text-anchor="middle" dy=".3em"%3E📺%3C/text%3E%3C/svg%3E'
                        }}
                      />
                    ) : (
                      <div className="movie-poster-placeholder">
                        <span>📺</span>
                        <p>No Image</p>
                      </div>
                    )}
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold movie-title">
                      {show.name}
                    </Card.Title>
                    <div className="mb-2">
                      <small className="text-muted">
                        Type: <strong>{show.type || 'Show'}</strong>
                      </small>
                    </div>
                    {show.rating && show.rating.average && (
                      <div className="mb-3">
                        <span className="badge bg-warning text-dark">
                          ⭐ {show.rating.average.toFixed(1)}/10
                        </span>
                      </div>
                    )}
                    {show.genres && show.genres.length > 0 && (
                      <div className="mb-2">
                        <small className="text-muted">
                          <strong>Genres:</strong> {show.genres.slice(0, 2).join(', ')}
                        </small>
                      </div>
                    )}
                    {show.language && (
                      <div className="mb-2">
                        <small className="text-muted">
                          <strong>Language:</strong> {show.language}
                        </small>
                      </div>
                    )}
                    {show.summary && (
                      <p className="text-muted small flex-grow-1">
                        {show.summary.replace(/<[^>]*>/g, '').substring(0, 100)}...
                      </p>
                    )}
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="w-100 mt-auto"
                      href={show.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on TVMaze →
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* No Results */}
        {!loading && filteredMovies.length === 0 && movies.length > 0 && (
          <Alert variant="info" className="text-center">
            <strong>No shows found.</strong> Try searching with different keywords!
          </Alert>
        )}

        {/* No Shows Loaded */}
        {!loading && movies.length === 0 && !error && (
          <Alert variant="warning" className="text-center">
            <strong>Failed to load shows.</strong> Please try reloading the page.
          </Alert>
        )}
      </Container>
    </div>
  )
}

export default Movies
