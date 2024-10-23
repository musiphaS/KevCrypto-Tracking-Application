import { createContext, useEffect, useState, useCallback } from "react";
import PropTypes from 'prop-types';

export const CoinContext = createContext();

const CoinContextProvider = (props) => {

    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "USD",
        symbol: "$"
    });

    const fetchAllCoin = useCallback(async () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-WKZ7gKdWWPDDTJvmPmmDsTsy' }
        };

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options);
            const data = await response.json();
            setAllCoin(data);
        } catch (err) {
            console.error(err);
        }
    }, [currency]); // Memoize fetchAllCoin with currency.name as a dependency

    useEffect(() => {
        fetchAllCoin();
    }, [currency, fetchAllCoin]); // Now fetchAllCoin is included in the dependency array

    const contextValue = {
        allCoin, currency, setCurrency
    };

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    );
};

CoinContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default CoinContextProvider;