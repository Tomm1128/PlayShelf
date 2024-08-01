import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import { useUser } from "../context/UserContext"
import { createCollection, getUser, updateCollection } from "../services/fetchers"
import { useNavigate } from "react-router-dom"
import AddToCollection from "../components/AddToCollection"

function Profile() {
  const { user, setUser } = useUser()
  const [userData, setUserData] = useState(null)
  const [collection, setCollection] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const savedUser = localStorage.getItem("userId")
      const user = savedUser ? JSON.parse(savedUser) : null
      if (user) {
        setUser(user)
        const userResp = await getUser(user)
        setUserData(userResp.user)
        setCollection(userResp.collection)
      } else {
        navigate("/")
      }
    }

    fetchUser()
  }, [setUser])

  if (!userData || !collection) {
    return <h1>Loading...</h1>
  }

  const makeCollection = () => {
     createCollection(user).then(collection => {
      setCollection(collection)
     })
  }

  const boardGameCollection = () => {
    if (collection == "No collection for user") {
      return (
        <div>
          <h3>No board games in collection</h3>
          <button onClick={makeCollection}>Create Collection</button>
        </div>
      )
    } else {
      return (
        <AddToCollection collection={collection} setCollection={setCollection}/>
      )
    }
  }

  return (
    <div>
      <NavBar />
      <div className="profile">
        <h2 className="text-center">Profile</h2>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Username: {userData.username}</h5>
          </div>
        </div>
      </div>
      <div className="collection-section">
        <h2>Board Game Collection</h2>
        {boardGameCollection()}
      </div>
    </div>
  )
}

export default Profile
