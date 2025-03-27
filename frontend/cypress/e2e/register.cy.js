describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/register'); // Assuming '/register' is the route for your registration page
  });

  it('should display the registration form', () => {
    cy.get('h1').contains('Create your Account');
    cy.get('form').should('exist');
    cy.get('input#firstName').should('exist');
    cy.get('input#lastName').should('exist');
    cy.get('input#email').should('exist');
    cy.get('input#password').should('exist');
    cy.get('input#confirmPassword').should('exist');
  });

  it('should display error message when the passwords do not match', () => {
    cy.get('input#firstName').type('John');
    cy.get('input#lastName').type('Doe');
    cy.get('input#email').type('john.doe@example.com');
    cy.get('input#password').type('password123');
    cy.get('input#confirmPassword').type('password124');
    
    cy.get('button[type="submit"]').click();

    cy.get('.error-message').should('contain', 'Passwords do not match!');
  });

 

  it('should successfully register with valid inputs', () => {
    cy.get('input#firstName').type('John');
    cy.get('input#lastName').type('Doe');
    cy.get('input#email').type('john.doe@example.com');
    cy.get('input#password').type('password123');
    cy.get('input#confirmPassword').type('password123');

    cy.get('input[type="checkbox"]').check(); // Agree to terms and conditions

    cy.get('button[type="submit"]').click();

    cy.get('.success-message').should('contain', 'Account created successfully!');

    // Check if user is redirected after success
    cy.url().should('eq', 'http://localhost:5173/'); // Adjust URL as per your environment
  });

  it('should display an error if the email is already registered', () => {
    // Simulate a response for already registered email
    cy.intercept('POST', 'http://localhost:5001/register', {
      statusCode: 400,
      body: { message: 'User already registered' },
    }).as('registerRequest');

    cy.get('input#firstName').type('John');
    cy.get('input#lastName').type('Doe');
    cy.get('input#email').type('existing.email@example.com');
    cy.get('input#password').type('password123');
    cy.get('input#confirmPassword').type('password123');

    cy.get('button[type="submit"]').click();

    cy.wait('@registerRequest');

    cy.get('.error-message').should('contain', 'This email is already registered. Please log in.');
  });

});
