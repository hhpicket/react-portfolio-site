import * as React from "react";

const BlogEntry = props => {
  return (
    <div className="card">
      <img className="card-img-top" src={props.source} alt="Card image cap" />
      <div className="card-block">
        <h4 className="card-title">
          {props.title}
        </h4>
        <p className="card-text">
          {props.content}
        </p>
        <div className="d-flex justify-content-center">
          <a href="#" className="btn btn-info" onClick={props.onClick}>
            {props.buttonText || "no buttonText"}
          </a>
        </div>
      </div>
    </div>
  );
};

const ContactLinks = props => {
  return (
    <div className="d-flex flex-column ml-3">
      <div>
        <a href="https://github.com/hhpicket">hhpicket&nbsp;</a>
        <i className="fa fa-github" />
      </div>
      <div>
        <a href="https://twitter.com/">hansvonburger&nbsp;</a>
        <i className="fa fa-twitter" />
      </div>
      <div>
        <a href="https://www.instagram.com/hansvonburger/">
          @hansvonburger&nbsp;
        </a>
        <i className="fa fa-instagram" />
      </div>
    </div>
  );
};

class SideBar extends React.Component<{}, { ethPrice: string }> {
  render() {
    return (
      <div>
        <h4 className="text-center">Sweet Links</h4>
        <div className="d-flex justify-content-start">
          <ContactLinks />
        </div>
        <hr className="my-2" />
        <BlogEntry
          title="Ethereum blog post"
          content="Invest in ethereum, it is the cryptocurrency of the future"
          buttonText={"Explore"}
          source="http://files.coinmarketcap.com.s3-website-us-east-1.amazonaws.com/static/img/coins/200x200/ethereum.png"
        />
        <br />
        <BlogEntry
          title="GT-R blog post"
          content="This is why the nissan skyline GT-R is the greatest vehicle"
          buttonText="See why"
          source="https://seeklogo.com/images/G/GT-R-logo-F1EEE764F4-seeklogo.com.png"
        />
      </div>
    );
  }
}

export default SideBar;
