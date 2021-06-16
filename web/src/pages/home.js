import React, { useEffect, useState } from "react"
import { getPosts } from "../util/api"
import Post from "../components/Post"

export default function Home () {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    (async () => {
      setPosts(await getPosts())
    })()
  }, [])

  return (
    <div>
      <header>
        <nav>
          <a href="/">Home</a>
          <a href="/create">Create</a>
        </nav>
      </header>
      <section>
        {Object.keys(posts).length === 0 && (
          <p>No Posts Found</p>
        )}

        {Object.keys(posts).length !== 0 && (
          <ul>
            {Object.values(posts).map(([post, postId]) => <Post post={post} key={postId} />)}
          </ul>
        )}
      </section>
    </div>
  )
}
