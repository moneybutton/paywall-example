const uuid = require('uuid')

class MockDatabase {
  constructor () {
    this.posts = {
      'rp5nchakafs2a49t': {
        id: 'rp5nchakafs2a49t',
        title: 'What is Lorem Ipsum?',
        authorPaymail: '32750@moneybutton.com',
        freeContent: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s'
      },
      '2jbvbct9dqqrfhk7': {
        id: '2jbvbct9dqqrfhk7',
        price: '0.01',
        currency: 'USD',
        title: 'What is Lorem Ipsum?',
        authorPaymail: '32750@moneybutton.com',
        freeContent: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
        paidContent: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
      }
    }
    this.sessions = {}
    this.purchases = {}
  }

  createSession (userId) {
    if (this.sessions[userId]) {
      return this.sessions[userId]
    }
    const sessionId = uuid.v4()

    this.sessions[sessionId] = {
      sessionId, userId
    }
    return this.sessions[sessionId]
  }

  getSession (sessionId) {
    return this.sessions[sessionId]
  }

  createPost (attributes) {
    const id = uuid.v4()

    this.posts[id] = {
      id,
      price: '0.01',
      currency: 'USD',
      ...attributes
    }
    return this.posts[id]
  }

  getPosts (userId) {
    const posts = []

    for (let [postId, data] of Object.entries(this.posts)) {
      if (this.purchases[`${userId}-${postId}`]) {
        posts.push({  ...data, paidContent: data.paidContent ? data.paidContent : false })
      } else {
        posts.push({  ...data, paidContent: data.paidContent ? true : false })
      }
    }
    return posts
  }

  createPurchase (userId, postId) {
    this.purchases[`${userId}-${postId}`] = { status: 'sent' }
  }

  updatePurchase (userId, postId) {
    this.purchases[`${userId}-${postId}`] = { status: 'done' }
  }
}

module.exports = MockDatabase
