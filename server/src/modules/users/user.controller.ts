import { NextFunction, Response, Request } from "express";
import { getErrors } from "../../constants/error.msg";
import { createUser, findUserByEmailOrUsername } from "./user.service";
import { createdResponse, errorResponse, validationErrorResponse } from "../../utils/response";
import registerSchema from "./user.schema";
import { hashPassword } from "../../utils/hash";


export const register = async (req: Request, res:Response, next: NextFunction) => {
    const result = registerSchema.safeParse(req.body);
    
    let {name, email, username, password} = req.body;
    if(!result.success) {
        return validationErrorResponse(res, result.error.flatten())
    }

    const existingUser = await findUserByEmailOrUsername(email, username);

    if(existingUser) {
        const message = existingUser.email === email
            ? getErrors("Email_Already_Exists")
            : getErrors("Username_Already_Exists");
        return errorResponse(res, message, 409)
    }

    password = await hashPassword(password);

    const user = await createUser({name, email, username, password});

    const {password: _password, ...userWithoutPassword} = user;
    return createdResponse(res, userWithoutPassword, "Account created")
}