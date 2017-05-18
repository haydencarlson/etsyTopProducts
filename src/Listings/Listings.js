import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import axios from 'axios';
import ListingComponent from '../Listing/Listing.js';
import PaginationComponent from '../Pagination/Pagination.js';
import './Listings.css';

const API_KEY = "6n4474o3ghjqch2x19uecqee";
const ETSY_API_URL = 'https://openapi.etsy.com/v2/listings/active.js?api_key=' + API_KEY + '&fields=title,price&includes=Images(url_75x75)&sort_on=score&limit=10';
const ETSY_API_URL_OFFSET = 'https://openapi.etsy.com/v2/listings/active.js?api_key=' + API_KEY + '&fields=title,price&includes=Images(url_75x75)&sort_on=score&limit=10';
class Listings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      pageCount: 10,
      offset: 0,
      currentCurrency: 'USD',
      GBP: 0,
      CAD: 0,
      USD: 0,
      EUR: 0
    }
  }

  componentWillMount() {
    this.fetchInitialListings();
    this.fetchExchangeRates();
  }

  fetchExchangeRates(currency, listingTitle) {
    axios.get('http://api.fixer.io/latest?symbols=USD,GBP,CAD,EUR&base=' + this.state.currentCurrency)
    .then((response) => {
      let rates = response.data.rates;
      if (rates.USD) {
        this.setState({USD: rates.USD})
      }
      this.setState({
        CAD: rates.CAD,
        EUR: rates.EUR,
        GBP: rates.GBP
      })
      var currentListings = this.state.listings.results;
      var updatedListing = currentListings.map((listing, i) => {
        if (currency === "CAD" && listing.title === listingTitle ) {
          listing.price = (listing.price * this.state.CAD).toFixed(2);
        } else if (currency === "GBP" && listing.title === listingTitle) {
          listing.price = (listing.price * this.state.GBP).toFixed(2);
        } else if (currency === "USD" && listing.title === listingTitle) {
          listing.price = (listing.price * this.state.USD).toFixed(2);
        } else if (currency === "EUR" && listing.title === listingTitle) {
          listing.price = (listing.price * this.state.EUR).toFixed(2);
        } else {
          return '';
        }
        return listing;
      });
      this.setState({listing: updatedListing});
    });
  }

  changePage(pageNumber) {
    let URL = ETSY_API_URL_OFFSET + '&offset=' + pageNumber * 10;
    if (pageNumber === 1) {
      URL = ETSY_API_URL;
    }
    fetchJsonp(URL)
    .then((response) => response.json())
    .then((listings) => {
      this.setState({listings: listings});
    });
  }

  changeCurrency(currency, title) {
    console.log(currency);
    this.setState({currentCurrency: currency});
    this.fetchExchangeRates(currency, title);
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
          <ListingComponent
            currentCurrency={this.state.currentCurrency}
            changeCurrency={(currency, title) => this.changeCurrency(currency, title)}
            listing={listing} />
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
        {this.renderListings(this.state.listings)}
        <PaginationComponent
          changePage={(pageNumber) => this.changePage(pageNumber)}
          pageCount={this.state.pageCount}  />
      </div>
    );
  }
}

export default Listings;
