export interface SignupDetails {
  name: string;
  email: string;
  password: string;
  gender: 'Mr' | 'Mrs';
  day: string;
  month: string;
  year: string;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
  newsletter?: boolean;
  optin?: boolean;
}

export function uniqueEmail(prefix = 'qa_user'): string {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}@example.com`;
}

export function buildSignupDetails(overrides: Partial<SignupDetails> = {}): SignupDetails {
  return {
    name: 'Test User',
    email: uniqueEmail(),
    password: 'TestPass123!',
    gender: 'Mr',
    day: '10',
    month: '5',
    year: '1995',
    firstName: 'Test',
    lastName: 'User',
    company: 'TestCo Inc',
    address1: '123 Test Street',
    address2: 'Apt 4B',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001',
    mobileNumber: '9876543210',
    newsletter: true,
    optin: true,
    ...overrides,
  };
}

export const VALID_PAYMENT_CARD = {
  nameOnCard: 'Test User',
  cardNumber: '4111111111111111',
  cvc: '123',
  expiryMonth: '12',
  expiryYear: '2028',
};
