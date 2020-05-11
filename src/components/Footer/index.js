import React from "react";
import Blocknative from "../../assets/blocknative.png";
import AvionDB from "../../assets/aviondb.png";
import GitHubButton from "react-github-btn";
//require("react-github-button/assets/style.css");

export default function Footer() {
  return (
    <div>
      <h3>Built Using</h3>
      <img src={Blocknative} width="100" />
      <img src={AvionDB} width="100" />
      <br />
      <br />
      <GitHubButton
        href="https://github.com/dappkit/aviondb"
        data-size="large"
        data-show-count="true"
        aria-label="Star dappkit/aviondb on GitHub"
      >
        Star
      </GitHubButton>
    </div>
  );
}
