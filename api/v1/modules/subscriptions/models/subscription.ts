import mongoose from 'mongoose'

const { Schema, model } = mongoose

const CompanySubscriptionTypes = {
  NO_SUBSCRIPTION: 'No subscription',
  BASIC: 'Basic plan',
  PRO: 'Pro plan'
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

const subscriptionSchema = new Schema(
  {
    price: {
      amount: { type: Number, required: true },
      currency: { type: String, required: true, enum: Object.values(SupportedCurrencies) }
    },
    lastPaymentDate: Date,
    expirationDate: Date,
    automaticRenovation: Boolean
  },
  { discriminatorKey: 'type' }
)

const Subscription = model('Subscription', subscriptionSchema)

const CompanySubscriptionSchema = new Schema({
  subtype: {
    type: String,
    required: true,
    enum: Object.values(CompanySubscriptionTypes)
  },
  remainingSearches: { type: Number, required: true, default: 0 },
  teamLimit: { type: Number, required: true, default: 0 }
})
const CompanySubscription = Subscription.discriminator(
  'CompanySubscription',
  CompanySubscriptionSchema
)

const CandidateSubscriptionSchema = new Schema({
  subtype: {
    type: String,
    required: true,
    enum: Object.values(CandidateSubscriptionTypes)
  },
  remainingUpdates: { type: Number, required: true, default: 1 },
  canInspectEmail: { type: Boolean, required: true, default: false }
})
const CandidateSubscription = Subscription.discriminator(
  'CandidateSubscription',
  CandidateSubscriptionSchema
)

export {
  Subscription,
  CompanySubscription,
  CandidateSubscription,
  CompanySubscriptionTypes,
  CandidateSubscriptionTypes
}
