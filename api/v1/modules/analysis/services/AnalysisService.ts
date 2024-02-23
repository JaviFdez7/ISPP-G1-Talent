// Default service functions
export const getAllAnalysis: any = async () => {
  throw new Error('Not Implemented');
};

export const getAnalysisById: any = async (id: any) => {
  throw new Error('Not Implemented, id: ' + id);
};

export const createAnalysis: any = async (data: any) => {
  throw new Error('Not Implemented, data: ' + data);
};

export const updateAnalysis: any = async (id: any, data: any) => {
  throw new Error('Not Implemented: id: ' + id + ', data: ' + data);
};

export const deleteAnalysis: any = async (id: any) => {
  throw new Error('Not Implemented: id: ' + id);
};
export default {
  getAllAnalysis,
  getAnalysisById,
  createAnalysis,
  updateAnalysis,
  deleteAnalysis
};
