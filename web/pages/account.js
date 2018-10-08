import ErrorDisplay from '../components/ErrorDisplay'
import getUser from '../util/get-user'
import InfoDisplay from '../components/InfoDisplay'
import Layout from '../components/Layout'
import Loading from '../components/Loading'
import React from 'react'
import updateUser from '../util/update-user'

export default class PageAccount extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      error: null,
      info: null,
      user: null,
      moneyButtonId: ''
    }
  }

  async componentDidMount () {
    const {
      moneyButtonId
    } = this.state
    this.setState({
      loading: true,
      error: null,
      info: null
    }, async () => {
      try {
        this.setState({
          loading: false,
          user: await getUser()
        })
      } catch (err) {
        this.setState({
          loading: false,
          error: err.message
        })
      }
    })
  }

  onSubmit (event) {
    event.preventDefault()
    let {
      user,
      moneyButtonId
    } = this.state
    if (user === null) {
      return
    }
    this.setState({
      loading: true,
      error: null,
      info: null
    }, async () => {
      try {
        this.setState({
          loading: false,
          user: await updateUser(user.id, { moneyButtonId }),
          moneyButtonId: '',
          info: 'Updated user succesfully.'
        })
      } catch (err) {
        this.setState({
          loading: false,
          error: err.message
        })
      }
    })
  }

  render () {
    const {
      loading,
      error,
      info,
      user,
      moneyButtonId
    } = this.state
    return (
      <Layout>
        <h1>Account Settings</h1>
        {
          user !== null ? (
            <div>
              <div>
                <span><strong>User Id:</strong> </span>
                <span>{user.id}</span>
              </div><br />
              <div>
                <span><strong>Money Button Id:</strong> </span>
                <span>
                  {
                    user.moneyButtonId !== undefined
                      ? user.moneyButtonId
                      : 'Please, set your Money Button Id below.'
                  }
                </span>
              </div><br />
              <form onSubmit={this.onSubmit.bind(this)}>
                <input
                  type='text'
                  value={moneyButtonId}
                  onChange={event => this.setState({ moneyButtonId: event.target.value })}
                  placeholder='Enter Money Button Id.'
                  disabled={loading}
                /><br />
                <button type='submit' disabled={loading}>
                  {loading ? 'Waiting ...' : 'Update'}
                </button>
              </form>
            </div>
          ) : null
        }
        <Loading loading={loading} />
        <InfoDisplay info={info} />
        <ErrorDisplay error={error} />
        <style jsx>{`
          form input {
            margin-bottom: 5px;
          }
          form input:last-of-type {
            margin-bottom: 10px;
          }
        `}</style>
      </Layout>
    )
  }
}
