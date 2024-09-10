import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, passowrd } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(passowrd, 10);
    console.log("hashedPassword : " + hashedPassword);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log("newUser : " + newUser);
    res.status(201).json({ message: "user created succesfuly" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ "Error message": "user failed to create" });
  }
};

export const login = async (req, res) => {
  const { username, password} = req.body;
  console.log(req.body);

  try{    

    const user = await prisma.user.findUnique({
        where: {username}
    })

    if(!user) return res.status(401).json({message: "Invalid Credentials"});

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) return res.status(401).json({message: "Invalid Credentials"});

    // res.setHeader("set-cookie", "test=" + "myValue").json("success")
    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign({
        id : user.id
    }, process.env.JWT_SECRET_KEY,
    {expiresIn : age}
    );

    res.cookie("token", token, {
        httpOnly : true,
        // secure : true,
        maxAge : age
    }).json({message : "Login succesfully"})

  }catch(err){
    console.log(err);
    res.status(500).json({message : "Failed to login"})
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({message : "Logout Succesfuly"})
};
