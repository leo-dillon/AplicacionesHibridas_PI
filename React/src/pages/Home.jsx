import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import HomeUnlogged from "../components/home/homeUnlogged"
import HomeLogged from "../components/home/HomeLogged"

function  Home() {
  const { userData } = useContext(AuthContext)
  return (
    <div className="w-full max-w-8/10 mx-auto p-4">
      {
        ( userData )
          ? <HomeLogged />
          : <HomeUnlogged />
      }
    </div>
  )
}
export default Home 