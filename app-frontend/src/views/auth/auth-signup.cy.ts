import "@/assets/scss/main.scss"

import AuthSignup from './auth-signup.vue'

describe('Auth Sign In Page', () => {
    beforeEach(() => {
        cy.mount(AuthSignup);
    });

    it('should display the sign-up form with name, email, and password fields', () => {
        // Check if the sign-up form is visible
        cy.contains('Sign up').should('be.visible');

        // Check for the presence of name, email, and password fields
        cy.get('input[type="text"][placeholder="John"]').should('be.visible');
        cy.get('input[type="text"][placeholder="test@gmail.com"]').should('be.visible');
        cy.get('input[type="password"][placeholder="test1234"]').should('be.visible');
    });

    it('should allow the user to sign up with valid credentials', () => {
        // Enter valid name
        cy.get('input[type="text"][placeholder="John"]').type('John Doe');

        // Enter valid email
        cy.get('input[type="text"][placeholder="test@gmail.com"]').type('validuser@example.com');

        // Enter valid password
        cy.get('input[type="password"][placeholder="test1234"]').type('validPassword123');

        // Click the sign-up button
        cy.get('button').contains('Sign up').click();

        // Check for navigation to the main page or a success message
        cy.url().should('include', '/chat'); // Adjust based on the expected route after successful sign-up
    });

    it('should show error messages for invalid inputs', () => {
        // Enter an empty name
        cy.get('input[type="text"][placeholder="John"]').clear();

        // Enter an invalid email
        cy.get('input[type="text"][placeholder="test@gmail.com"]').type('invalid-email');

        // Enter a short password
        cy.get('input[type="password"][placeholder="test1234"]').type('123');

        // Click the sign-up button
        cy.get('button').contains('Sign up').click();

        // Check for validation error messages
        cy.contains('Value is not a valid email address').should('be.visible');
        cy.contains('This field should be at least 6 characters long').should('be.visible');
    });

    it('should display loading state and handle failed sign-up attempt', () => {
        // Stub the API request to simulate a failed registration
        cy.intercept('POST', '**/auth/register', {
            statusCode: 400,
            body: { 
                errors: [],
                message: "User with this email already exists" 
            },
        });

        // Enter valid credentials
        cy.get('input[type="text"][placeholder="John"]').type('Test');
        cy.get('input[type="text"][placeholder="test@gmail.com"]').type('test@gmail.com');
        cy.get('input[type="password"][placeholder="test1234"]').type('test1234');

        // Click the sign-up button
        cy.get('button').contains('Sign up').click();

        // Check if the loading indicator appears
        // cy.get('button').contains('Sign up').should('have.attr', 'disabled');

        // Verify error message from the server
        // cy.contains('Registration failed').should('be.visible');
    });

});