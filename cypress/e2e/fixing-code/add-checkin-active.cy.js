function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

beforeEach(() => {
    cy.visit('https://demo.realworld.io/');
    cy.location('hash').should('eq', '#/');
    // TODO: [data-cy=app-header]
    cy.get('.navbar').should('be.visible').as('appHeader');
    cy.get('article-list').as('articlesList');
});

it.only('should do open article detail page', () => {

    function waitForArticlesList() {

        cy.get('@articlesList').contains('.article-preview', 'Loading')
            .should('not.be.visible');
    }

    function selectRandomArticle() {

        waitForArticlesList();

        const rand = getRandomNumber(0, 9);
        cy.get('@articlesList')
            .find('article-preview')
            .should('have.length', 10)
            .eq(rand)
            .as('randomArticle');
    }

    cy.get('.feed-toggle ul > li:nth-child(2) a')
        .should('have.class', 'active');

    selectRandomArticle();

    cy.get('@randomArticle').find('h1')
        .invoke('text')
        .invoke('trim')
        .as('randomArticleTitle');

    cy.get('@randomArticle')
        .find('a.preview-link')
        .click();

    cy.location('hash').should('contain', '#/article/');

    cy.get('@randomArticleTitle').then(title => {
        cy.get('.article-page h1')
            .invoke('text')
            .invoke('trim')
            .should('eq', title);
    });
});