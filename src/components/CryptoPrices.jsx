// ? Use Binance API to get information about crypto prices

import axios from "axios"
import { useEffect, useState, useRef } from "react"
import { GridLoader } from "react-spinners"

function CryptoPrices() {
  // ? Let's create states to the drag functionality
  // When the component is pressed by the mouse:
  const [pressed, setPressed] = useState(false)
  // The position of the component. Start at {x: 20, y: 20}
  const [cryptoPricesComponentPosition, setCryptoPricesComponentPosition] = useState({x: 0, y: 0})
  // useRef so we maintain a value between renders:
  const ref = useRef()

  // Create a function to change the the ref value of the position:
  const changePositionWhenDragged = () => {
    // Check the current value of our ref and translate it when there is a change of position in x and y:
    if (ref.current) {
      ref.current.style.transform = `translate(${cryptoPricesComponentPosition.x}px, ${cryptoPricesComponentPosition.y}px)`
    }
  }
  // useEffect to call changePositionWhenDragged when there is any position change (note the dependency)
  useEffect(() => {
    changePositionWhenDragged()
  }, [cryptoPricesComponentPosition])

  // We should update the current position when the mouse is pressed:
  const mousePressedMove = (e) => {
    if (pressed) {
      setCryptoPricesComponentPosition( {
        x: cryptoPricesComponentPosition.x + e.movementX,
        y: cryptoPricesComponentPosition.y + e.movementY
      })
    }
  }

  // Create state for the prices:
  const [cryptoPrice, setCryptoPrice] = useState({btcPrice: "", ethPrice: ""})
  
  // Create state for when the data is loading:
  const [isLoading, setIsLoading] = useState(true)

  // Create state for the price styles:
  const [priceStyle, setPriceStyle] = useState({styleBtcPrice: "", styleEthPrice: ""})
  
  // Create a function to get price data:
  const getData = async () => {
    try {
      const btcResponse = await axios.get("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT")
      // console.log(btcResponse.data.price);
      const ethResponse = await axios.get("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT")
      // console.log(ethResponse.data.price);
      console.log(Number(btcResponse.data.price));
      console.log(Number(cryptoPrice.btcPrice));

      compareBtcPriceValues(btcResponse)
      
      compareEthPriceValues(ethResponse)

      setCryptoPrice({
        ethPrice: Number(ethResponse.data.price).toFixed(2),
        btcPrice: Number(btcResponse.data.price).toFixed(2)
      })

      setIsLoading(false)
    } catch(error) {
      console.log(error);
    }
  }

  // Create functions to compare the price values:
  const compareBtcPriceValues = (btcResponse) => {
    // Change styles according to price up or down:
    if (Number(btcResponse.data.price) > Number(cryptoPrice.btcPrice)){
      priceStyle.styleBtcPrice = {color: "green"}
    } else {
      priceStyle.styleBtcPrice = {color: "red"}
    }
  }
  // Create functions to compare the price values:
  const compareEthPriceValues = (ethResponse) => {
    if (Number(ethResponse.data.price) > Number(cryptoPrice.ethPrice)){
      priceStyle.styleEthPrice = {color: "green"}
    } else {
      priceStyle.styleEthPrice = {color: "red"}
    }
  }
  
  
  // useEffect to call getData every 5 seconds:
  useEffect(() => {
    getData()
    const id = setInterval(() => {
      getData()
    }, 5000)
    // Create a return statment so the setInterval is cleared when the component is unmounted:
    return () => {
      console.log("CryptoPrices unmounted");
      clearInterval(id)
    }
  }, [])



  // Create a check clause if we are still loading (and give time to the Backend to return the data):
  if (isLoading) {
    return (
      <div className="spinner-container">
        <GridLoader color="rgba(0, 0, 0, 0.62)" size={20}/>
      </div>
    )
  }

  return (
    <div ref= {ref} onMouseMove={mousePressedMove} onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}>
      <div className="crypto-prices-container">
        <p >Bitcoin BTC <span style={priceStyle.styleBtcPrice}>${cryptoPrice.btcPrice}</span></p>
        <p >Ethereum ETH <span style={priceStyle.styleEthPrice}>${cryptoPrice.ethPrice}</span></p>
      </div>
    </div>
  )
}

export default CryptoPrices