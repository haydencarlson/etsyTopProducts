import React, { Component } from 'react';
import './Listing.css';
import CurrencySelectComponent from '../CurrencySelect/CurrencySelect.js';
class Listings extends Component {
  render() {
    return (
      <div>
        <li>
          <img alt="Listing" src={this.props.listing.Images[0].url_75x75}/>
          <p>{this.props.listing.title}</p>
        </li>
        <span>{this.props.listing.price}</span>
        <CurrencySelectComponent
          currentCurrency={this.props.currentCurrency}
          changeCurrency={(currency) => this.props.changeCurrency(currency, this.props.listing.title)} />
        <hr/>
      </div>
    )
  }
}

export default Listings;
