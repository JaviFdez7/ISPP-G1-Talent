import { subscribe } from "diagnostics_channel";
import { CompanySubscription } from "../models/subscription";

// Default service functions
export const getAllSubscriptions: any = async () => {
  throw new Error('Not Implemented');
};

export const getSubscriptionsByUserId: any = async (userId: any) => {
  return await CompanySubscription.findOne({ userId: userId });
};

export const createSubscriptions: any = async (data: any) => {
  throw new Error('Not Implemented, data: ' + data);
};

export const updateSubscriptions: any = async (userId: any, data: any) => {
  throw new Error('Not Implemented: id: ' + userId + ', data: ' + data);
};

export const deleteSubscriptions: any = async (userId: any) => {
  throw new Error('Not Implemented: id: ' + userId);
};
export default {
  getAllSubscriptions,
  getSubscriptionsByUserId,
  createSubscriptions,
  updateSubscriptions,
  deleteSubscriptions
};
