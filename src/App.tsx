import * as React from "react";
import axios from "axios";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Jumbotron,
  Button
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import ReactTable from "react-table";
import "font-awesome/css/font-awesome.min.css";
import CryptoTickers from "./crypto-ticker";
import SideBar from "./side-bar";
import Content from "./main-content";

const TitleBar = props => {
  return (
    <div>
      <Jumbotron className="blackground">
        <h1 className="display-3 text-center text-primary">
          React Practice Site
        </h1>
        <p className="lead text-center text-info">a blog thing</p>
        <hr className="my-2" />
      </Jumbotron>
    </div>
  );
};

const NavBar = props => {
  return (
    <div>
      <Navbar color="faded" light toggleable>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/home/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/links/">Links</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/help/">Help</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/contact/">Contact</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

const NujabesVideo = props => {
  return (
    <div className="embed-responsive embed-responsive-16by9">
      <iframe
        className="embed-responsive-item"
        src="https://www.youtube.com/embed/mAH7CLUmvhE?ecver=1"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};
const MainBit = props => {
  return (
    <div>
      <div className="container">
        <div className="d-flex row justify-content-around" />
        <CryptoTickers />
        <hr />
        <div className="row d-flex justify-content-center">
          <div className="col-9">
            <br />
            <Content />
          </div>
          <div className="col-3">
            <SideBar />
          </div>
        </div>
      </div>
    </div>
  );
};

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <TitleBar />
        <MainBit />
      </div>
    );
  }
}

export default App;
