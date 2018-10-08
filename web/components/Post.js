import Link from 'next/link'
import moment from 'moment'
import MoneyButton from '@moneybutton/react-money-button'
import React from 'react'

const CLIENT_IDENTIFIER = '2cd27fe6e7d10a9debf201b94695f05a'

export default class Post extends React.Component {
  render () {
    let {
      user,
      post,
      author,
      onPurchase
    } = this.props
    if (user === null || post === null || author === null) {
      return null
    }
    return (
      <div className='post'>
        <p className='date'>{moment(post.createdAt).format('LLLL')}</p>
        <Link href={{ pathname: '/post', query: { postId: post.id } }}>
          <h1 className='title'><em>{post.title}</em></h1>
        </Link>
        <p>{post.free}</p>
        {
          post.paid !== null ? (
            <p>{post.paid}</p>
          ) : null
        }
        {
          post.paid === null ? (
            <div>
              <p>To continue reading, please buy this post with Money Button.</p>
              <MoneyButton
                to={author.moneyButtonId}
                amount={post.price}
                currency={'USD'}
                label={'Buy'}
                type={'buy'}
                clientIdentifier={CLIENT_IDENTIFIER}
                buttonData={JSON.stringify({
                  userId: user.id,
                  postId: post.id
                })}
                onPayment={onPurchase}
              />
            </div>
          ) : null
        }
        {
          post.paid !== null ? (
            <div>
              <p>Tip the author with Money Button.</p>
              <MoneyButton
                to={author.moneyButtonId}
                amount={post.price}
                currency={'USD'}
                label={'Tip'}
                type={'tip'}
                clientIdentifier={CLIENT_IDENTIFIER}
              />
            </div>
          ) : null
        }
        <style jsx>{`
          .post {
            margin: 0 0 30px 0;
          }
          .post div:last-of-type {
            padding-bottom: 20px;
            border-bottom: 1px solid lightgray;
          }
          .post:last-of-type div:last-of-type {
            border-bottom: none;
          }
          .post .date {
            padding: 0;
          }
          .post .title {
            margin-top: 5px;
          }
        `}</style>
      </div>
    )
  }
}
