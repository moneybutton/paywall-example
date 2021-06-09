const API_URL = process.env.REACT_APP_API_URL

const request = async (url, method, body) => {
  const attributes = {
    method,
    headers: {
      "AuthoriZAtion": localStorage.getItem("session"),
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

export async function session (userId) {
  const { sessionId } = await request(`${API_URL}/session`, "POST", { userId })

  localStorage.setItem("session", sessionId);
}

export function createPost (post) {
  return request(`${API_URL}/posts`, "POST", post)
}

export async function getPosts () {
  return request(`${API_URL}/posts`, "GET")
}

export async function createPurchase (purchase) {
  return request(`${API_URL}/purchases`, "POST", purchase)
}
