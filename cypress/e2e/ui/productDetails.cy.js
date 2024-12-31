describe('Product Details Page Testing', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/v1/');
      cy.login('standard_user', 'secret_sauce');
    });
  
    it('Verify Product Details Information', () => {
      cy.get('.inventory_item').first().then(($item) => {
        const name = $item.find('.inventory_item_name').text();
        const price = $item.find('.inventory_item_price').text();
        $item.find('.inventory_item_img').click();
        cy.get('.inventory_details_name').should('have.text', name);
        cy.get('.inventory_details_price').should('have.text', price);
      });
    });
  
    it('Add to Cart from Details Page', () => {
      cy.get('.inventory_item_img').first().click();
      cy.get('.btn_inventory').contains('Add to cart').click();
      cy.get('.shopping_cart_badge').should('contain', '1');
    });
  
    it('Remove from Cart in Details Page', () => {
      cy.get('.inventory_item_img').first().click();
      cy.get('.btn_inventory').contains('Add to cart').click();
      cy.get('.btn_inventory').contains('Remove').click();
      cy.get('.shopping_cart_badge').should('not.exist');
    });
  
    it('Navigate Back to Product List', () => {
      cy.get('.inventory_item_img').first().click();
      cy.get('.inventory_details_back_button').click();
      cy.url().should('include', '/inventory.html');
    });
  
    it('Check Multiple Product Details Pages', () => {
      cy.get('.inventory_item_img').each(($item) => {
        cy.wrap($item).click();
        cy.get('.inventory_details_name').should('be.visible');
        cy.get('.inventory_details_price').should('be.visible');
        cy.get('.inventory_details_back_button').click();
      });
    });
  });
  