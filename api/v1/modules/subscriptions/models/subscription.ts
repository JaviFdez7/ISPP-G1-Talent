import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CompanySubscriptionTypes = {
  BASIC: 'Basic plan',
  PRO: 'Pro plan',
  CUSTOM: 'Custom plan'
}

const CandidateSubscriptionTypes = {
  BASIC: 'Basic plan',
  PRO: 'Pro plan'
}

const SubscriptionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, unique:true },
  prize: Number,
  lastPaymentDate: Date,
  expirationDate: Date,
  automaticRenovation: Boolean
}, { discriminatorKey: 'type' });
const Subscription = model('Subscription', SubscriptionSchema);

const CompanySubscriptionSchema = new Schema({
  subtype: {
    type: String,
    required: true,
    enum: Object.values(CompanySubscriptionTypes)
  }
});
const CompanySubscription = Subscription.discriminator('CompanySubscription', CompanySubscriptionSchema);

const CandidateSubscriptionSchema = new Schema({
  subtype: {
    type: String,
    required: true,
    enum: Object.values(CandidateSubscriptionTypes)
  }
});
const CandidateSubscription = Subscription.discriminator('CandidateSubscription', CandidateSubscriptionSchema);

export { CompanySubscription, CandidateSubscription }