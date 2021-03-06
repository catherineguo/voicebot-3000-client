import React, { Component } from 'react'
import './App.scss'
import { Route, Link } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import LandingPage from './landingPage/LandingPage'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import MyGifs from './gifs/components/MyGifs'
import GifNew from './gifs/components/GifNew'
import GifEdit from './gifs/components/GifEdit'
import GifSearch from './gifs/components/GifSearch'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      flashMessage: '',
      flashType: null
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  flash = (message, type) => {
    this.setState({ flashMessage: message, flashType: type })

    clearTimeout(this.messageTimeout)

    this.messageTimeout = setTimeout(() => this.setState({flashMessage: null
    }), 2500)
  }

  render () {
    const { flashMessage, flashType, user } = this.state

    return (
      <div className='app-container'>
        <Header user={user} />
        {flashMessage && <h3 className={flashType}>{flashMessage}</h3>}
        <main className="container">
          <Route exact path='/' render={() => (
            <LandingPage user={user} />
          )} />
          <Route exact path='/gif-box-client' render={() => (
            <LandingPage user={user} />
          )} />
          <Route path='/gif-box-client/sign-up' render={() => (
            <SignUp flash={this.flash} setUser={this.setUser} />
          )} />
          <Route path='/gif-box-client/sign-in' render={() => (
            <SignIn flash={this.flash} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/gif-box-client/sign-out' render={() => (
            <SignOut flash={this.flash} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/gif-box-client/change-password' render={() => (
            <ChangePassword flash={this.flash} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/gif-box-client/my-gifs' render={() => (
            <MyGifs flash={this.flash} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/gif-box-client/gifs/save-new' render={() => (
            <GifNew flash={this.flash} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/gif-box-client/gifs/:id/edit' render={() => (
            <GifEdit flash={this.flash} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/gif-box-client/search' render={() => (
            <GifSearch flash={this.flash} user={user} />
          )} />
        </main>
      </div>
    )
  }
}

export default App
