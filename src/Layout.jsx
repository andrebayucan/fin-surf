import { useState, useEffect } from 'react'
import { useRoutes } from 'react-router'
import TopNav from './components/TopNav'
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

  return (
    <>
       <TopNav></TopNav>
      <div className="page-content">
        {element}
      </div>
    </>
  )
}

export default Layout
