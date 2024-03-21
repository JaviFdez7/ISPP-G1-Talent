// eslint-disable-next-line @typescript-eslint/await-thenable
import { type Request, type Response } from 'express';
import SubscriptionsService from '../services/SubscriptionsService';

// Default controller functions
export const getAllSubscriptions: any = async (req: Request, res: Response) => {
  try {
    const data = await SubscriptionsService.getAllSubscriptions();
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const getSubscriptionsByUserId: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await SubscriptionsService.getSubscriptionsById(id);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const createSubscriptions: any = async (req: Request, res: Response) => {
  try {
    const data = await SubscriptionsService.createSubscriptions(req.body);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const updateSubscriptions: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const subtype = req.body.subtype
    const data = await SubscriptionsService.updateSubscriptions(id, subtype);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
export default {
  getAllSubscriptions,
  getSubscriptionsByUserId,
  createSubscriptions,
  updateSubscriptions
};
