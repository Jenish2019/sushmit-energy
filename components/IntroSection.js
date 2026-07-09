'use client';

import { useState } from 'react';

export default function IntroSection() {
  const [activeTab, setActiveTab] = useState('about');

  const timeline = [
    { id: 'one', year: '2013', icon: 'fa-hourglass-3' },
    { id: 'two', year: '2014', icon: 'fa-cogs' },
    { id: 'three', year: '2015', icon: 'fa-history' },
    { id: 'four', year: '2016', icon: 'fa-line-chart' }
  ];

  return (
    <section className="intro">
      <div className="container-fluid">
        <div className="row cm-row">
          <div className="col-md-6 col-sm-6">
            <div className="intro-img">
              <div className="overlay">
                <div className="img">
                  <img src="https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/themes/sushmitenergy/images/sushilpkrl.jpg" alt="Sushmit Energy Hydro power" />
                </div>
                <ul className="tab nav nav-tabs tabs-left">
                  <li className={activeTab === 'about' ? 'active' : ''}>
                    <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('about'); }}>
                      <span><img src="https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/themes/sushmitenergy/images/about-icon.png" /></span>
                      <h4>About Us</h4>
                      <p>Company Overview</p>
                    </a>
                  </li>
                  <li className={activeTab === 'history' ? 'active' : ''}>
                    <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('history'); }}>
                      <span><img src="https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/themes/sushmitenergy/images/history-icon.png" /></span>
                      <h4>Our History</h4>
                      <p>Defening Milestones</p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="tab-content">
              {activeTab === 'about' && (
                <div className="intro-des tab-pane active" id="intro-txt">
                  <div className="title2">
                    <h4>Welcome to Sushmit Energy</h4>
                  </div>
                  <div className="text">
                    <p>Sushmit Energy Pvt. Ltd is a leading hydropower project development company established with the aim of expanding hydro energy investment in Nepali market. We are currently working on four hydropower projects aimed at generating 93+ MW of electricity upon its completion. We specialize in the development and management of hydro projects with the aim of cost-effective investment and high level of profit to the investors and the nation as well.</p>
                  </div>
                  <div className="fact-counter">
                    <ul>
                      <li>
                        <i className="fa fa-users"></i>
                        <span className="counter">25</span>
                        <p className="fact-title">Engineers &amp; Workers</p>
                      </li>
                      <li>
                        <i className="fa fa-folder"></i>
                        <span className="counter">4</span>
                        <p className="fact-title">Projects In Progress</p>
                      </li>
                      <li>
                        <i className="fa fa-modx"></i>
                        <span className="counter">93</span>
                        <p className="fact-title">Megawatt Generate</p>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {activeTab === 'history' && (
                <div className="our-history tab-pane active" id="history">
                  <div className="title2">
                    <h2>Our History</h2>
                  </div>
                  <div className="timeline">
                    <ul>
                      {timeline.map((item) => (
                        <li key={item.id} id={item.id}>
                          <a href="#">
                            <span className="icon-circle"></span>
                            <date>{item.year}</date>
                            <div className="timeline-text" id={"txt-" + item.id}>
                              <i className={"fa " + item.icon + " bounce"}></i>
                              <div className="txt">
                                <h4>Our Achievements</h4>
                                <p>Over 24 years experience and knowledge international standards, technologicaly changes and industrial systems.</p>
                              </div>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}