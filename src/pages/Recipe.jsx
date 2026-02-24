import { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Card, Button, Spinner, Alert } from 'react-bootstrap'
import './Pages.css'

function Recipe() {
  const [recipes, setRecipes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const fetchRecipes = async (query) => {
    if (!query.trim()) {
      setRecipes([])
      return
    }

    setLoading(true)
    setError('')
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      )
      const data = await response.json()
      if (data.meals) {
        setRecipes(data.meals)
      } else {
        setRecipes([])
        setError('No recipes found. Try another search!')
      }
    } catch (err) {
      setError('Error fetching recipes: ' + err.message)
      setRecipes([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      fetchRecipes(searchTerm)
    }
  }

  return (
    <Container className="page-container">
      <div className="page-header">
        <h1>🍽️ Recipe Search</h1>
        <p>Discover delicious recipes from around the world</p>
      </div>

      <Row className="mb-4">
        <Col md={8} className="mx-auto">
          <Form onSubmit={handleSearch} className="search-form">
            <Form.Group className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder="Search for recipes (e.g., Pasta, Biryani, Pizza)..."
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
          <p>Loading recipes...</p>
        </div>
      )}

      {selectedRecipe && (
        <Row className="mb-4">
          <Col md={10} className="mx-auto">
            <Card className="recipe-detail-card">
              <Card.Body>
                <Button 
                  variant="secondary" 
                  onClick={() => setSelectedRecipe(null)}
                  className="mb-3"
                >
                  ← Back
                </Button>
                <Row>
                  <Col md={4}>
                    <Card.Img 
                      src={selectedRecipe.strMealThumb} 
                      alt={selectedRecipe.strMeal}
                      className="rounded"
                    />
                  </Col>
                  <Col md={8}>
                    <h2>{selectedRecipe.strMeal}</h2>
                    <p><strong>Category:</strong> {selectedRecipe.strCategory}</p>
                    <p><strong>Cuisine:</strong> {selectedRecipe.strArea}</p>
                    
                    <h4 className="mt-4">📋 Ingredients</h4>
                    <ul>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((i) =>
                        selectedRecipe[`strIngredient${i}`] ? (
                          <li key={i}>
                            {selectedRecipe[`strIngredient${i}`]} - {selectedRecipe[`strMeasure${i}`]}
                          </li>
                        ) : null
                      )}
                    </ul>

                    <h4 className="mt-4">👨‍🍳 Instructions</h4>
                    <p>{selectedRecipe.strInstructions}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {!loading && !selectedRecipe && recipes.length > 0 && (
        <Row className="g-4">
          {recipes.map((recipe) => (
            <Col md={6} lg={4} key={recipe.idMeal}>
              <Card className="recipe-card h-100">
                <Card.Img 
                  variant="top" 
                  src={recipe.strMealThumb} 
                  alt={recipe.strMeal}
                  className="recipe-img"
                />
                <Card.Body>
                  <Card.Title className="recipe-title">{recipe.strMeal}</Card.Title>
                  <p className="recipe-category">
                    <strong>Category:</strong> {recipe.strCategory}
                  </p>
                  <p className="recipe-area">
                    <strong>Cuisine:</strong> {recipe.strArea}
                  </p>
                  <Button 
                    variant="primary" 
                    className="w-100"
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    View Recipe Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {!loading && recipes.length === 0 && !error && !selectedRecipe && (
        <div className="text-center mt-5">
          <p className="text-muted">Search for a recipe to get started!</p>
        </div>
      )}
    </Container>
  )
}

export default Recipe
