import { useEffect, useState } from 'react' // tools for managing component lifecycle and state
import Chart from 'react-google-charts' // google chart library
import PropTypes from 'prop-types';  // used for type checking

const LineChart = ({ historicalData }) => {

  // it initialize chart data with headers
const [data, setData] = useState([["Date", "Prices"]])

    // when historical data changes start afresh with new headers e.g 'Date' and 'Prices'
    useEffect(()=> {
        let dataCopy = [["Date", "Prices"]];
        if(historicalData && historicalData.prices) {
            historicalData.prices.map((item)=> {
                dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`, item[1]]) // convert timestamp to date and add price and format date
            })
            setData(dataCopy); // update chart data
        }
    },[historicalData])


    // that's where we will render our google chart
  return (
    <Chart
        chartType='LineChart'
        data={data}
        height="100%"
        legendToggle
    />
  )
}

// type checking for props 
LineChart.propTypes = {
    historicalData: PropTypes.shape({
      prices: PropTypes.arrayOf(PropTypes.array).isRequired,
    }).isRequired,
  };

export default LineChart