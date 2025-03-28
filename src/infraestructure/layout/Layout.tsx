import { PropsWithChildren } from "react"
import { NavBar } from "../components/navBar/NavBar"
import { Outlet, useLocation } from "react-router"

export const Layout = () => {
  // const { pathname } = useLocation()
  return (
    <main>
      <NavBar />
      <Outlet />
    </main>
  )
}
