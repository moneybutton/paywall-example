
export default async function createPost (attributes) {
  let post = null, error = null
  try {
    const res = await fetch(
      'https://webhook-test-api.now.sh/posts',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(attributes)
      }
    )
    const json = await res.json()
    if (json.data !== undefined) {
      post = json.data
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
  return post
}
