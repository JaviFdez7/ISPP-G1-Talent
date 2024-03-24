// eslint-disable-next-line @typescript-eslint/await-thenable
import { type Request, type Response } from 'express';
import UserService from '../../user/services/UserService';
import { ApiResponse } from '../../../utils/ApiResponse';

const stripe = require('stripe')(process.env.STRIPE_API_KEY);

export const getPaymentsByUserId: any = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await UserService.getUserById(id);

    let stripeUser: any;

    if (!user.stripeUserId)
    {
        try {
            const clients = await stripe.customers.list();
            stripeUser = clients.data.find((customer: { email: String; }) => customer.email === user.email);
          } catch (error: any) {
            console.error('Error reading from Stripe', error);
            ApiResponse.sendError(res, [{
                title: 'Internal Server Error',
                detail: error.message
              }]);
        }

        try {
            user.stripeUserId = stripeUser.id;
            await UserService.updateUser(user);
        } catch (error: any)
        {
            console.error(error);
            ApiResponse.sendError(res, [{
                title: 'Internal Server Error',
                detail: error.message
              }]);
        }
    }
    else
    {
        stripeUser = await stripe.customers.retrieve(user.stripeUserId);
    }

    let userInvoices = await stripe.invoices.list({
        customer: stripeUser.id,
        limit: 1
    })
    let isPayed = userInvoices.data.length > 0;
    const interval = setInterval(async () => {
        try {
            // Tu código aquí
            while (!isPayed) {
                userInvoices = await stripe.invoices.list({
                    customer: stripeUser.id,
                    limit: 1
                })
                isPayed = userInvoices.data.length > 0
            }
    
            const lastInvoice = userInvoices.data[0];
            let lastPaymentDate = new Date(lastInvoice.data[0].charge.created * 1000);
            const currentDate = new Date();
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    
            if (lastPaymentDate > oneMonthAgo) {
                const lastPayment = lastInvoice.data[0].charge;
                switch (lastPayment.status) {
                    case "succeeded": {
                        user.lastPayment = lastPayment.created;
                        await UserService.updateUser(user);
                        console.log("Payment succeeded");
                        ApiResponse.sendSuccess(res, user, 200, {
                            self: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                          });
                        clearInterval(interval);
                    }
                    case "canceled": {
                        console.error("Payment failed");
                        ApiResponse.sendError(res, [{
                            title: 'Internal Server Error',
                            detail: "Payment failed"
                          }]);
                        clearInterval(interval);
                    }
                }
            }
        } catch (error: any) {
            ApiResponse.sendError(res, [{
                title: 'Internal Server Error',
                detail: error.message
              }]);
        }
    }, 15000);
    
    setTimeout(() => {
        clearInterval(interval); 
    }, 86400000);

};