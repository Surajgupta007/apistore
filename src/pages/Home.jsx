import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Pages.css'

function Home() {
  return (
    <div className="page-wrapper">
      <Container className="py-5">
        {/* Hero Section */}
        <Row className="mb-5 hero-section">
          <Col md={12} className="text-center">
            <h1 className="display-4 fw-bold mb-4">Multi-API Integration Suite 🚀</h1>
            <p className="lead mb-4">
              Explore a powerful collection of integrated APIs! Search for weather, recipes, products, and GitHub developers - all in one platform.
            </p>
            <Link to="/weather">
              <Button variant="warning" size="lg" className="me-3">
                Get Started
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline-light" size="lg">
                Learn More
              </Button>
            </Link>
          </Col>
        </Row>

        {/* APIs Section */}
        <Row className="mb-5">
          <h2 className="text-center mb-5 section-title">🌐 Available APIs</h2>
          
          <Col md={6} lg={3} className="mb-4">
            <Card className="api-card h-100">
              <Card.Body className="text-center">
                <div className="api-icon">🌤️</div>
                <Card.Title className="fw-bold">Weather API</Card.Title>
                <Card.Text className="small">
                  OpenWeather API - Get real-time weather data, temperature, humidity, and conditions for any city.
                </Card.Text>
                <Link to="/weather">
                  <Button variant="primary" size="sm" className="w-100">
                    Explore Weather
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} className="mb-4">
            <Card className="api-card h-100">
              <Card.Body className="text-center">
                <div className="api-icon">🍽️</div>
                <Card.Title className="fw-bold">Recipe API</Card.Title>
                <Card.Text className="small">
                  TheMealDB API - Search for recipes, view ingredients, and get detailed cooking instructions.
                </Card.Text>
                <Link to="/recipes">
                  <Button variant="success" size="sm" className="w-100">
                    Find Recipes
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} className="mb-4">
            <Card className="api-card h-100">
              <Card.Body className="text-center">
                <div className="api-icon">🛍️</div>
                <Card.Title className="fw-bold">Products API</Card.Title>
                <Card.Text className="small">
                  Fake Store API - Browse e-commerce products, filter by category, and view detailed information.
                </Card.Text>
                <Link to="/products">
                  <Button variant="info" size="sm" className="w-100">
                    Shop Products
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} className="mb-4">
            <Card className="api-card h-100">
              <Card.Body className="text-center">
                <div className="api-icon">🎬</div>
                <Card.Title className="fw-bold">Movies API</Card.Title>
                <Card.Text className="small">
                  Popular Movies Database - Browse popular movies, filter by genre, and view ratings and descriptions.
                </Card.Text>
                <Link to="/movies">
                  <Button variant="danger" size="sm" className="w-100">
                    Browse Movies
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Features Section */}
        <Row className="mb-5">
          <h2 className="text-center mb-5 section-title">✨ Features</h2>
          <Col md={4} className="mb-4">
            <Card className="feature-card h-100">
              <Card.Body className="text-center">
                <div className="feature-icon">🔍</div>
                <Card.Title>Advanced Search</Card.Title>
                <Card.Text>
                  Search and filter across multiple APIs with real-time results.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="feature-card h-100">
              <Card.Body className="text-center">
                <div className="feature-icon">📱</div>
                <Card.Title>Fully Responsive</Card.Title>
                <Card.Text>
                  Works seamlessly on desktop, tablet, and mobile devices.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="feature-card h-100">
              <Card.Body className="text-center">
                <div className="feature-icon">⚡</div>
                <Card.Title>Fast & Reliable</Card.Title>
                <Card.Text>
                  Live API integration with proper error handling and loading states.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Technologies Section */}
        <Row className="mb-5 py-5 bg-light rounded">
          <h2 className="text-center mb-5 section-title">🛠️ Technologies Used</h2>
          <Col md={4} className="mb-4">
            <div className="tech-box">
              <h5>Frontend</h5>
              <ul>
                <li>React.js</li>
                <li>React Router</li>
                <li>Bootstrap 5</li>
                <li>CSS3</li>
              </ul>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="tech-box">
              <h5>API Integration</h5>
              <ul>
                <li>Fetch API</li>
                <li>REST APIs</li>
                <li>Error Handling</li>
                <li>Loading States</li>
              </ul>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="tech-box">
              <h5>Features</h5>
              <ul>
                <li>useState Hook</li>
                <li>useEffect Hook</li>
                <li>Search Functionality</li>
                <li>Filter Options</li>
              </ul>
            </div>
          </Col>
        </Row>

        {/* Call to Action */}
        <Row className="mb-5 text-center cta-section">
          <Col md={12}>
            <h3 className="mb-4">Explore All APIs Today!</h3>
            <p className="mb-4">
              Choose from weather, recipes, products, or popular movies. Each API offers a unique experience.
            </p>
            <Link to="/weather">
              <Button variant="primary" size="lg" className="me-2">
                Weather API
              </Button>
            </Link>
            <Link to="/recipes">
              <Button variant="success" size="lg" className="me-2">
                Recipe API
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="info" size="lg" className="me-2">
                Products API
              </Button>
            </Link>
            <Link to="/movies">
              <Button variant="danger" size="lg">
                Movies API
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home
