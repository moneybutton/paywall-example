import React, { useState } from "react"
import MoneyButton from "@moneybutton/react-money-button"

const CLIENT_IDENTIFIER = process.env.REACT_APP_CLIENT_IDENTIFIER

export default function Post ({ post }) {
  const [paymentSent, setPaymentSent] = useState(false)

  const onPayment = async (payment) => {
    console.log(payment)

    setPaymentSent(true)
  }

  return (
    <div className="post">
      <h1>{post.title}</h1>

      <p>{post.freeContent}</p>

      {paymentSent && (
        <p style={{ color: "green" }}>Your payment was sent. In a couple of seconds additional content will be available.</p>
      )}

      {typeof post.paidContent !== Boolean && (
        <p style={{ color: "blue" }}>{post.paidContent}</p>
      )}

      {post.paidContent === false && (
        <h5>Post does not contains additional content.</h5>
      )}

      {post.paidContent === true && !paymentSent && (
        <div>
          <h5>Post contains additional content. To continue reading, please buy this post with Money Button.</h5>
          <MoneyButton
            type="buy"
            label="Buy"
            amount={post.price}
            to={post.authorPaymail}
            currency={post.currency}
            clientIdentifier={CLIENT_IDENTIFIER}
            buttonData={JSON.stringify({
              userId: user.id,
              postId: post.id
            })}
            onPayment={onPayment}
          />
        </div>
      )}

      <hr />

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
