import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { register } from "../src/modules/users/user.controller";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const body = JSON.parse(event.body || '{}');
        const user = await register(body)
        return {
            statusCode: 201,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
                message: 'Account created',
                user
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