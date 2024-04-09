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

const SupportedCurrencies = {
  EUR: 'EUR'
  /*
   * USD: 'USD',
   * GBP: 'GBP'
   */
}

// Define el esquema de Mongoose para la suscripción
const subscriptionSchema = new Schema({
  price: {
    amount: { type: Number, required: true },
    currency: { type: String, required: true, enum: Object.values(SupportedCurrencies) }
  },
  lastPaymentDate: Date,
  expirationDate: Date,
  automaticRenovation: Boolean

}, { discriminatorKey: 'type' });

// Crea el modelo de Mongoose para la Subscription
const Subscription = model('Subscription', subscriptionSchema);

const CompanySubscriptionSchema = new Schema({
  subtype: {
    type: String,
    required: true,
    enum: Object.values(CompanySubscriptionTypes)
  },
  remainingSearches:{ type: Number, required: true,default:25 },
  teamLimit:{type: Number, required: true,default:3}
});
const CompanySubscription = Subscription.discriminator('CompanySubscription', CompanySubscriptionSchema);

const CandidateSubscriptionSchema = new Schema({
  subtype: {
    type: String,
    required: true,
    enum: Object.values(CandidateSubscriptionTypes)
  },
  remainingUpdates:{type: Number, required: true, default:1},
  canInspectEmail:{type: Boolean,required:true, default:false}
});
const CandidateSubscription = Subscription.discriminator('CandidateSubscription', CandidateSubscriptionSchema);

export { Subscription, CompanySubscription, CandidateSubscription, CompanySubscriptionTypes, CandidateSubscriptionTypes }
