import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import Layout from "../components/Layout"
import { createPost } from "../util/api"

export default function Create () {
  const [title, setTitle] = useState("")
  const [freeContent, setFreeContent] = useState("")
  const [paidContent, setPaidContent] = useState("")
  const [authorPaymail, setAuthorPaymail] = useState("")

  const [created, setCreated] = useState(false)

  const onSubmit = async () => {
    await createPost({ title, freeContent, paidContent, authorPaymail })

    setCreated(true)
  }

  if (created) {
    return <Redirect to="/" />
  }

  return (
    <>
      <Layout>
        <h1>Create Post</h1>

        <input
          type="text"
          value={authorPaymail}
          className="field"
          placeholder="Author paymail"
          onChange={event => setAuthorPaymail(event.target.value)}
        />

        <br />
        <input
          type="text"
          value={title}
          className="field"
          placeholder="Title"
          onChange={event => setTitle(event.target.value)}
        />

        <br />
        <textarea
          value={freeContent}
          className="field"
          placeholder="Free content."
          onChange={event => setFreeContent(event.target.value)}
        />

        <br />
        <textarea
          value={paidContent}
          className="field"
          placeholder="Paid content."
          onChange={event => setPaidContent(event.target.value)}
        />

        <br />
        <button type="button" onClick={onSubmit}>Create</button>
      </Layout>

      <style jsx>{`
      .field {
        margin-bottom: 5px;
      }
      .field:last-of-type {
        margin-bottom: 10px;
      }
      textarea {
        width: 90%;
        height: 100px;
      }
      `}</style>
    </>
  )
}
