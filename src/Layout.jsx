import { useState, useEffect } from 'react'
import { useRoutes } from 'react-router'
import TopNav from './components/TopNav'
import IntroBox from './components/IntroBox'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import CreatureBrowser from './pages/CreatureBrowser'
import CreaturePage from './pages/CreaturePage'
import About from './pages/About'
import PostPage from './pages/PostPage'
import NotFound from './pages/NotFound'
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
          path: "creatures/",
          children: [
            {
              index: true,
              element: <CreatureBrowser />
            },
            {
              path: "page/:id",
              element: <CreaturePage />
            }
          ]
        },
        {
          path: "about",
          element: <About />
        },
        {
          path: "create/:id",
          element: <CreatePost />
        },
        {
          path: "edit/:id",
          element: <EditPost />
        },
        {
          path: "post/:id",
          element: <PostPage />
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
