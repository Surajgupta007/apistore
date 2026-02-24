import { Container, Row, Col, Card } from 'react-bootstrap'
import './Pages.css'

function About() {
  return (
    <div className="page-wrapper">
      <Container className="py-5">
        {/* Header */}
        <Row className="mb-5 text-center">
          <Col md={12}>
            <h1 className="display-4 fw-bold mb-3">About This Project</h1>
            <p className="lead text-muted">
              Learn about the Weather App and the technologies used to build it
            </p>
          </Col>
        </Row>

        {/* Project Overview */}
        <Row className="mb-5">
          <Col md={12}>
            <Card className="feature-card">
              <Card.Body className="p-5">
                <h2 className="mb-4">Project Overview</h2>
                <p>
                  The Weather App is a modern React application designed to provide users with real-time weather 
                  information for any city worldwide. Built with the latest web technologies, this application 
                  demonstrates the integration of React Router for seamless navigation and OpenWeather API for 
                  accurate weather data.
                </p>
                <p>
                  This project serves as a comprehensive example of building a Single Page Application (SPA) 
                  with proper API integration, error handling, and responsive design principles.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Technologies Used */}
        <Row className="mb-5">
          <h2 className="section-title text-center">Technologies Used</h2>
          <Col md={6} className="mb-4">
            <Card className="feature-card h-100">
              <Card.Body>
                <h4 className="mb-4">Frontend Stack</h4>
                <ul className="tech-list">
                  <li><strong>React 19.2.0</strong> - UI library for building interactive interfaces</li>
                  <li><strong>React Router 6.x</strong> - Client-side routing for seamless navigation</li>
                  <li><strong>Bootstrap 5</strong> - Responsive CSS framework for styling</li>
                  <li><strong>CSS3</strong> - Custom styling and animations</li>
                  <li><strong>Vite</strong> - Fast build tool and development server</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="feature-card h-100">
              <Card.Body>
                <h4 className="mb-4">API Integration</h4>
                <ul className="tech-list">
                  <li><strong>OpenWeather API</strong> - Real-time weather data endpoint</li>
                  <li><strong>Fetch API</strong> - Modern data fetching mechanism</li>
                  <li><strong>Error Handling</strong> - Comprehensive error management</li>
                  <li><strong>Loading States</strong> - Better UX with loading indicators</li>
                  <li><strong>Data Caching</strong> - Optimized API calls</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Features */}
        <Row className="mb-5">
          <h2 className="section-title text-center">Key Features</h2>
          <Col md={4} className="mb-4">
            <div className="feature-item">
              <div className="feature-icon">🔍</div>
              <h5>City Search</h5>
              <p>Search weather for any city worldwide with real-time results</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <h5>Weather Details</h5>
              <p>Get comprehensive weather information including temperature, humidity, wind speed</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="feature-item">
              <div className="feature-icon">🎨</div>
              <h5>Clean UI</h5>
              <p>Responsive design that works perfectly on desktop, tablet, and mobile devices</p>
            </div>
          </Col>
        </Row>

        {/* Learning Outcomes */}
        <Row className="mb-5">
          <Col md={12}>
            <Card className="feature-card">
              <Card.Body className="p-5">
                <h2 className="mb-4">Learning Outcomes</h2>
                <p>
                  Through building this application, developers will gain hands-on experience with:
                </p>
                <ul className="learning-list">
                  <li>React Hooks (useState, useEffect) for state and side effect management</li>
                  <li>React Router for client-side routing and navigation</li>
                  <li>API Integration and data fetching with proper error handling</li>
                  <li>Form validation and handling in React</li>
                  <li>Responsive design with Bootstrap and CSS</li>
                  <li>Component architecture and code organization</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Future Enhancements */}
        <Row className="mb-5">
          <Col md={12}>
            <Card className="feature-card bg-light">
              <Card.Body className="p-5">
                <h2 className="mb-4">Future Enhancements</h2>
                <ul className="enhancement-list">
                  <li>Weather forecast data (5-day, 7-day forecasts)</li>
                  <li>Multiple location favorites</li>
                  <li>Weather alerts and notifications</li>
                  <li>Dark mode theme</li>
                  <li>Air quality index information</li>
                  <li>User authentication and profiles</li>
                  <li>Mobile app version</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default About
