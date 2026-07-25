import { useState, useEffect } from 'react'
import { useRoutes } from 'react-router'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import About from './pages/About'
import NotFound from './pages/NotFound'
import TopNav from './components/TopNav'
import IntroBox from './components/IntroBox'
import './Layout.css'

function Layout() {

  const [acknowledged, setAcknowledged] = useState(false)

  const acknowledgeIntro = () => {
    localStorage.setItem("finsurf_sawintro", true)
    setAcknowledged(true)
  }

  let element = useRoutes([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <ReadPosts />
        },
        {
          path: "create",
          element: <CreatePost />
        },
        {
          path: "about",
          element: <About />
        },
        {
          path: "edit/:id",
          element: <EditPost />
        },
        {
          path: "*",
          element: <NotFound />
        }
      ]
    }
  ])

  useEffect(() => {
    if (localStorage.getItem("finsurf_sawintro") === "true")
      setAcknowledged(true)
  }, [])

  return (
    <div className="whole-page">
      <TopNav></TopNav>
      {acknowledged ? "" : <IntroBox hideFunction={acknowledgeIntro} />}
      {element}
    </div>
  )
}

export default Layout
