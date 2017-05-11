import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp'
import ListingComponent from './Listing.js';
import './Listings.css';

const API_KEY = process.env.REACT_APP_SECRET;
const ETSY_API_URL = 'https://openapi.etsy.com/v2/listings/active.js?api_key=' + API_KEY + '&fields=title,price&includes=Images(url_75x75)&sort_on=score&limit=10';

class Listings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listings: []
    }
  }

  componentWillMount() {
    this.fetchInitialListings();
  }

  renderListings = (data) => {
    let listings = data.results;
    console.log(listings);
    return listings.map((listing, index) => {
      return (
        <ul key={index}>
          <ListingComponent listing={listing} />
        </ul>
      )
    });
  }

  fetchInitialListings() {
    fetchJsonp(ETSY_API_URL)
    .then((response) => response.json())
    .then((listings) => {
      this.setState({listings: listings});
    });
  }

  render() {

    if (this.state.listings.length === 0 ) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div className="listingsContainer">
        <h2 className="topProductsH2"> Top Etsy Products </h2>
        {this.renderListings(this.state.listings)}
      </div>
    );
  }
}

export default Listings;
