import {User } from "../../user/models/user";
import { CandidateSubscription, CompanySubscription, CandidateSubscriptionTypes, CompanySubscriptionTypes } from "../models/subscription";
import { Subscription } from "../models/subscription";
// Default service functions
export const getAllSubscriptions: any = async () => {
  return await Subscription.find();
};

export const getSubscriptionsByUserId: any = async (userId: any) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return await Subscription.findById(user.subscriptionId);
};

export const createSubscriptions: any = async (role: any) => {
  console.log("holaa");
  if (role === 'Representative') {
    console.log("holaa");
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 1);
    const subscription = new CompanySubscription({ 
      subtype: CompanySubscriptionTypes.BASIC,
      price: {
        amount: 29.99,
        currency: 'EUR'
      },
      lastPaymentDate: new Date(),
      expirationDate: expirationDate,
      automaticRenovation: false,
    });
    await subscription.save();
    return subscription;
  } else if (role === "Candidate") {
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 1);
    const subscription = new CandidateSubscription({ 
      subtype: CandidateSubscriptionTypes.BASIC,
      price: {
        amount: 0,
        currency: 'EUR'
      },
      lastPaymentDate: new Date(),
      expirationDate: expirationDate,
      automaticRenovation: false,
    });
    await subscription.save();
    return subscription;
  }
};

export const updateSubscriptions: any = async (userId: any, subtype: any) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const subscription= await Subscription.findById(user.subscriptionId);
  if (!subscription) {
    throw new Error('Subscription not found');
  }
    else if ((subscription as any).type === 'CompanySubscription') {
      subscription.set( { subtype: subtype });
    if (subtype === CompanySubscriptionTypes.BASIC) {
      subscription.set( { price: { amount: 29.99, currency: 'EUR' } });
    } else if (subtype === CompanySubscriptionTypes.PRO) {
      subscription.set( { price: { amount: 79.99, currency: 'EUR' } });
    }
    subscription.lastPaymentDate = new Date();
    subscription.expirationDate = new Date();
    subscription.expirationDate.setMonth(subscription.expirationDate.getMonth() + 1);
    await subscription.save();
    return subscription;
  } else if ((subscription as any).type === 'CandidateSubscription') {
    subscription.set( { subtype: subtype });
    if (subtype === CandidateSubscriptionTypes.BASIC) {
      subscription.set( { price: { amount: 0, currency: 'EUR' } });
    } else if (subtype === CandidateSubscriptionTypes.PRO) {
      subscription.set( { price: { amount: 9.99, currency: 'EUR' } });
    }
    subscription.lastPaymentDate = new Date();
    subscription.expirationDate = new Date();
    subscription.expirationDate.setMonth(subscription.expirationDate.getMonth() + 1);
    await subscription.save();
    return subscription;
  }
}

export default {
  getAllSubscriptions,
  getSubscriptionsByUserId,
  createSubscriptions,
  updateSubscriptions
};
