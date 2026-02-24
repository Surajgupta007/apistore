import { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Card, Button, Spinner, Alert } from 'react-bootstrap'
import './Pages.css'

function Products() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Fetch all products and categories on mount
  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  // Filter products when search or category changes
  useEffect(() => {
    filterProducts()
  }, [searchTerm, selectedCategory, products])

  const fetchProducts = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError('Error fetching products: ' + err.message)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories')
      const data = await response.json()
      setCategories(data)
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }

  const filterProducts = () => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }

  return (
    <Container className="page-container">
      <div className="page-header">
        <h1>🛍️ E-Commerce Store</h1>
        <p>Browse our collection of products</p>
      </div>

      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label className="fw-bold">Search Products</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label className="fw-bold">Category</Form.Label>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {error && <Alert variant="danger" className="text-center">{error}</Alert>}

      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Loading products...</p>
        </div>
      )}

      {selectedProduct && (
        <Row className="mb-4">
          <Col md={10} className="mx-auto">
            <Card className="recipe-detail-card">
              <Card.Body>
                <Button 
                  variant="secondary" 
                  onClick={() => setSelectedProduct(null)}
                  className="mb-3"
                >
                  ← Back
                </Button>
                <Row>
                  <Col md={4}>
                    <div className="product-detail-img">
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.title}
                        className="rounded"
                        style={{ maxHeight: '300px', objectFit: 'contain' }}
                      />
                    </div>
                  </Col>
                  <Col md={8}>
                    <h2>{selectedProduct.title}</h2>
                    <p className="text-muted">{selectedProduct.category}</p>
                    
                    <h4 className="text-success mt-3">Price: ${selectedProduct.price.toFixed(2)}</h4>
                    <p className="mt-3"><strong>Rating:</strong> ⭐ {selectedProduct.rating?.rate || 'N/A'} ({selectedProduct.rating?.count || 0} reviews)</p>

                    <h4 className="mt-4">📝 Description</h4>
                    <p>{selectedProduct.description}</p>

                    <Button 
                      variant="success" 
                      size="lg"
                      className="mt-3"
                    >
                      Add to Cart
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {!loading && !selectedProduct && (
        <>
          <p className="text-muted mb-3">Showing {filteredProducts.length} products</p>
          {filteredProducts.length > 0 ? (
            <Row className="g-4">
              {filteredProducts.map((product) => (
                <Col md={6} lg={4} key={product.id}>
                  <Card className="product-card h-100">
                    <div className="product-img-wrapper">
                      <Card.Img 
                        variant="top" 
                        src={product.image} 
                        alt={product.title}
                        className="product-img"
                      />
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="product-title">{product.title}</Card.Title>
                      <p className="product-category text-muted">{product.category}</p>
                      <p className="product-price text-success fw-bold">
                        ${product.price.toFixed(2)}
                      </p>
                      <p className="product-rating">
                        ⭐ {product.rating?.rate || 'N/A'} ({product.rating?.count || 0})
                      </p>
                      <p className="product-description text-muted small flex-grow-1">
                        {product.description.substring(0, 100)}...
                      </p>
                      <Button 
                        variant="primary" 
                        className="mt-auto"
                        onClick={() => setSelectedProduct(product)}
                      >
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center mt-5">
              <p className="text-muted">No products found!</p>
            </div>
          )}
        </>
      )}
    </Container>
  )
}

export default Products
