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
  const [cryptoPrice, setCryptoPrice] = useState({btcPrice: "", ethPrice: "", styleBtcPrice: {color: "black"}, styleEthPrice: {color: "black"}})
  // Create state for when the data is loading:
  const [isLoading, setIsLoading] = useState(true)
  
  // Create a function to get price data:
  const getData = async () => {
    try {
      const allResponse = await Promise.all([axios.get("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"), axios.get("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT")])
      // console.log(allResponse);
      // console.log(Number(allResponse[0].data.price));
      // console.log(Number(cryptoPrice.btcPrice));

      // ? Let's set the cryptoPrice state and update the style colors depending if the price is going up or down
      setCryptoPrice(prevValue => {
        //console.log(prevValue.btcPrice, allResponse[0].data.price, prevValue.styleBtcPrice);

        // Create variable and the final object to return:
        let finalToSet
        let btcNewPrice = Number(allResponse[0].data.price)
        let btcOldPrice = Number(prevValue.btcPrice)
        let btcPriceStyle = btcNewPrice > btcOldPrice ? {color: "green"} : {color: "red"}
        let ethNewPrice = Number(allResponse[1].data.price)
        let ethOldPrice = Number(prevValue.ethPrice)
        let ethPriceStyle = ethNewPrice > ethOldPrice ? {color: "green"} : {color: "red"}
        
        finalToSet = {
          btcPrice: btcNewPrice,
          ethPrice: ethNewPrice,
          styleBtcPrice: btcPriceStyle,
          styleEthPrice: ethPriceStyle
        }
        return finalToSet
      })

      setIsLoading(false)
    } catch(error) {
      console.log(error);
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
      // console.log("CryptoPrices unmounted");
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
        <p >Bitcoin BTC <span style={cryptoPrice.styleBtcPrice}>${cryptoPrice.btcPrice}</span></p>
        <p >Ethereum ETH <span style={cryptoPrice.styleEthPrice}>${cryptoPrice.ethPrice}</span></p>
      </div>
    </div>
  )
}

export default CryptoPrices