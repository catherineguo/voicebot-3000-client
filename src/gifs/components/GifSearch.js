import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import apiUrl from '../../apiConfig.js'
import messages from '../messages'

class GifSearch extends Component {
  constructor () {
    super()
    this.state = {
      searchTerms: '',
      resultGifs: []
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  searchGifs = (event) => {
    event.preventDefault()

    const { searchTerms } = this.state

    fetch('https://api.tenor.com/v1/search?tag=' + this.state.searchTerms + '&key=9Y2VG4NM64AH&limit=8&contentfilter=medium')
      .then((res) => res.json())
      .then((data) => {
        this.setState({resultGifs: data.results})
        console.log('this is gif results', this.state.resultGifs)
      })
      .catch((error) => console.log('There was a problem in fetching data'))
  }

  render() {
    const { searchTerms } = this.state
    const results = this.state.resultGifs.map(gif => {
      return (
        <div key={gif.id}>
          {console.log('this is gif.id', gif.id)}
          {console.log('this is gif.media[0].mediumgif.url', gif.media[0].mediumgif.url)}
          <a href={gif.media[0].mediumgif.url} target="_blank"><img src={gif.media[0].mediumgif.url} /></a>
          <br />
        </div>
      )
    })

    return (
      <React.Fragment>
        <form onSubmit={this.searchGifs}>
          <h2>Search for GIFs</h2>
          <h3>Powered by Tenor</h3>
          <input
            required
            name="searchTerms"
            value={searchTerms}
            type="text"
            placeholder="Search for GIFs"
            onChange={this.handleChange}
          />
          <button className='btn btn-secondary' type="submit">Search</button>
        </form>
        <div>
          {results}
        </div>
      </React.Fragment>
    )
  }
}

export default GifSearch
