const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});
app.use(cors());
// 'https://plasma-interview.onrender.com'
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
	res.send('Running  BC!!!');
});

io.on("connection", (socket) => {
	socket.emit("me", socket.id);
	console.log(socket.id);


	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});
	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});
	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	
	// socket.on("userLeftWindow", ({ userId, userName }) => {
	// 	socket.broadcast.emit("userLeftWindow", { userId, userName });
	// 	console.log("userId, userName");
	//   });
	});
});
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
