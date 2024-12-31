describe('DELETE /api/books/{id} - Delete Book by ID', () => {

    const baseUrl = 'http://localhost:7081/api/books';
    const adminAuthHeader = { Authorization: 'Basic ' + btoa('admin:password') };
    const userAuthHeader = { Authorization: 'Basic ' + btoa('user:password') };

    it('Valid Case: Delete a book with a valid id', () => {
        // Create a book first to ensure valid ID exists
        cy.request({
            method: 'POST',
            url: `${baseUrl}`,
            headers: adminAuthHeader,
            body: { title: 'Test Book', author: 'Test Author' },
        }).then((response) => {
            expect(response.status).to.eq(201);
            const bookId = response.body.id;
            // Delete the book
            cy.request({
                method: 'DELETE',
                url: `${baseUrl}/${bookId}`,
                headers: adminAuthHeader,
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.message).to.eq('Successfully deleted the book.');
            });
        });
    });

    it('Invalid Case: Pass a non-existent id', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/999999`,
            headers: adminAuthHeader,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body.message).to.eq('Book is not found.');
        });
    });

    it('Invalid Case: Pass an invalid id format', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/invalid-id`,
            headers: adminAuthHeader,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq('Invalid Input Parameters.');
        });
    });

    it('Authorization Case: Call the API without proper authorization headers', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/1`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.message).to.eq('You are not authorized to delete the book.');
        });
    });

    it('Forbidden Case: Call the API with an account that lacks permissions to delete a book', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/1`,
            headers: userAuthHeader,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(403);
            expect(response.body.message).to.eq('Request API call is forbidden.');
        });
    });
});
