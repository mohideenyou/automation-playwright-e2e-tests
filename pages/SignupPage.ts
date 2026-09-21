import { expect, Locator, Page } from '@playwright/test';
import { SignupDetails } from '../utils/test-data';

export class SignupPage {
  readonly page: Page;
  readonly genderMrRadio: Locator;
  readonly genderMrsRadio: Locator;
  readonly passwordInput: Locator;
  readonly daysSelect: Locator;
  readonly monthsSelect: Locator;
  readonly yearsSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly optinCheckbox: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;
  readonly accountCreatedHeading: Locator;
  readonly continueButton: Locator;
  readonly accountDeletedHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.genderMrRadio = page.locator('#id_gender1');
    this.genderMrsRadio = page.locator('#id_gender2');
    this.passwordInput = page.locator('[data-qa="password"]');
    this.daysSelect = page.locator('[data-qa="days"]');
    this.monthsSelect = page.locator('[data-qa="months"]');
    this.yearsSelect = page.locator('[data-qa="years"]');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.optinCheckbox = page.locator('#optin');
    this.firstNameInput = page.locator('[data-qa="first_name"]');
    this.lastNameInput = page.locator('[data-qa="last_name"]');
    this.companyInput = page.locator('[data-qa="company"]');
    this.address1Input = page.locator('[data-qa="address"]');
    this.address2Input = page.locator('[data-qa="address2"]');
    this.countrySelect = page.locator('[data-qa="country"]');
    this.stateInput = page.locator('[data-qa="state"]');
    this.cityInput = page.locator('[data-qa="city"]');
    this.zipcodeInput = page.locator('[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('[data-qa="create-account"]');
    this.accountCreatedHeading = page.locator('[data-qa="account-created"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
    this.accountDeletedHeading = page.locator('[data-qa="account-deleted"]');
  }

  async assertOnAccountInfoPage() {
    await expect(this.page.getByText('Enter Account Information')).toBeVisible();
  }

  async fillAccountInformation(details: SignupDetails) {
    await (details.gender === 'Mr' ? this.genderMrRadio : this.genderMrsRadio).check();
    await this.passwordInput.fill(details.password);
    await this.daysSelect.selectOption(details.day);
    await this.monthsSelect.selectOption(details.month);
    await this.yearsSelect.selectOption(details.year);
    if (details.newsletter) await this.newsletterCheckbox.check();
    if (details.optin) await this.optinCheckbox.check();
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.companyInput.fill(details.company);
    await this.address1Input.fill(details.address1);
    await this.address2Input.fill(details.address2);
    await this.countrySelect.selectOption(details.country);
    await this.stateInput.fill(details.state);
    await this.cityInput.fill(details.city);
    await this.zipcodeInput.fill(details.zipcode);
    await this.mobileNumberInput.fill(details.mobileNumber);
  }

  async submitCreateAccount() {
    await this.createAccountButton.click();
  }

  async assertAccountCreated() {
    await expect(this.accountCreatedHeading).toBeVisible();
    await expect(this.accountCreatedHeading).toContainText('Account Created!');
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async assertAccountDeleted() {
    await expect(this.accountDeletedHeading).toBeVisible();
    await expect(this.accountDeletedHeading).toContainText('Account Deleted!');
  }
}
