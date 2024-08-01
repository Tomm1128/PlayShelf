import { useEffect, useState } from "react"
import BoardGameCard from "../components/BoardGameCard"
import { getAllBoardGames, updateCollection } from "../services/fetchers"

function AddToCollection({ collection, setCollection }) {
  const [boardGames, setBoardGames] = useState([])
  const [selectedGame, setSelectedGame] = useState("")
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    getAllBoardGames().then((boardGamesList) => setBoardGames(boardGamesList))
  }, [])

  if (!boardGames) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    )
  }

  const handleChange = ({ target }) => {
    setSelectedGame(target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const board_game_id = selectedGame
    const collection_id = collection.collection_id
    updateCollection({ board_game_id, collection_id }).then(
      (collectionResp) => {
        setCollection(collectionResp)
        setBoardGames((prevBoardGames) =>
          prevBoardGames.filter((game) => game.id !== parseInt(board_game_id))
        )
        setSelectedGame("")
      }
    )
  }

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>Add to Collection</button>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="boardGamesDropdown">Select a board game:</label>
          <select
            id="boardGamesDropdown"
            value={selectedGame}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a game
            </option>
            {boardGames.map((game) => (
              <option key={game.id} value={game.id}>
                {game.name}
              </option>
            ))}
          </select>
          <button>Submit</button>
        </form>
      ) : null}
      {collection.board_games.map((boardGame) => {
        return <BoardGameCard key={boardGame.id} boardGame={boardGame} />
      })}
    </div>
  )
}

export default AddToCollection
