import * as React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";

interface Props {
  price: string;
  currency: string;
  cryptoName: string;
}

interface State {
  price: string;
}

const cryptoObjects = {
  ETH: "ethereum",
  BTC: "bitcoin",
  XMR: "monero",
  GNT: "golem-network-tokens",
  NEO: "neo",
  DOGE: "dogecoin"
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const currencyMap = {
  USD: "$",
  EUR: "€",
  KRW: "₩",
  JPY: "¥",
  CNY: "¥",
  GBP: "£",
  MXN: "$"
};

class CurrencyPicker extends React.Component<
  { setCurrency: (string) => void },
  { dropdownOpen: boolean }
> {
  componentWillMount() {
    this.setState({});
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
  handleClick = (currency: string) => {
    this.props.setCurrency(currency);
  };
  render() {
    let dropdownItems = Object.keys(currencyMap).map(c => {
      return (
        <DropdownItem key={c} onClick={() => this.handleClick(c)}>
          {c + " (" + currencyMap[c] + ")"}
        </DropdownItem>
      );
    });
    return (
      <div>
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>Select Currency</DropdownToggle>
          <DropdownMenu>
            {dropdownItems}
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}

class CryptoTicker extends React.Component<Props, State> {
  componentWillMount() {
    this.setState({ price: this.props.price });
  }
  render() {
    const { price, currency, cryptoName } = this.props;
    const imgSrc = `https://files.coinmarketcap.com/static/img/coins/32x32/${cryptoObjects[
      cryptoName
    ]}.png`;
    console.log("cyrptoObjects " + cryptoObjects[cryptoName]);
    console.log("imgSrc " + { imgSrc });
    return (
      <div className="d-flex mr-1">
        <img className="mr-1" src={imgSrc} height="25px" width="25px" />
        <h5>
          {currencyMap[currency]}
          {price}&nbsp;
        </h5>
      </div>
    );
  }
}

const CryptoTickers = props => {
  let tickers = Object.keys(cryptoObjects).map(c => {
    return (
      <CryptoTicker
        key={c}
        currency={props.currency}
        price={props.priceMap[c]}
        cryptoName={c}
      />
    );
  });
  return (
    <div className="d-flex justify-content-between">
      {tickers}
    </div>
  );
};

class Container extends React.Component<
  {},
  { currency: string; priceMap: {} }
> {
  componentWillMount() {
    this.setState({});
    this.setCurrency("USD");
  }
  componentDidMount() {
    this.setPriceMap();
  }
  setPriceMap = (currency?: string) => {
    let priceMap = {};
    let promises = Object.keys(cryptoObjects).map(c => {
      return this.handleCheckPrice(
        currency || this.state.currency,
        c
      ).then(d => {
        priceMap[c] = parseFloat(d) > 1 ? numberWithCommas(d) : d;
      });
    });
    Promise.all(promises).then(() => this.setState({ priceMap: priceMap }));
  };
  handleCheckPrice = (currency: string, cryptoName: string) => {
    let currencyList = Object.keys(currencyMap).join(",");
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${cryptoName}&tsyms=${currencyList}`;
    return axios.get(url).then(response => {
      return response.data[currency];
    });
  };
  setCurrency = (currency: string) => {
    this.setState({ currency: currency });
  };
  setAndCheck = (currency: string) => {
    this.setCurrency(currency);
    this.setPriceMap(currency);
  };
  renderStuff = () => {
    return (
      <div>
        <div className="d-flex justify-content-between">
          <div className="row align-items-center">
            <CurrencyPicker setCurrency={this.setAndCheck} />
            <a href="#">
              <i className="fa fa-refresh ml-2" />
            </a>
          </div>
          <CryptoTickers
            priceMap={this.state.priceMap}
            currency={this.state.currency}
          />
        </div>
      </div>
    );
  };
  render() {
    const { currency, priceMap } = this.state;
    let stuff = <div />;
    if (priceMap) stuff = this.renderStuff();
    return stuff;
  }
}

export default Container;
