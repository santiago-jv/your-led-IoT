import five from "johnny-five";
import express from "express";
import cors from 'cors';
const server = express();
server.use(express.json())
server.use(cors())


const board = new five.Board({
    port: 'COM3',
    debug: true
});

let led = null

board.on("ready", function () {
    led = {
        object: new five.Led(11),
        isActive: false,
        color: 'Red',
        brightness:255
    }
    led.object.stop().off()
});

server.get('/led', (request, response) => {
 
  
    const responseData = {...led}
    delete responseData.object
    return response.status(200).json(
        responseData
    )

})
server.post('/toggle', (request, response) => {
 
    led.object.toggle()
  
    if(!led.isActive) {
        led.object.brightness(led.brightness)

    }
  
    led.isActive = !led.isActive
    const responseData = {...led}
    delete responseData.object
    return response.status(200).json(
        responseData
    )

})

server.post('/brightness/:value', (request, response) => {
    const {value} = request.params
    if(!(value && value > 0 && value <= 255)) {

        return response.status(400).send()
        
    }
    if(led.isActive){

        led.object.brightness(value);
    }
    
    led.brightness = value

    const responseData = {...led}
    delete responseData.object
    return response.status(200).json(
        responseData
    )

})
board.on('ready', () => {
    server.listen(8080)
});
