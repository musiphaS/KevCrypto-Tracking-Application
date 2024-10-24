import { createContext, useEffect, useState, useCallback } from "react";
import PropTypes from 'prop-types';

export const CoinContext = createContext(); // creating a new context

const CoinContextProvider = (props) => {

    // state for all coins and currency
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "USD",
        symbol: "$"
    });

    // fetch coin data from API
    const fetchAllCoin = useCallback(async () => {
        const options = {
            method: 'GET',
            headers: { 
                accept: 'application/json', 
                'x-cg-demo-api-key': 'CG-WKZ7gKdWWPDDTJvmPmmDsTsy'
            }
        };

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options);
            const data = await response.json();
            setAllCoin(data);
        } catch (err) {
            console.error(err);
        }
    }, [currency]);

    // fetch coins when currency changes
    useEffect(() => {
        fetchAllCoin();
    }, [currency, fetchAllCoin]); 

    // this is data we going to use to share with all components
    const contextValue = {
        allCoin, currency, setCurrency
    };

    // make data available to chils components
    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    );
};

// type checking for children prop
CoinContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default CoinContextProvider;