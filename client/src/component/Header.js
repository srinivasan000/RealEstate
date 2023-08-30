import React from "react";
// internal import
import { useStateContext } from "../context/";

const Header = (props) => {
  // contract data
  const {
    userBlance,
    disconnect,
    address,
    contract,
    connect,
  } = useStateContext();
  return (
    <div className="header-container">
      <div className="navbar-container">
        <div className="navbar-left">
          <div
            className="burger"
            onClick={() => {
              let nav = document.querySelector(".navbar-links");
              let me=document.querySelector(".burger");
              nav.classList.toggle("menu");
              me.children[0].classList.toggle("toggle1");
me.children[1].classList.toggle("toggle2");
me.children[2].classList.toggle("toggle3");

            }}
          >
 <div class="l1"></div><div class="l2"></div><div class="l3"></div>
          </div>
          <ul className="navbar-links">
            <li>
              <a href="/home">HOME</a>
            </li>
            <li>
              <a href="/about">ABOUT</a>
            </li>
            <li>
              <a href="/author">AUTHOR</a>
            </li>
            <li>
              <a href="/activity">ACTIVITIES</a>
            </li>
          </ul>
        </div>
        <div className="navbar-right">
          {/* connect wallet */}
          {address ? (
            ""
          ) : (
            <div className="navbar-wallet">
              <button
                onClick={() => {
                  while (true) {
                    var verify = prompt("Enter Your AAdharCard Number : ");
                    if (
                      Number.isInteger(Number(verify)) &&
                      verify.length == 12
                    ) {
                      break;
                    } else {
                      alert("Enter valid UIDAI number");
                    }
                  }
                  prompt("Enter Your Linked Mobile OTP : ");
                  connect();
                }}
                className="wallet"
              >
                Connect Wallet
              </button>
            </div>
          )}
          {/*end connect wallet  */}

          {/* user settings */}

          {address ? (
            <div>
              <div className="navbar-settings">
                <img
                  src={`/images/user-img-${Math.floor(
                    Math.random() * 7 + 1
                  )}.jpg`}
                  className="settings"
                  onClick={() => {
                    let drop = document.querySelector(".settings-dropdown");
                    drop.classList.toggle("display");
                  }}
                />
              </div>

              <div className="settings-dropdown">
                <div className="address">
                  <p>User Address : {address.slice(0, 13)}...</p>
                </div>
                <hr />
                <div className="balance">
                  <p>Balance : {userBlance?.slice(0, 4)}</p>
                </div>
                <hr />
                <button>Add Your Funds</button>
                <hr />
                <a href="#">My Profile</a>
                <hr />
                <a href="#">Edit Profile</a>
                <hr />
                <a href="#">Manage Funds</a>
                <hr />
                <a href="#" onClick={() => disconnect()}>
                  Disconnect
                </a>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
