
export default async function getPosts () {
  let posts = null, authors = null, error = null
  try {
    const res = await fetch(
      'https://webhook-test-api.now.sh/posts',
      {
        method: 'GET',
        credentials: 'include'
      }
    )
    const json = await res.json()
    if (json.data !== undefined) {
      posts = json.data
      if (json.included !== undefined) {
        authors = json.included
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
  return { posts, authors }
}
