import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp'
import ListingComponent from './Listing.js';
import PaginationComponent from './Pagination.js';
import CurrencySelectComponent from './CurrencySelect.js';
import './Listings.css';

const API_KEY = process.env.REACT_APP_SECRET;
const ETSY_API_URL = 'https://openapi.etsy.com/v2/listings/active.js?api_key=' + API_KEY + '&fields=title,price&includes=Images(url_75x75)&sort_on=score&limit=10';
const ETSY_API_URL_OFFSET = 'https://openapi.etsy.com/v2/listings/active.js?api_key=' + API_KEY + '&fields=title,price&includes=Images(url_75x75)&sort_on=score&limit=10';
class Listings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      pageCount: 10,
      offset: 0,
    }
  }

  componentWillMount() {
    this.fetchInitialListings();
  }

  changePage(pageNumber) {
    fetchJsonp(ETSY_API_URL_OFFSET + '&offset=' + pageNumber * 10)
    .then((response) => response.json())
    .then((listings) => {
      this.setState({listings: listings});
    });
  }


  fetchInitialListings() {
    fetchJsonp(ETSY_API_URL)
    .then((response) => response.json())
    .then((listings) => {
      this.setState({listings: listings});
    });
  }

  renderListings = (data) => {
    let listings = data.results;
    return listings.map((listing, index) => {
      return (
        <ul key={index}>
          <ListingComponent listing={listing} />
        </ul>
      )
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
        <CurrencySelectComponent/>
        {this.renderListings(this.state.listings)}
        <PaginationComponent changePage={(pageNumber) => this.changePage(pageNumber)} pageCount={this.state.pageCount}/>
      </div>
    );
  }
}

export default Listings;
