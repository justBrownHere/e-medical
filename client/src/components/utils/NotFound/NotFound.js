import React from 'react'
import { Link } from 'react-router-dom';

function NotFound() {
    return (
      <>
        <div>
          <div className="fore-zero-page">
            <div className="container">
              <div className="images">
                <img
                  src="http://demos.codexcoder.com/labartisan/html/covid-19/assets/images/404.png"
                  alt={404}
                />
              </div>
              <div className="text-content text-center">
                <h3>Oops! This Page Not Found</h3>
                <p>
                  We are Really Sorry But the Page you Requested is Missing :(
                </p>
                <Link to="/" className="lab-btn" >
                  <span>Go Back to Home</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default NotFound
