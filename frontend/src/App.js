import './App.css';
import { useState, useEffect } from 'react'
import { getLedInfo, setBrightness, toggleLed } from './services/httpServices';
function App() {
  const [led, setLed] = useState(null);
  const changeBrightness = async (event) => {
    try {
      const value = event.target.value
      const response = await setBrightness(value)
      setLed(response.data)
    } catch (error) {
      console.error(error.response);
    }
  }

  const changeLedState = async () => {
    try {
      const response = await toggleLed()
      setLed(response.data)
    } catch (error) {
      console.error(error.response);
    }
  }
  const loadLedInfo = async () => {
    try {
      const response = await getLedInfo()
      setLed(response.data)
    } catch (error) {
      console.error(error.response);
    }
  }

  useEffect(() => {
    loadLedInfo()


  }, [])

  return (
    <div className="container mt-5 card p-3" style={{maxWidth:'800px'}}>
      {led && 
        <>
          <h2 className="text-center">Manipula el LED</h2>

          <label htmlFor="brightness" className="form-label">Brillo</label>
          <input defaultValue={255} onChange={changeBrightness} type="range" className="form-range" min="1" max="255" step="1" id="brightness" />
          <button onClick={changeLedState} type="button" className={`btn btn-${!led.isActive?'success':'danger'} mt-3`}>
            {led.isActive ? 'Apagar' : 'Encender'}
          </button>
         
        </>
      }
    </div>
  );
}

export default App;
