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
  // USD: 'USD',
  // GBP: 'GBP'
}

// Define el esquema de Mongoose para la suscripción
const subscriptionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, unique:true },
  prize: { 
    amount: { type: Number, required: true },
    currency: { type: String, required: true, enum: Object.values(SupportedCurrencies)}
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

export {Subscription, CompanySubscription, CandidateSubscription }