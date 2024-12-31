describe('Checkout Process Testing - Part 1', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/v1/');
      cy.login('standard_user', 'secret_sauce');
      cy.get('.btn_inventory').first().click();
      cy.get('.shopping_cart_link').click();
      cy.get('.checkout_button').click();
    });
  
    it('Verify Mandatory Fields in Checkout Info Page', () => {
      cy.get('.btn_primary').click();
      cy.get('.error-message-container').should('be.visible');
    });
  
    it('Validate Invalid ZIP Code Input', () => {
      cy.get('[data-test=firstName]').type('John');
      cy.get('[data-test=lastName]').type('Doe');
      cy.get('[data-test=postalCode]').type('abc');
      cy.get('.btn_primary').click();
      cy.get('.error-message-container').should('contain', 'Error');
    });
  
    it('Submit Valid Checkout Information', () => {
      cy.get('[data-test=firstName]').type('John');
      cy.get('[data-test=lastName]').type('Doe');
      cy.get('[data-test=postalCode]').type('12345');
      cy.get('.btn_primary').click();
      cy.url().should('include', 'checkout-step-two.html');
    });
  
    it('Cancel Checkout and Return to Cart', () => {
      cy.get('.cart_cancel_link').click();
      cy.url().should('include', 'cart.html');
    });
  
    it('Complete Order Placement', () => {
      cy.get('[data-test=firstName]').type('John');
      cy.get('[data-test=lastName]').type('Doe');
      cy.get('[data-test=postalCode]').type('12345');
      cy.get('.btn_primary').click();
      cy.get('.btn_action').click();
      cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER');
    });
  });
  