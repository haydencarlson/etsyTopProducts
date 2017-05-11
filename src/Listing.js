import React, { Component } from 'react';
import './Listing.css';

class Listings extends Component {
  render() {
    return (
      <div>
        <li>
          <img alt="Listing" src={this.props.listing.Images[0].url_75x75}/>
          <p>{this.props.listing.title}</p>
        </li>
        <span>{this.props.listing.price}</span>
        <hr/>
      </div>
    )
  }
}

export default Listings;
