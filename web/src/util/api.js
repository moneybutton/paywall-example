
const request = async (url, method, body) => {
  const attributes = {
    method,
    headers: {
      "Authorization": localStorage.getItem("session"),
      "Content-Type": "application/json"
    }
  }
  if (body) {
    attributes.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(url, attributes)
    if (response.status !== 200) {
      throw new Error("API Error")
    }
    return response.json()
  } catch (error) {
    throw new Error("API Error")
  }
}

export async function session () {
  const { sessionId } = await request(`/session`, "POST")

  localStorage.setItem("session", sessionId);
}

export function getSessionId () {
  return localStorage.getItem("session")
}

export function createPost (post) {
  return request(`/posts`, "POST", post)
}

export async function getPosts () {
  return request(`/posts`, "GET")
}

export async function createPurchase (purchase) {
  return request(`/purchases`, "POST", purchase)
}
