'use client';

import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-menu">
            <ul className="pull-right clearfix">
              <li><a href="/policy/">Policy</a></li>
              <li><a href="/reports/">Reports</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-2 col-sm-2">
              <div className="logo">
                <a href="/"><img src="/images/logo.png" alt="Sushmit Energy Hydro power" /></a>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 clearfix">
              <div className="top-info pull-right">
                <ul>
                  <li className="single-info">
                    <i className="fa fa-map-marker"></i>
                    <span>Address:</span>
                    Sushmit Bhawan -2nd Floor, House No 166/40467 Subidhanagar - 35 Kathmandu, Nepal
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 clearfix">
              <div className="top-info pull-right">
                <ul>
                  <li className="single-info">
                    <i className="fa fa-mobile"></i>
                    <span>Call Us:</span>
                    +977-15199027<br /><span>Fax No.</span>+977-5199454
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2 col-sm-2 clearfix">
              <div className="top-info pull-right">
                <ul>
                  <li className="social-media">
                    <a href="https://www.facebook.com/SushmitEnergy/"><i className="fa fa-facebook"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                    <a href="https://www.linkedin.com/company/sushmitcleanenergy/"><i className="fa fa-linkedin"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-nav">
        <div className="container">
          <div className="navigation">
            <aside className="navbar" role="navigation">
              <article className="navbar-header">
                <button type="button" className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </article>
              <article className={'collapse navbar-collapse' + (menuOpen ? ' in' : '')} id="bs-example-navbar-collapse-1">
                <div className="site-header">
                  <ul id="main-menu" className="sm sm-blue">
                    <li className="active"><a href="/">Home</a></li>
                    <li>
                      <a href="#">Company</a>
                      <ul>
                        <li><a href="/about-us/">About Sushmit Energy</a></li>
                        <li><a href="/organizational-chart/">Organizational Chart</a></li>
                        <li><a href="/board-of-directors/">Board of Directors</a></li>
                        <li><a href="/message-of-chairman/">Chairman&apos;s Message</a></li>
                        <li><a href="/our-management-team/">Management Team</a></li>
                        <li><a href="/investment-oppourtunity/">Investment Oppourtunity in Nepal</a></li>
                      </ul>
                    </li>
                    <li><a href="/projects/">Projects</a></li>
                    <li>
                      <a href="#">Media</a>
                      <ul>
                        <li><a href="/press-releases/">Press Releases</a></li>
                        <li><a href="/sushmit-news/">Sushmit Energy in the News</a></li>
                        <li><a href="/informationenergy/">Energy News</a></li>
                        <li><a href="/media-kit/">Media Kit</a></li>
                        <li><a href="/blog/">Blog</a></li>
                        <li><a href="/publications/">Publications</a></li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">Job Board</a>
                      <ul>
                        <li><a href="/current-vacancies/">Current Vacancies</a></li>
                        <li><a href="/resume/">Drop Your Resume</a></li>
                      </ul>
                    </li>
                    <li><a href="/gallery/">Gallery</a></li>
                    <li><a href="/contact-us/">Contact Us</a></li>
                    <li><a href="/login/">Login</a></li>
                  </ul>
                </div>
              </article>
            </aside>
            <div className="search-box">
              <div className="search">
                <a href="#"><i className="fa fa-search"></i></a>
              </div>
              <div className="search-form">
                <form className="form-inline" method="get" action="/" role="search">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="SEARCH " value="" name="s" title="Search for:" readOnly />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}