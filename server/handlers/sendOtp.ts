import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({ region: 'ap-south-1' });

export const handler = async (event: any) => {
  for (const record of event.Records) {
    const { type, email, name, otp } = JSON.parse(record.body);

    if (type === 'SEND_OTP') {
      await ses.send(new SendEmailCommand({
        Source: process.env.FROM_EMAIL!,
        Destination: {
          ToAddresses: [email]
        },
        Message: {
          Subject: {
            Data: 'Your OTP Code'
          },
          Body: {
            Html: {
              Data: `
                <h2>Hello ${name}!</h2>
                <p>Your OTP code is:</p>
                <h1 style="letter-spacing: 5px; color: #333;">${otp}</h1>
                <p>This OTP expires in <b>10 minutes</b>.</p>
                <p>If you did not register, ignore this email.</p>
              `
            }
          }
        }
      }));

      console.log(`OTP sent to ${email}`);
    }
  }
};