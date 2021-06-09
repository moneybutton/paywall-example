import React, { useEffect, useState } from "react"
import { getPosts } from "../util/api"
import Post from "../components/Post"
import Layout from "../components/Layout"

const buildPosts = (posts) => {
  const components = []

  for (let [postId, post] of Object.entries(posts)) {
    components.push(
      <ul key={postId}>
        <Post post={post} />
      </ul>
    )
  }
  return components
}

export default function Home () {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    (async () => {
      const user = JSON.parse(localStorage.getItem("user"))

      if (user) {
        setPosts(await getPosts(user.id))
      }
    })()
  }, [])

  return (
    <Layout>
      {Object.keys(posts).length === 0 && (
        <p>No Posts Found</p>
      )}

      {Object.keys(posts).length !== 0 && (
        buildPosts(posts)
      )}

      <style jsx>{`
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </Layout>
  )
}
