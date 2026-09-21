import { expect, Locator, Page } from '@playwright/test';
import path from 'path';

export class ContactUsPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageTextArea: Locator;
  readonly uploadFileInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly homeButton: Locator;
  readonly getInTouchHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('[data-qa="name"]');
    this.emailInput = page.locator('[data-qa="email"]');
    this.subjectInput = page.locator('[data-qa="subject"]');
    this.messageTextArea = page.locator('[data-qa="message"]');
    this.uploadFileInput = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('[data-qa="submit-button"]');
    this.successMessage = page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.');
    this.homeButton = page.locator('a', { hasText: 'Home' }).first();
    this.getInTouchHeading = page.getByRole('heading', { name: 'Get In Touch' });
  }

  async goto() {
    await this.page.goto('/contact_us');
  }

  async assertOnContactUsPage() {
    await expect(this.getInTouchHeading).toBeVisible();
    // A third-party ad script re-renders part of the page shortly after load, which can replace
    // the submit button and detach its click handler mid-interaction. Wait for the network (and
    // that script) to settle before touching the form.
    await this.page.waitForLoadState('networkidle');
  }

  async submitAndWaitForResult() {
    // The confirm() dialog blocks the page's JS, so click() can't resolve until the dialog is
    // handled: accept it concurrently instead of awaiting the click first (which would deadlock).
    await Promise.all([
      this.page.waitForEvent('dialog').then((dialog) => dialog.accept()),
      this.submitButton.click(),
    ]);
    await expect(this.successMessage).toBeVisible();
  }

  async fillForm(name: string, email: string, subject: string, message: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageTextArea.fill(message);
  }

  async uploadFile(filePath: string) {
    await this.uploadFileInput.setInputFiles(path.resolve(filePath));
  }

}
