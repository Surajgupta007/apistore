import { useState } from 'react'
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'
import './Pages.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Form validation
  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters long'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }

    return newErrors
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    
    // Simulate API call (in real application, you would send this to a backend)
    try {
      setTimeout(() => {
        console.log('Form submitted:', formData)
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
        setErrors({})
        setIsLoading(false)
        
        // Hide success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000)
      }, 1000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="page-wrapper">
      <Container className="py-5">
        {/* Header */}
        <Row className="mb-5 text-center">
          <Col md={12}>
            <h1 className="display-4 fw-bold mb-3">Contact Us</h1>
            <p className="lead text-muted">
              Have questions? We'd love to hear from you. Send us a message!
            </p>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={8} className="mx-auto">
            {/* Success Alert */}
            {submitted && (
              <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>
                <Alert.Heading>Success!</Alert.Heading>
                <p>
                  Thank you for reaching out! Your message has been sent successfully. 
                  We'll get back to you as soon as possible.
                </p>
              </Alert>
            )}

            {/* Contact Form Card */}
            <Card className="feature-card">
              <Card.Body className="p-5">
                <Form onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold mb-2">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={errors.name ? 'is-invalid' : ''}
                    />
                    {errors.name && (
                      <Form.Control.Feedback type="invalid" className="d-block">
                        {errors.name}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  {/* Email Field */}
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold mb-2">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'is-invalid' : ''}
                    />
                    {errors.email && (
                      <Form.Control.Feedback type="invalid" className="d-block">
                        {errors.email}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  {/* Message Field */}
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold mb-2">Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      rows={5}
                      placeholder="Enter your message here..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className={errors.message ? 'is-invalid' : ''}
                    />
                    {errors.message && (
                      <Form.Control.Feedback type="invalid" className="d-block">
                        {errors.message}
                      </Form.Control.Feedback>
                    )}
                    <Form.Text className="text-muted">
                      Message must be at least 10 characters long
                    </Form.Text>
                  </Form.Group>

                  {/* Submit Button */}
                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg"
                    disabled={isLoading}
                    className="w-100"
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Contact Information */}
        <Row className="mb-5">
          <h2 className="section-title text-center mb-5">Other Ways to Reach Us</h2>
          <Col md={4} className="mb-4">
            <Card className="feature-card text-center h-100">
              <Card.Body className="p-4">
                <div className="feature-icon mb-3">📧</div>
                <h5>Email</h5>
                <p>
                  <strong>info@weatherapp.com</strong>
                </p>
                <small className="text-muted">We'll respond within 24 hours</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="feature-card text-center h-100">
              <Card.Body className="p-4">
                <div className="feature-icon mb-3">📞</div>
                <h5>Phone</h5>
                <p>
                  <strong>+1-800-WEATHER</strong>
                </p>
                <small className="text-muted">Mon-Fri, 9AM-6PM EST</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="feature-card text-center h-100">
              <Card.Body className="p-4">
                <div className="feature-icon mb-3">📍</div>
                <h5>Address</h5>
                <p>
                  <strong>123 Weather Street</strong><br />
                  <strong>City, TC 12345</strong>
                </p>
                <small className="text-muted">Visit us anytime</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Contact
