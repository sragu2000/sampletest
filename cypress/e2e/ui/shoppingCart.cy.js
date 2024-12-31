import { uiBaseURL } from "../../support/data";

describe('Shopping Cart Testing', () => {
  beforeEach(() => {
    cy.visit(uiBaseURL);
    cy.login('standard_user', 'secret_sauce');
  });

  it('Add Single Product to Cart', () => {
    cy.get('.btn_inventory').first().click();
    cy.get('.shopping_cart_badge').should('contain', '1');
  });

  it('Add Multiple Products to Cart', () => {
    cy.get('.btn_inventory').each(($btn, index) => {
      if (index < 3) cy.wrap($btn).click();
    });
    cy.get('.shopping_cart_badge').should('contain', '3');
  });

  it('Remove Product from Cart', () => {
    cy.get('.btn_inventory').first().click();
    cy.get('.shopping_cart_badge').should('contain', '1');
    cy.get('.btn_inventory').first().click();
    cy.get('.shopping_cart_badge').should('not.exist');
  });

  it('Empty Cart Validation', () => {
    cy.get('.shopping_cart_link').click();
    cy.get('.cart_quantity').should('not.exist');
  });

  it('Navigate to Product from Cart', () => {
    cy.get('.btn_inventory').first().click();
    cy.get('.shopping_cart_link').click();
    cy.get('.cart_item .inventory_item_name').click();
    cy.url().should('include', '/inventory-item.html');
  });
});
