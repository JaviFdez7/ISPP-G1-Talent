import { Notification } from "../models/notification";
import { Candidate,Representative } from "../../user/models/user";

export const getAllNotification: any = async () => {
  throw new Error('Not Implemented');
};

export const getNotificationById: any = async (id: any) => {
  throw new Error('Not Implemented, id: ' + id);
};

export const getNotificationsByCandidateId: any = async (candidateId: any) => {
  try{
    const notifications=await Notification.find({candidateId:candidateId});
  }catch(error){
    throw new Error('Unknown error when getting all notifications of candidate.');
  }
};

export const createNotification: any = async (data: any) => {
  
};

export const updateNotification: any = async (id: any, data: any) => {
  throw new Error('Not Implemented: id: ' + id + ', data: ' + data);
};

export const deleteNotification: any = async (id: any) => {
  throw new Error('Not Implemented: id: ' + id);
};
export default {
  getAllNotification,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
  getNotificationsByCandidateId
};
