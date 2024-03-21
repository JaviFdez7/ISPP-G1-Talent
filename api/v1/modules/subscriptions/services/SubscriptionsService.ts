import { Candidate, Representative, User } from "../../user/models/user";
import { CandidateSubscription, CompanySubscription } from "../models/subscription";
import { Subscription } from "../models/subscription";
// Default service functions
export const getAllSubscriptions: any = async () => {
  return await Subscription.find({});
};

export const getSubscriptionsByUserId: any = async (userId: any) => {
  return await Subscription.findOne({ userId: userId });
};

export const createSubscriptions: any = async (userId: any) => {
  const user = User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  if (user instanceof Representative) {
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 1);
    const subscription = new CompanySubscription({ 
      userId: userId,
      subtype: 'BASIC',
      prize: {
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
  if (user instanceof Candidate) {
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 1);
    const subscription = new CandidateSubscription({ 
      userId: userId,
      subtype: 'BASIC',
      prize: {
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
  const subscription = await Subscription.findOne({ userId: userId });
  if (!subscription) {
    throw new Error('Subscription not found');
  }
    else if (subscription instanceof CompanySubscription) {
      subscription.set( { subtype: subtype });
    if (subtype === 'BASIC') {
      subscription.set( { prize: { amount: 30, currency: 'EUR' } });
    } else if (subtype === 'PRO') {
      subscription.set( { prize: { amount: 80, currency: 'EUR' } });
    }
    subscription.lastPaymentDate = new Date();
    subscription.expirationDate = new Date();
    subscription.expirationDate.setMonth(subscription.expirationDate.getMonth() + 1);
    await subscription.save();
    return subscription;
  } else if (subscription instanceof CandidateSubscription) {
    subscription.set( { subtype: subtype });
    if (subtype === 'BASIC') {
      subscription.set( { prize: { amount: 0, currency: 'EUR' } });
    } else if (subtype === 'PRO') {
      subscription.set( { prize: { amount: 30, currency: 'EUR' } });
    }
    subscription.lastPaymentDate = new Date();
    subscription.expirationDate = new Date();
    subscription.expirationDate.setMonth(subscription.expirationDate.getMonth() + 1);
    await subscription.save();
    return subscription;
  }
}

export const deleteSubscriptions: any = async (userId: any) => {
  const subscription = await Subscription.findByIdAndDelete(userId);
  if (!subscription) {
    throw new Error('Subscription not found');
  }
  return 'Subscription deleted successfully.';
};
export default {
  getAllSubscriptions,
  getSubscriptionsByUserId,
  createSubscriptions,
  updateSubscriptions,
  deleteSubscriptions
};
