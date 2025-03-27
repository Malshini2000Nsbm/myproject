describe("Login Page Tests", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173"); 
    });
  
    it("should display the login form correctly", () => {
      cy.get(".login-card").should("exist");
      cy.get("h1").should("contain", "Login to your Account");
      cy.get("input[type='email']").should("exist");
      cy.get("input[type='password']").should("exist");
      cy.get("button").should("contain", "Login");
    });
  
    it("should allow the user to type in email and password", () => {
      cy.get("input[type='email']")
        .type("test@example.com")
        .should("have.value", "test@example.com");
  
      cy.get("input[type='password']")
        .type("password123")
        .should("have.value", "password123");
    });
  
  
    it("should log in successfully and navigate to home page", () => {
      cy.intercept("POST", "http://localhost:5001/login", {
        statusCode: 200,
        body: { isProfileComplete: true },
      });
  
      cy.get("input[type='email']").type("test@example.com");
      cy.get("input[type='password']").type("password123");
      cy.get("button").click();
  
      cy.url().should("include", "/home"); 
    });
  
    it("should remember user when 'Remember me' is checked", () => {
      cy.get("input[type='email']").type("test@example.com");
      cy.get("input[type='password']").type("password123");
      cy.get("input[type='checkbox']").check().should("be.checked");
    });
  
    it("should navigate to the register page on clicking register", () => {
      cy.contains("Register").click();
      cy.url().should("include", "/register");
    });
  
    
  });
  