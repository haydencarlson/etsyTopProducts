import React, { Component } from 'react';
import './Listing.css';

class Listings extends Component {
  render() {
    return (
      <div>
        <img alt="Listing" src={this.props.listing.Images[0].url_75x75}/>
        <li>{this.props.listing.title}</li>
        <span>{this.props.listing.price}</span>
        <hr/>
      </div>
    )
  }
}

export default Listings;
