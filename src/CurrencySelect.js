import React, { Component } from 'react';
import './CurrencySelect.css';
const currencies = ['GBP', 'CAD', 'USD', 'EUR'];
class CurrencySelect extends Component {

  renderCurrency = (currencies) => {
    return currencies.map((currency, index) => {
      if (this.props.currentCurrency !== currency) {
        return (
          <li key={index}
              onClick={() => this.props.changeCurrency(currency)}
              className="currencySelectLi"> {currency}
          </li>
        )
      } else {
        return (
          <li key={index} className="currencySelectLi">
              {currency}
          </li>
        )
      }
    });
  }
  render() {
    return (
      <div className="currencySelect">
        <span> Select a Currency : </span>
        <ul className="currencySelectUl">
          {this.renderCurrency(currencies)}
        </ul>
      </div>
    )
  }
}

export default CurrencySelect;
