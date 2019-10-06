import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import Select from 'react-select';
import { getCurrencyList } from '../../services/kyber';

class TransferMoneyContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      payerAddress: '',
      loading: true,
      selectedCurrency: '',
      currencyOptions: [],
    };
    autoBind(this);
  }

  componentDidMount = async () => {
    const currencyOptions = await getCurrencyList();
    this.setState({ currencyOptions });
  }

  onChangePayerAddress = event => this.setState({ payerAddress: event.target.value });

  handleCurrencyChange = selectedCurrency => this.setState({ selectedCurrency });

  render() {
    const { payerAddress, selectedCurrency, currencyOptions, loading } = this.state;
    return (
      <>
        <span>
          Payer Address: {' '}
          <input
            className="col-md-4"
            type="text"
            name="PayerAddress"
            onChange={this.onChangePayerAddress}
            value={payerAddress}
          />
        </span>
        <br />
        <span>
          Select Currency: {' '}
          <Select
            className="col-md-4"
            value={selectedCurrency}
            onChange={this.handleCurrencyChange}
            options={currencyOptions}
          />
        </span>
      </>
    );
  }
}

export default TransferMoneyContainer;
