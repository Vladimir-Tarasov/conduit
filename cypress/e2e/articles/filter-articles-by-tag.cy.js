import { getRandomNumber } from '../../support/shared';

function waitForArticlesList() {
    cy.get('@articleList').contains('.article-preview', 'Loading')
        .should('not.be.visible');
}

describe('filter article by tag', () => {
    before(() => {
        cy.visit('/');
        cy.location('hash').should('eq', '#/');
        cy.get('.navbar').should('be.visible').as('uppHeader');
        cy.get('article-list').as('articleList');
    });

    it('should filter article by tag', () => {
        const rnd = getRandomNumber(0, 4);
        cy.get('.tag-list').find('a')
            .as('tag')
            .should('have.length.greaterThan', 5);
        cy.get('@tag')
            .eq(rnd)
            .as('randomTag')
            .click();

        cy.get('@randomTag')
            .invoke('text')
            .invoke('trim')
            .as('randomTagTitle');

        waitForArticlesList();

        cy.get('@randomTagTitle').then(title => {
            cy.log(title);
            cy.get('.feed-toggle li:nth-child(3) a')
                .invoke('text')
                .invoke('trim')
                .should('include', title)

            cy.get('@articleList')
                .find('article-preview')
                .should('have.length.greaterThan', 0)
                .each(article => {
                    cy.wrap(article)
                        .contains('.tag-list .tag-default', title)
                        .should('have.length', 1);
                });
        });
    });
});