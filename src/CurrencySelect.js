import React, { Component } from 'react';
const currencies = ['GBP', 'CAD', 'USD', 'EUR'];
class CurrencySelect extends Component {

  renderCurrency = (currencies) => {
    return currencies.map((currency) => {
      return (
        <li> {currency} </li>
      )
    });
  }
  render() {
    return (
      <div>
        <span> Select a Currency </span>
        <ul>
          {this.renderCurrency(currencies)}
        </ul>
      </div>
    )
  }
}

export default CurrencySelect;
