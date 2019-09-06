import React, { Component } from 'react';

import './footer.scss';

class Footer extends Component {
  
  render() {

    return (
        <footer>
            <div className="footer-option">
              <span className="title">100% ORIGINAL</span>
              <span className="sub-title">guarentee for all products</span>
            </div>
            <div className="footer-option">
              <span className="title">Return within 30days</span>
              <span className="sub-title">of receiving your order</span>
            </div>
            <div className="footer-option">
            <span className="title">Get free delivery</span>
              <span className="sub-title">for every order above Rs.999</span>
            </div>
        </footer>
    );
  }
}

export default Footer;