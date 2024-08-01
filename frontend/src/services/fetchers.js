const urlBoardGames = "http://localhost:9292/board_games/"
const urlLogin = "http://localhost:9292/login"
const urlUser = "http://localhost:9292/users"
const urlReview = "http://localhost:9292/reviews"
const urlCollection = "http://localhost:9292/collections"

const getAllBoardGames = () => {
  return fetch(urlBoardGames).then((resp) => resp.json())
}

const getBoardGameData = (id) => {
  return fetch(urlBoardGames + id).then((resp) => resp.json())
}

const loginUser = (username, password) => {
  return fetch(urlLogin, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then((resp) => resp.json())
}

const createUser = (user) => {
  return fetch(urlUser, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  }).then((resp) => resp.json())
}

const getUser = (id) => {
  return fetch(urlUser + "/" + id).then((resp) => resp.json())
}

const createReview = (review) => {
  return fetch(urlReview, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  }).then((resp) => resp.json())
}

const updateReview = (review) => {
  return fetch(urlReview + "/" + review.id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  }).then((resp) => resp.json())
}

const deleteReview = (review) => {
  return fetch(urlReview + "/" + review.id, {
    method: "DELETE",
  }).then((resp) => resp.json())
}

const createCollection = (user_id) => {
  return fetch(urlCollection, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id }),
  }).then((resp) => resp.json())
}

const updateCollection = (updatedCollection) => {
  return fetch(urlCollection + "/" + updatedCollection.collection_id, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedCollection),
  }).then((resp) => resp.json())
}

export {
  getAllBoardGames,
  getBoardGameData,
  loginUser,
  createUser,
  getUser,
  createReview,
  updateReview,
  deleteReview,
  createCollection,
  updateCollection,
}
