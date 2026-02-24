import { Container, Row, Col } from 'react-bootstrap'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-custom mt-5">
      <Container>
        <Row className="py-4">
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Weather App</h5>
            <p>Providing accurate weather information for your daily planning.</p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Technologies</h5>
            <ul className="list-unstyled">
              <li>React</li>
              <li>React Router</li>
              <li>OpenWeather API</li>
              <li>Bootstrap</li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Info</h5>
            <p>Email: info@weatherapp.com</p>
            <p>Phone: +1-800-WEATHER</p>
          </Col>
        </Row>
        <Row className="border-top border-light pt-3">
          <Col md={12} className="text-center">
            <p>&copy; {currentYear} Weather App. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
