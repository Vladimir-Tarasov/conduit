describe('display article list', () => {
    before(() => {
        cy.visit('/');
        cy.location('hash').should('eq', '#/');
        cy.get('.navbar').should('be.visible').as('appHeader');
        cy.get('article-list').as('articleList');
    });

    it('should display article list', () => {
        cy.get('@articleList')
            .each(article => {
                cy.wrap(article).within(() => {
                    cy.get('a[class="author ng-binding"]').as('authorName');
                    cy.get('@authorName').should('be.visible');
                    cy.get('article-meta a img').as('avatar');
                    cy.get('@avatar').should('be.visible');
                    cy.get('favorite-btn').as('like');
                    cy.get('@like').should('be.visible');

                    // //code from Anton
                    // cy.get('favorite-btn')
                    //             .invoke('text')
                    //             // TODO: learn jquery trim
                    //             .invoke('trim')
                    //             // TODO: learn more about regular expressions
                    //             .should('match', /^[0-9]+$/)

                    cy.get('[ng-bind="$ctrl.article.title"]').as('title');
                    cy.get('@title').should('be.visible');
                    cy.get('[ng-bind="$ctrl.article.description"]').as('description');
                    cy.get('@description').should('be.visible');
                    cy.get('[class="tag-list"]').as('tags');
                    cy.get('@tags').should('be.visible');
                });
            });
    });
});


