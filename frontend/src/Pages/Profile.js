import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import { useUser } from "../context/UserContext"
import { getUser } from "../services/fetchers"
import { useNavigate } from "react-router-dom"
import BoardGameCard from "../components/BoardGameCard"

function Profile() {
  const { setUser } = useUser()
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const savedUser = localStorage.getItem("userId")
      const user = savedUser ? JSON.parse(savedUser) : null
      if (user) {
        setUser(user)
        const userResp = await getUser(user)
        setUserData(userResp)
      } else {
        navigate("/")
      }
    }

    fetchUser()
  }, [setUser])

  if (!userData) {
    return <h1>Loading...</h1>
  }

  const boardGameCollection = () => {
    if(userData.board_games === "No board games"){
      return <h3>No board games in collection</h3>
    } else {
      return userData.board_games.map((boardGame) => {
        return <BoardGameCard key={boardGame.id} boardGame={boardGame} />
      })
    }
  }

  return (
    <div>
      <NavBar />
      <div className="profile">
        <h2 className="text-center">Profile</h2>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Username: {userData.user.username}</h5>
          </div>
        </div>
      </div>
      <div>
        <h2>Board Game Collection</h2>
        {boardGameCollection()}
      </div>
    </div>
  )
}

export default Profile
