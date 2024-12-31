import { adminAuthHeader, baseURL } from "../../support/data";

describe('GET /api/books/id - Get Books by ID', () => {
    it('Valid Case: Get Book By Valid ID', () => {
        cy.createBook({ title: 'Test Book', author: 'Test Author' }).then((bookId) => {
            cy.request({
                method: 'GET',
                url: `${baseURL}/api/books/${bookId}`,
                headers: adminAuthHeader,
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('title');
                expect(response.body).to.have.property('author');
            });
        })
    });
});
