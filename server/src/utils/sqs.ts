import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

const sqs = new SQSClient({
    region: 'ap-south-1'
})

export const sendToQueue = async(payload: Object) => {
    await sqs.send(new SendMessageCommand({
        MessageBody: JSON.stringify(payload),
        QueueUrl: process.env.SQS_QUEUE_URL!
    }));
};

