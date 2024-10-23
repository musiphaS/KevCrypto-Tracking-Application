import { useEffect, useState } from 'react'
import Chart from 'react-google-charts'
import PropTypes from 'prop-types';

const LineChart = ({ historicalData }) => {

const [data, setData] = useState([["Date", "Prices"]])

    useEffect(()=> {
        let dataCopy = [["Date", "Prices"]];
        if(historicalData && historicalData.prices) {
            historicalData.prices.map((item)=> {
                dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`, item[1]])
            })
            setData(dataCopy);
        } // 10/05/2024
    },[historicalData])

  return (
    <Chart
        chartType='LineChart'
        data={data}
        height="100%"
        legendToggle
    />
  )
}

LineChart.propTypes = {
    historicalData: PropTypes.shape({
      prices: PropTypes.arrayOf(PropTypes.array).isRequired,
    }).isRequired,
  };

export default LineChart