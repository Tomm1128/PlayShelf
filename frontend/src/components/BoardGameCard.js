import { Link } from "react-router-dom"

function BoardGameCard({ boardGame }) {
  return (
    <div className="col">
      <div className="card" style={{ width: "20rem" }}>
        <img
          src={boardGame.image}
          className="card-img-top"
          alt={boardGame.name}
        />
        <div className="card-body">
          <h5 className="card-title">{boardGame.name}</h5>
          <p className="card-text">{boardGame.description}</p>
          <Link to={`/board_games/${boardGame.id}`}>View Board Game</Link>
        </div>
      </div>
    </div>
  )
}

export default BoardGameCard
