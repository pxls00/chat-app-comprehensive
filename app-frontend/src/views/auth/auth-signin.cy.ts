import "@/assets/scss/main.scss"

import AuthSignin from './auth-signin.vue'

describe('Auth Sign In Page', () => {
  beforeEach(() => {
      cy.mount(AuthSignin);
  });

  it('should display the sign-in form with email and password fields', () => {
      cy.contains('Sign in').should('be.visible');

      cy.get('input[type="text"][placeholder="test@gmail.com"]').should('be.visible');
      cy.get('input[type="password"][placeholder="test@1234"]').should('be.visible');
  });
  it('should allow the user to sign in with valid credentials', () => {
      cy.get('input[type="text"][placeholder="test@gmail.com"]').type('test@gmail.com');

      cy.get('input[type="password"][placeholder="test@1234"]').type('test1234');

      cy.get('button').contains('Sign in').click();

      cy.url().should('include', '/chat');
  });
  it('should show error messages for invalid inputs', () => {
      cy.get('input[type="text"][placeholder="test@gmail.com"]').type('invalid-email');

      cy.get('input[type="password"][placeholder="test@1234"]').type('123');

      cy.get('button').contains('Sign in').click();

      cy.contains('Value is not a valid email address').should('be.visible');
      cy.contains('This field should be at least 6 characters long').should('be.visible');
  });
  it('should display loading state and handle failed sign-in attempt', () => {
      cy.intercept('POST', '**/auth/login', {
          statusCode: 400,
          body: { 
            errors: [],
            message: "User with this email not found" 
          },
      });

      cy.get('input[type="text"][placeholder="test@gmail.com"]').type('wronguser@example.com');
      cy.get('input[type="password"][placeholder="test@1234"]').type('wrongPassword');

      cy.get('button').contains('Sign in').click();
  });

});