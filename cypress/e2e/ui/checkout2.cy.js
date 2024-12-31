import { uiBaseURL } from "../../support/data";

describe('Checkout Process Testing - Part 2', () => {
    beforeEach(() => {
      cy.visit(uiBaseURL);
      cy.login('standard_user', 'secret_sauce');
      cy.get('.btn_inventory').first().click();
      cy.get('.shopping_cart_link').click();
      cy.get('.checkout_button').click();
      cy.get('[data-test=firstName]').type('John');
      cy.get('[data-test=lastName]').type('Doe');
      cy.get('[data-test=postalCode]').type('12345');
      cy.get('.btn_primary').click();
    });
  
    it('Verify Item Summary in Checkout Overview', () => {
      cy.get('.cart_item').should('be.visible'); // Verify items are listed
      cy.get('.summary_total_label').should('exist'); // Verify total price displayed
    });
  
    it('Validate Total Price with Tax Calculation', () => {
      let itemTotal = 0;
      cy.get('.inventory_item_price').each((price) => {
        itemTotal += parseFloat(price.text().replace('$', ''));
      });
      cy.get('.summary_subtotal_label').then((price) => {
        const subtotal = parseFloat(price.text().replace('Item total: $', ''));
        expect(subtotal).to.equal(itemTotal);
      });
    });
  
    it('Complete Order Placement', () => {
      cy.get('.btn_action').click();
      cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER');
    });
  
    it('Cancel Order Before Completion', () => {
      cy.get('.cart_cancel_link').click();
      cy.url().should('include', 'inventory.html'); // Verify return to product page
    });

  });
  