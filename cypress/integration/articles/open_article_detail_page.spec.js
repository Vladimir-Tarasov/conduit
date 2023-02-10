describe('open article detail page', () => {
    Before(() => {
        cy.visit('/');
        cy.location('hash').should('eq', '#/');
        cy.get('.navbar').should('be.visible').as('uppHeader');
        cy.get('article-list').as('articleList');
    });
    it('should open article detail page', () => {
        const rand = getRandomNumber(0, 9);
        cy.get('?')
            // TODO: add waiting for elements
            .eq(rand)
            .as('randomArticle');
    });
});