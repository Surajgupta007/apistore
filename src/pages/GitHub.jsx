import { useState } from 'react'
import { Container, Row, Col, Form, Card, Button, Spinner, Alert } from 'react-bootstrap'
import './Pages.css'

function GitHub() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)

  const fetchUsers = async (query) => {
    if (!query.trim()) {
      setUsers([])
      return
    }

    setLoading(true)
    setError('')
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${query}&per_page=12`
      )
      const data = await response.json()
      if (data.items) {
        setUsers(data.items)
      } else {
        setUsers([])
        setError('No users found. Try another search!')
      }
    } catch (err) {
      setError('Error fetching users: ' + err.message)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const fetchUserDetails = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`)
      const data = await response.json()
      setSelectedUser(data)
    } catch (err) {
      setError('Error fetching user details: ' + err.message)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      fetchUsers(searchTerm)
    }
  }

  return (
    <Container className="page-container">
      <div className="page-header">
        <h1>👨‍💻 GitHub Users Explorer</h1>
        <p>Search and explore GitHub developers</p>
      </div>

      <Row className="mb-4">
        <Col md={8} className="mx-auto">
          <Form onSubmit={handleSearch} className="search-form">
            <Form.Group className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder="Search GitHub users (e.g., torvalds, gvanrossum)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <Button variant="primary" type="submit" className="search-btn">
                Search
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      {error && <Alert variant="danger" className="text-center">{error}</Alert>}

      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Loading GitHub users...</p>
        </div>
      )}

      {selectedUser && (
        <Row className="mb-4">
          <Col md={10} className="mx-auto">
            <Card className="recipe-detail-card">
              <Card.Body>
                <Button 
                  variant="secondary" 
                  onClick={() => setSelectedUser(null)}
                  className="mb-3"
                >
                  ← Back
                </Button>
                <Row>
                  <Col md={4} className="text-center">
                    <img 
                      src={selectedUser.avatar_url} 
                      alt={selectedUser.login}
                      className="rounded-circle mb-3"
                      style={{ width: '200px', height: '200px' }}
                    />
                  </Col>
                  <Col md={8}>
                    <h2>{selectedUser.name || selectedUser.login}</h2>
                    <p className="text-muted">@{selectedUser.login}</p>
                    
                    {selectedUser.bio && (
                      <p><strong>Bio:</strong> {selectedUser.bio}</p>
                    )}
                    
                    {selectedUser.location && (
                      <p><strong>📍 Location:</strong> {selectedUser.location}</p>
                    )}
                    
                    {selectedUser.company && (
                      <p><strong>🏢 Company:</strong> {selectedUser.company}</p>
                    )}
                    
                    {selectedUser.blog && (
                      <p><strong>🌐 Website:</strong> <a href={selectedUser.blog} target="_blank" rel="noopener noreferrer">{selectedUser.blog}</a></p>
                    )}

                    <p><strong>📊 Public Repos:</strong> {selectedUser.public_repos}</p>
                    <p><strong>👥 Followers:</strong> {selectedUser.followers}</p>
                    <p><strong>👤 Following:</strong> {selectedUser.following}</p>

                    <Button 
                      variant="info" 
                      href={selectedUser.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3"
                    >
                      View on GitHub
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {!loading && !selectedUser && users.length > 0 && (
        <Row className="g-4">
          {users.map((user) => (
            <Col md={6} lg={4} key={user.id}>
              <Card className="github-card h-100">
                <div className="github-avatar-wrapper">
                  <Card.Img 
                    variant="top" 
                    src={user.avatar_url} 
                    alt={user.login}
                    className="github-avatar"
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="github-username">{user.login}</Card.Title>
                  <p className="github-type text-muted">{user.type}</p>
                  <Button 
                    variant="primary" 
                    className="mt-auto"
                    onClick={() => fetchUserDetails(user.login)}
                  >
                    View Profile
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {!loading && users.length === 0 && !error && !selectedUser && (
        <div className="text-center mt-5">
          <p className="text-muted">Search for a GitHub user to get started!</p>
        </div>
      )}
    </Container>
  )
}

export default GitHub
