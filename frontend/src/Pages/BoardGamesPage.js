import { useState, useEffect } from "react"
import { useUser } from "../context/UserContext"
import BoardGameCard from "../components/BoardGameCard"
import { getAllBoardGames } from "../services/fetchers"
import NavBar from "../components/NavBar"
import { useNavigate } from "react-router-dom"

function BoardGamePage() {
  const { setUser } = useUser()
  const [boardGames, setBoardGames] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getAllBoardGames().then((boardGamesList) => setBoardGames(boardGamesList))
  }, [])

  useEffect(() => {
    const savedUser = localStorage.getItem("userId")
    const user = savedUser ? JSON.parse(savedUser) : null
    if (user) {
      setUser(user)
    } else {
      navigate("/")
    }
  }, [])

  if (!boardGames) {
    return (
      <div>
        <h1 className="board-games-header">Board Games</h1>
        <h2>Loading....</h2>
      </div>
    )
  }

  const boardGameCards = boardGames.map((boardGame) => {
    return <BoardGameCard key={boardGame.id} boardGame={boardGame} />
  })

  return (
    <div>
      <NavBar />
      <div className="container">
        <header className="my-4">
          <h1 className="text-center">Board Games</h1>
        </header>
        <div className="row row-cols-1 row-cols-md-2 g-4">{boardGameCards}</div>
      </div>
    </div>
  )
}

export default BoardGamePage
