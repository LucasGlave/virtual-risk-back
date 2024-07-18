import { Request, Response } from 'express';
import userService from "../services/userService"

const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if(!username || !password) {
        return res.send('All fields are required').status(400)
    }
    try {
        const { payload, token } = await userService.loginUser(username, password);
        res.cookie("token", token, {
            sameSite: "none",
            httpOnly: true,
            secure: true,
        });
        res.status(200).send(`User has been logged `+ payload.username);
    } catch (error) {
        res.status(500).send(`Error when trying to login user: ${error}`);
    }
};

const logoutUser = async (req: Request, res: Response) => {
    try {
        res.cookie("token", "", {
            sameSite: "none",
            httpOnly: true,
            secure: true,
        });
        res.status(204).send("Cookies deleted")
    }
    catch (error) {
        res.status(500).send(`Error when trying to logout user: ${error}`);
    }
};

export default { loginUser, logoutUser }