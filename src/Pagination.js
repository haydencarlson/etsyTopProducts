import React, { Component } from 'react';
import './Pagination.css';
class Pagination extends Component {

  renderPageNumbers(pageCount) {
    var pages = [];
    for (let i = 1; i <= pageCount; i++) {
      pages.push(
        <li className="paginationLi" key={i}>
        <a href="#" onClick={() => this.props.changePage(i)}> {i} </a>
        </li>
      )
    }
    return pages;
  }

  render() {
    return (
      <ul className="paginationUl">
        {this.renderPageNumbers(this.props.pageCount)}
      </ul>
    )
  }
}

export default Pagination;
