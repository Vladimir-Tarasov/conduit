import { getRandomNumber, login } from '../../support/shared';
const { faker } = require('@faker-js/faker');

describe('test delelte comment', () => {
    before(() => {
        cy.visit('/');
        cy.location('hash').should('eq', '#/');
        cy.get('.navbar').should('be.visible').as('uppHeader');
        login();
    });

    it('should test delete comment', () => {
        cy.get('.feed-toggle ul li:nth-child(2) a').click();

        cy.get('article-list').as('articleList');
        cy.get('@articleList')
            .contains('.article-preview', 'Loading')
            .should('not.be.visible');

        const rnd = getRandomNumber(0, 9);
        cy.get('@articleList')
            .find('article-preview')
            .eq(rnd)
            .as('randomArticle')
            .click();

        const randomText = faker.lorem.paragraph()
        cy.get('form.comment-form textarea').click()
            .type(randomText);

        cy.get('.card-footer button[type=submit]').click();

        cy.get('.article-page')
            .should('contain', randomText);

        cy.get('comment .card-footer .mod-options')
            .eq(0)
            .click();
        cy.get('.article-page')
            .should('not.contain', randomText);
    });
});