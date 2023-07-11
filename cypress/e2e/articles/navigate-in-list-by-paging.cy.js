import { getRandomNumber } from '../../support/shared';

function waitPageLoading() {
    cy.get('@articleList')
        .contains('.article-preview', 'Loading')
        .should('not.be.visible');
}



describe('navigate in list by paging', () => {
    before(() => {
        cy.visit('/')
        cy.location('hash').should('eq', '#/');
        cy.get('.navbar').should('be.visible').as('uppHeader');
        cy.get('article-list').as('articleList');
    });

    it('should navigate in list by paging', () => {
        waitPageLoading();

        const rnd = getRandomNumber(1, 9);
        cy.get('@articleList')
            .find('article-preview')
            .eq(rnd)
            .as('randomArticle');

        cy.get('@randomArticle')
            .find('h1')
            .invoke('text')
            .invoke('trim')
            .as('randomArticleTitle');

        cy.get('list-pagination').find('ul.pagination').as('listPagination');
        cy.get('@listPagination')
            .find('li')
            .should('have.length.greaterThan', 10)
            .as('availablePages')
            .eq(0)
            .should('contain.class', 'active');


        cy.get('@availablePages')
            .find('a')
            .eq(rnd)
            .as('changedPage')
            .click();

        waitPageLoading();

        cy.get('@randomArticleTitle').then(title => {
            cy.get('@articleList').should('not.contains.text', title)
        });

        cy.get('@availablePages').find('a')
            .eq(0)
            .click();

        cy.get('@randomArticleTitle').then(title => {
            cy.get('@articleList').should('contains.text', title)
        });
    });
});
