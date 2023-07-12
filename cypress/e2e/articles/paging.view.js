import { getRandomNumber } from '../../support/utils';

export class PagingView {
    selectRandomPage() {
        const rnd = getRandomNumber(0, 9);

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
    }

    backToFirstPage() {
        cy.get('@availablePages').find('a')
            .eq(0)
            .click();
    }
}
