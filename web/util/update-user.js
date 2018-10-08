
export default async function updateUser (id, attributes) {
  let user = null, error = null
  try {
    const res = await fetch(
      `https://webhook-test-api.now.sh/users/${id}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(attributes)
      }
    )
    const json = await res.json()
    if (json.data !== undefined) {
      user = json.data
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
  return user
}
