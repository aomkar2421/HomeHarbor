import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";

const app = express();

// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
const corsOptions = {
  origin: process.env.CLIENT_URL, // "http://localhost:5173"
  credentials: true,              // to allow cookies
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",  // allowed methods
  allowedHeaders: "Content-Type, Authorization", // allowed headers
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
  console.log("Server is running!");
});
