
export default async function getPost (postId) {
  let post = null, author = null, error = null
  try {
    const res = await fetch(
      `https://webhook-test-api.now.sh/posts/${postId}`,
      {
        method: 'GET',
        credentials: 'include'
      }
    )
    const json = await res.json()
    if (json.data !== undefined) {
      post = json.data
      if (json.included !== undefined) {
        author = json.included
      }
    } else if (json.error !== undefined) {
      error = json.error
    }
  } catch (err) {
    console.error(err)
    error = 'Unexpected network error.'
  }
  if (error !== null) {
    throw new Error(error)
  }
  return { post, author }
}
