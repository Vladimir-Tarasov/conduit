import { getRandomNumber } from '../../support/shared';

describe('open article detail page', () => {
    before(() => {
        cy.visit('/');
        cy.location('hash').should('eq', '#/');
        cy.get('.navbar').should('be.visible').as('uppHeader');
        cy.get('article-list').as('articleList');
    });
    it('should open article detail page', () => {
        cy.get('.feed-toggle ul > li:nth-child(2) a')
            .should('have.class', 'active');

        cy.get('[ui-sref="app.article({ slug: $ctrl.article.slug })"]').as('articlesList')
        cy.get('@articlesList').should('have.length', 10);

        // cy.get('h1[ng-bind="$ctrl.article.title"]')

        const rand = getRandomNumber(0, 9);
        cy.get('@articlesList')
            // TODO: add waiting for elements
            .eq(rand)
            .as('randomArticle');
        cy.get('@randomArticle').find('h1[ng-bind="$ctrl.article.title"]')
            .invoke('text')
            .invoke('trim')
            .as('articleTitle')
        cy.get('@randomArticle').click();

        cy.location('hash').should('contain', '#/article/');
        // cy.get('[ng-bind="::$ctrl.article.title"]')

        //TODO: page move down title is hide
        cy.get('@randomArticle').then(title => {
            cy.get('.article-page h1')
                .should('include', '@articleTitle');
        });
    });
});