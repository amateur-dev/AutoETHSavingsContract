import { KYBER_RINKEBY_URL } from '../constants/valueConstants';
import { fetchRequest, buildOptions, checkResponse } from './serviceHelpers';

export const getCurrencies = () => fetchRequest(`${KYBER_RINKEBY_URL}/currencies`, () => buildOptions())
  .then(checkResponse('Currencies from the Kyber API'));

export const getCurrencyList = () => getCurrencies().then((currencyList) => {
  console.log('currencyList ', currencyList);
  const currencies = currencyList.data.map(currencyData => ({
    label: currencyData.name,
    value: currencyData.symbol,
  }));
  console.log('currencies ', currencies);
  return currencies;
});
