import { getRandomNumber, login } from '../../support/shared';

describe('like article test', () => {

    before(() => {
        const loginUser = login();
        cy.visit('/');
        loginUser();
        cy.location('hash').should('eq', '#/');
        cy.get('.navbar').should('be.visible').as('uppHeader');
        cy.get('article-list').as('articleList');
    })
    it('should test like article', () => {
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

        cy.get('favorite-btn button').as('likeButton');
        cy.get('@likeButton').click();
    });
});