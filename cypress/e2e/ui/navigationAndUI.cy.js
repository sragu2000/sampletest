import { uiBaseURL } from "../../support/data";

describe('Navigation and UI Testing', () => {
  beforeEach(() => {
    cy.visit(uiBaseURL);
    cy.login('standard_user', 'secret_sauce');
  });

  it('Test Menu Button Functionality', () => {
    cy.get('.bm-burger-button').click();
    cy.get('.bm-menu-wrap')
      .should('have.attr', 'style')
      .and('not.include', 'transform: translate3d(-100%, 0px, 0px)');
  });

  it('Verify Sidebar Close Button', () => {
    cy.get('.bm-burger-button').click();
    cy.get('.bm-cross-button').click();
    cy.wait(1000); // wait until close
    cy.get('.bm-menu-wrap')
      .should('have.attr', 'style')
      .and('include', 'transform: translate3d(-100%, 0px, 0px)');
  });

  it('Logout from Sidebar', () => {
    cy.get('.bm-burger-button').click();
    cy.contains('Logout').click();
    cy.url().should('include', 'index.html');
  });

  it('Reset App State', () => {
    cy.get('.btn_inventory').first().click();
    cy.get('.bm-burger-button').click();
    cy.contains('Reset App State').click();
    cy.get('.shopping_cart_badge').should('not.exist');
  });
});