import { APIRequestContext } from '@playwright/test';
import { SignupDetails } from './test-data';

export async function createUserViaApi(request: APIRequestContext, details: SignupDetails) {
  const response = await request.post('https://automationexercise.com/api/createAccount', {
    form: {
      name: details.name,
      email: details.email,
      password: details.password,
      title: details.gender,
      birth_date: details.day,
      birth_month: details.month,
      birth_year: details.year,
      firstname: details.firstName,
      lastname: details.lastName,
      company: details.company,
      address1: details.address1,
      address2: details.address2,
      country: details.country,
      zipcode: details.zipcode,
      state: details.state,
      city: details.city,
      mobile_number: details.mobileNumber,
    },
  });
  const body = await response.json();
  if (body.responseCode !== 201) {
    throw new Error(`Failed to create user via API: ${JSON.stringify(body)}`);
  }
}

export async function deleteUserViaApi(request: APIRequestContext, email: string, password: string) {
  await request.delete('https://automationexercise.com/api/deleteAccount', {
    form: { email, password },
  });
}
