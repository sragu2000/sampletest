import { uiBaseURL } from "../../support/data";

describe('Product Details Page Testing', () => {
  beforeEach(() => {
    cy.visit(uiBaseURL);
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
    cy.get('.btn_inventory').contains('ADD TO CART').click();
    cy.get('.shopping_cart_badge').should('contain', '1');
  });

  it('Remove from Cart in Details Page', () => {
    cy.get('.inventory_item_img').first().click();
    cy.get('.btn_inventory').contains('ADD TO CART').click();
    cy.get('.btn_inventory').contains('REMOVE').click();
    cy.get('.shopping_cart_badge').should('not.exist');
  });

  it('Navigate Back to Product List', () => {
    cy.get('.inventory_item_img').first().click();
    // allowing the click action to proceed even if the element is covered by another element or deemed not interactable.
    cy.get('.inventory_details_back_button').click({ force: true });
    cy.url().should('include', '/inventory.html');
  });
});
