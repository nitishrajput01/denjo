import { getErrors } from "../../constants/error.msg";
import { createUser, findUserByEmailOrUsername, findUserByUsername, updateUserOTP } from "./user.service";
import {loginSchema, registerSchema} from "./user.schema";
import { hashPassword, comparePassword } from "../../utils/hash";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../../utils/token";
import { generateOTP } from "../../utils/otp";
import { sendToQueue } from "../../utils/sqs";


export const register = async (body: any) => {
    const result = registerSchema.safeParse(body);

    if (!result.success) {
        const error: any = new Error('Validation failed');
        error.status = 400;
        error.details = result.error.flatten();
        throw error;
    }

    let { name, email, username, password } = body;

    await findByUserNameOrEmail(email, username);
  

    password = await hashPassword(password);

    const user = await createUser({ name, email, username, password });

    // generate Otp 6 digits 

    const otp = generateOTP();

    // updatedb with otp in db

    await updateUserOTP(user.id, otp);

    // create a queue job pass email, otp, name

    await sendToQueue({
    type: 'SEND_OTP',
    email: user.email,
    name: user.name,
    otp
  });

    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}


export const login = async(body: any) => {
    const result = loginSchema.safeParse(body);
    if(!result.success) {
        const error: any = new Error('Validation failed');
        error.status = 400;
         error.details = result.error.flatten();
        throw error;
    }

    const {username, password } = body;
    const existingUser = await findUserByUsername(username);

    if (!existingUser) {
        const error: any = new Error(getErrors("Invalid_Credentials"));
        error.status = 401;
        throw error;
    }

    const isPasswordValid = await comparePassword(password, existingUser.password);
    if (!isPasswordValid) {
        const error: any = new Error(getErrors("Invalid_Credentials"));
        error.status = 401;
        throw error;
    }
    const payload = {id: existingUser.id, email: existingUser.email};
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);


    const {id} = existingUser;
    return { accessToken, refreshToken, userId: id };
}

const findByUserNameOrEmail = async (email: string, username: string) => {
      const existingUser = await findUserByEmailOrUsername(email, username);
    if (existingUser) {
        const message = existingUser.email === email
            ? getErrors("Email_Already_Exists")
            : getErrors("Username_Already_Exists");
        const error: any = new Error(message);
        error.status = 409;
        throw error;
    }
}