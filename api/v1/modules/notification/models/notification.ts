import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const notificationSchema = new Schema({
  // Id of the user who made the request and owns the history
  representativeId: { type: Schema.Types.ObjectId, ref: 'Representative', required: true },

  // Id of the analysys
  candidateId: { type: Schema.Types.ObjectId, ref: 'Candidate', required: true },

  // Date of the request
  dateTime: { type: Date, required: true, default: Date.now },

  // Marks the request as favourite
  message: { type: String, required: true }
});

const Notification = model('Notification', notificationSchema);

export { Notification }