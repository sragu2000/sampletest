describe('API Tests', () => {
    it('should fetch a list of users', () => {
        cy.request('GET', 'https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                // Assert status code
                expect(response.status).to.eq(200);

                // Assert response body
                expect(response.body).to.be.an('array');
                expect(response.body.length).to.be.greaterThan(0);

                // Assert specific data
                expect(response.body[0]).to.have.property('name');
            });
    });
});