// cypress/e2e/auth-signin.cy.ts
describe('Auth Sign In Page', () => {
    beforeEach(() => {
        // Visit the sign-in page before each test
        cy.visit('http://localhost:8080/signin'); // Adjust this path based on your routing configuration
    });

    it('should display the sign-in form with email and password fields', () => {
        // Check if the sign-in form is visible
        cy.contains('Sign in').should('be.visible');

        // Check for the presence of email and password fields
        cy.get('input[type="text"][placeholder="test@gmail.com"]').should('be.visible');
        cy.get('input[type="password"][placeholder="test@1234"]').should('be.visible');
    });
    // it('should allow the user to sign in with valid credentials', () => {
    //     // Enter valid email
    //     cy.get('input[type="text"][placeholder="test@gmail.com"]').type('validuser@example.com');

    //     // Enter valid password
    //     cy.get('input[type="password"][placeholder="test@1234"]').type('validPassword123');

    //     // Click the sign-in button
    //     cy.get('button').contains('Sign in').click();

    //     // Check for navigation to the main page or a success message
    //     cy.url().should('include', '/main'); // Adjust based on the expected route after successful sign-in
    // });
    it('should show error messages for invalid inputs', () => {
        // Enter an invalid email
        cy.get('input[type="text"][placeholder="test@gmail.com"]').type('invalid-email');

        // Enter a short password
        cy.get('input[type="password"][placeholder="test@1234"]').type('123');

        // Click the sign-in button
        cy.get('button').contains('Sign in').click();

        // Check for validation error messages
        cy.contains('Value is not a valid email address').should('be.visible');
        cy.contains('This field should be at least 6 characters long').should('be.visible');
    });
    // it('should display loading state and handle failed sign-in attempt', () => {
    //     // Stub the API request to simulate a failed login
    //     cy.intercept('POST', '**/auth/login', {
    //         statusCode: 401,
    //         body: { message: 'Invalid credentials' },
    //     });

    //     // Enter valid credentials
    //     cy.get('input[type="text"][placeholder="test@gmail.com"]').type('wronguser@example.com');
    //     cy.get('input[type="password"][placeholder="test@1234"]').type('wrongPassword');

    //     // Click the sign-in button
    //     cy.get('button').contains('Sign in').click();

    //     // Check if the loading indicator appears
    //     cy.get('button').contains('Sign in').should('have.attr', 'disabled');

    //     // Verify error message from the server
    //     cy.contains('Invalid credentials').should('be.visible');
    // });

});
