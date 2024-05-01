import sgMail from '@sendgrid/mail';

const apiKey: string = process.env.SENDGRID_API_KEY || '';
sgMail.setApiKey(apiKey);

export {sgMail}