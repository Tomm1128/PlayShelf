import { useState } from "react"
import { useUser } from "../context/UserContext"

const initialValues = {
  title: "",
  body: "",
  rating: "",
}

function ReviewForm({
  review = initialValues,
  closeForm,
  boardGameId,
  handleReview
}) {
  const [formData, setFormData] = useState(review)
  const { user } = useUser()

  const updateFormData = ({ target }) => {
    const newData = {
      ...formData,
      [target.name]: target.value,
    }

    setFormData(newData)
  }

  const sanitizeReview = () => {
    const newReview = {
      ...formData,
      board_game_id: boardGameId,
      user_id: user,
    }
    return newReview
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    closeForm()
    const newReview = sanitizeReview()
    handleReview(newReview)
  }

  return (
    <div className="container mt-5">
      <h2>Add a Review</h2>
      <form className="review-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={updateFormData}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Review</label>
          <textarea
            className="form-control"
            id="body"
            rows="3"
            name="body"
            value={formData.body}
            onChange={updateFormData}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            className="form-control"
            id="rating"
            min="1"
            max="5"
            name="rating"
            value={formData.rating}
            onChange={updateFormData}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default ReviewForm
