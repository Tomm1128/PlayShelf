import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useUser } from "../context/UserContext"
import { createReview, getBoardGameData } from "../services/fetchers"
import ReviewBlock from "../components/ReviewBlock"
import ReviewForm from "../components/ReviewForm"
import NavBar from "../components/NavBar"

function BoardGameDetailsPage() {
  const params = useParams()
  const { setUser } = useUser()
  const [boardGameData, setBoardGameData] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()

  const fetchBoardGameData = () => {
    getBoardGameData(params.index).then((boardGameData) => {
      setBoardGameData(boardGameData)
      setReviews(boardGameData.reviews)
    })
  }

  useEffect(fetchBoardGameData, [params.index])

  useEffect(() => {
    const savedUser = localStorage.getItem("userId")
    const user = savedUser ? JSON.parse(savedUser) : null
    if (user) {
      setUser(user)
    } else {
      navigate("/")
    }
  }, [])

  if (!boardGameData || !reviews) {
    return <h1>Loading...</h1>
  }

  const addReview = (newReview) => {
    createReview(newReview).then(review => setReviews([...reviews, review]))
  }

  const reviewBlocks = reviews.map((review) => {
    return (
      <ReviewBlock
        key={review.id}
        review={review}
        boardGameId={boardGameData.id}
        reviews={reviews}
        setReviews={setReviews}
      />
    )
  })

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <img
              src={boardGameData.image}
              alt={boardGameData.name}
              className="img-fluid"
            />
          </div>
          <div className="col-md-8">
            <h1>{boardGameData.name}</h1>
            <p className="lead">{boardGameData.description}</p>
            <div className="rating">
              <strong>Rating: </strong>
              {boardGameData.average_rating} / 5
            </div>
            <hr />
            <div className="reviews">
              <h3>Reviews</h3>
              <button
                className="btn btn-primary"
                id="review_button"
                onClick={() => setShowForm(!showForm)}
              >
                Add Review
              </button>
              {showForm ? (
                <ReviewForm
                  closeForm={setShowForm}
                  boardGameId={boardGameData.id}
                  handleReview={addReview}
                />
              ) : null}
              {boardGameData.reviews.length > 0 ? (
                reviewBlocks
              ) : (
                <p>No Reviews</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoardGameDetailsPage
