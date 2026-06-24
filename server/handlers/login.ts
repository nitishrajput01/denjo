import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { login } from "../src/modules/users/user.controller";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const body = JSON.parse(event.body || '{}');
        const { accessToken, refreshToken, userId } = await login(body);

        const cookie = process.env.IS_OFFLINE
            ? `refreshToken=${refreshToken}`
            : `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=604800; Path=/`;

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*' ,
                'Access-Control-Allow-Credentials': true,
                'Set-Cookie': cookie
            },
            body: JSON.stringify({
                message: 'Login successful',
                userId,
                accessToken
            })
        };

    } catch (err: any) {
        return {
            statusCode: err.status || 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
                error: err.message,
                details: err.details || null  // validation errors
            })
        };
    }
}
