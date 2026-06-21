// client websocket implementation

const wsUri = "ws://127.0.0.1:8080/";

const websocket = new WebSocket(wsUri);

let pingInterval;

// open ws connection
websocket.addEventListener('open', () => {
    console.log("connected");
    pingInterval = setInterval(() => {
        console.log("ping");
        websocket.send("ping")
    }, 1000)
})

// receive message from server
websocket.addEventListener('message', (e) => {
    console.log(e.data);
})

// error
websocket.addEventListener('error', () => {
    console.log("Error");
})

// disconnect
websocket.addEventListener('close', () => {
    console.log("Disconnected")
    clearInterval(pingInterval);
})



