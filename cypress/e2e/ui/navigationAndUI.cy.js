describe('Navigation and UI Testing', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/v1/');
      cy.login('standard_user', 'secret_sauce');
    });
  
    it('Test Menu Button Functionality', () => {
      cy.get('.bm-burger-button').click(); // Open menu
      cy.get('.bm-menu-wrap').should('be.visible'); // Verify menu is visible
    });
  
    it('Verify Sidebar Close Button', () => {
      cy.get('.bm-burger-button').click(); // Open menu
      cy.get('.bm-cross-button').click(); // Close menu
      cy.get('.bm-menu-wrap').should('not.exist'); // Verify menu closed
    });
  
    it('Logout from Sidebar', () => {
      cy.get('.bm-burger-button').click();
      cy.contains('Logout').click();
      cy.url().should('include', 'index.html'); // Verify redirected to login page
    });
  
    it('Reset App State', () => {
      cy.get('.btn_inventory').first().click(); // Add item to cart
      cy.get('.bm-burger-button').click(); // Open menu
      cy.contains('Reset App State').click(); // Reset state
      cy.get('.shopping_cart_badge').should('not.exist'); // Verify cart is empty
    });
  
    it('Cross-Browser Testing', () => {
      cy.log('Test manually on multiple browsers for compatibility.');
    });
  });
  