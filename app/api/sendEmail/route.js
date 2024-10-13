import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    const body = await req.json();
    

    try {
        // Create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail', // Use Gmail or your preferred email service
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL, // Your email address
                pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD , // Your email password or app-specific password
            },
        });

        // Format the form data for the email content
        function formatData(form) {
            // Filter details from form
            const { details, ...rest } = form;

            // Create formatted string
            let formattedString = `User Details:\nName: ${details.name}\nEmail: ${details.email}\n\n`;

            // Append each category and its questions
            for (const [key, value] of Object.entries(rest)) {
                formattedString += `${key.charAt(0).toUpperCase() + key.slice(1)}:\n`;
                value.forEach((item, index) => {
                    formattedString += `  ${index + 1}. Question: ${item.question}\n     Answer: ${item.answer}\n\n`;
                });
            }

            return formattedString;
        }

        const formattedData = formatData(body);

        // Send mail with defined transport object
        await transporter.sendMail({
            from: body.details.email, // sender address
            to: process.env.NEXT_PUBLIC_EMAIL, // recipient address
            subject: 'Client Form Submission', // Subject line
            text: `Here is the form data:\n\n${formattedData}`, // plain text body
        });

        return NextResponse.json({ message: 'Email sent successfully!' });
        // return NextResponse.json({formattedData});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to send email'});
    }
}