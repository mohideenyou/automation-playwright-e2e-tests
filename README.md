# Automation Exercise – E2E Test Suite

End-to-end UI test automation for [automationexercise.com](https://automationexercise.com/), covering all 26 test cases published at [automationexercise.com/test_cases](https://automationexercise.com/test_cases).

Built with [Playwright](https://playwright.dev/) + TypeScript using the Page Object Model.

## Project structure

```
pages/        Page Object classes (one per site page)
tests/        One spec file per published test case (TC1–TC26)
fixtures/     Playwright fixtures wiring page objects into tests
utils/        Test data builders and API helpers (fast user setup/teardown)
test-data/    Static files used by tests (e.g. Contact Us file upload)
```

## Setup

```bash
npm install
npx playwright install --with-deps chromium
```

## Running the tests

```bash
npm test              # run all tests headless
npm run test:headed   # run with a visible browser
npm run test:ui       # interactive Playwright UI mode
npm run test:debug    # step through tests with the Playwright inspector
npm run report        # open the last HTML report
```

## Notes

- Tests run serially (`workers: 1`) against the live public site to avoid state/race conditions between tests (e.g. account creation/deletion).
- The site is monetized with third-party ads, including an interstitial that can occasionally intercept a click and hijack the URL to a `#google_vignette` fragment instead of navigating. `playwright.config.ts` sets `retries: 1` to absorb this external flakiness; it is unrelated to the site's own functionality under test.
- Where a test case requires a pre-existing account that isn't the thing under test (e.g. TC2 login), the suite creates/deletes that user via the site's public REST API (`/api/createAccount`, `/api/deleteAccount`) instead of the UI, keeping the test focused on the behavior it verifies and the suite fast.
- Each test that creates an account cleans it up at the end (via UI or API) so repeated runs don't pollute the live site with leftover data.
- CI (`.github/workflows/playwright.yml`) runs the suite on every push/PR to `main`, daily on a schedule, and on demand, uploading the HTML report as an artifact.

## Test case coverage

| # | Test Case | Spec file |
|---|---|---|
| 1 | Register User | `test_case_01_register_user.spec.ts` |
| 2 | Login User with correct email and password | `test_case_02_login_correct_credentials.spec.ts` |
| 3 | Login User with incorrect email and password | `test_case_03_login_incorrect_credentials.spec.ts` |
| 4 | Logout User | `test_case_04_logout_user.spec.ts` |
| 5 | Register User with existing email | `test_case_05_register_existing_email.spec.ts` |
| 6 | Contact Us Form | `test_case_06_contact_us_form.spec.ts` |
| 7 | Verify Test Cases Page | `test_case_07_verify_test_cases_page.spec.ts` |
| 8 | Verify All Products and product detail page | `test_case_08_verify_all_products_and_details.spec.ts` |
| 9 | Search Product | `test_case_09_search_product.spec.ts` |
| 10 | Verify Subscription in home page | `test_case_10_verify_subscription_home_page.spec.ts` |
| 11 | Verify Subscription in Cart page | `test_case_11_verify_subscription_cart_page.spec.ts` |
| 12 | Add Products in Cart | `test_case_12_add_products_in_cart.spec.ts` |
| 13 | Verify Product quantity in Cart | `test_case_13_verify_product_quantity_in_cart.spec.ts` |
| 14 | Place Order: Register while Checkout | `test_case_14_place_order_register_while_checkout.spec.ts` |
| 15 | Place Order: Register before Checkout | `test_case_15_place_order_register_before_checkout.spec.ts` |
| 16 | Place Order: Login before Checkout | `test_case_16_place_order_login_before_checkout.spec.ts` |
| 17 | Remove Products From Cart | `test_case_17_remove_products_from_cart.spec.ts` |
| 18 | View Category Products | `test_case_18_view_category_products.spec.ts` |
| 19 | View & Cart Brand Products | `test_case_19_view_and_cart_brand_products.spec.ts` |
| 20 | Search Products and Verify Cart After Login | `test_case_20_search_and_verify_cart_after_login.spec.ts` |
| 21 | Add review on product | `test_case_21_add_review_on_product.spec.ts` |
| 22 | Add to cart from Recommended items | `test_case_22_add_to_cart_from_recommended_items.spec.ts` |
| 23 | Verify address details in checkout page | `test_case_23_verify_address_details_in_checkout.spec.ts` |
| 24 | Download Invoice after purchase order | `test_case_24_download_invoice_after_order.spec.ts` |
| 25 | Verify Scroll Up using 'Arrow' button and Scroll Down functionality | `test_case_25_scroll_up_with_arrow_button.spec.ts` |
| 26 | Verify Scroll Up without 'Arrow' button and Scroll Down functionality | `test_case_26_scroll_up_without_arrow_button.spec.ts` |
