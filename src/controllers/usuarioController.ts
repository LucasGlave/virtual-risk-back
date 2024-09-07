import { Request, Response } from "express";
import userService from "../services/userService";

const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("All fields are required");
  }
  try {
    const { payload, token } = await userService.loginUser(username, password);
    res.cookie("token", token, {
      sameSite: "none",
      httpOnly: true,
      secure: true, // en producción cambiar a true
      path: "/",
    });
    res.status(200).send(`User has been logged`);
  } catch (error) {
    res.status(500).send(`Error when trying to login user: ${error}`);
  }
};

const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("token", {
    sameSite: "none",
    httpOnly: true,
    secure: true, // en producción cambiar a true
    path: "/",
  });
  res.status(200).send("Cookies deleted");
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers()
    res.status(200).send(users)
  }catch(e){
    res.status(400).send(`Error when trying get users: ${e}`)
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try{
    await userService.deleteUser(req.body)
    res.sendStatus(201)
  } catch(e) {
    res.status(400).send(`Error when trying delete user: ${e}`)
  }
}

export default { loginUser, logoutUser, getUsers, deleteUser };
