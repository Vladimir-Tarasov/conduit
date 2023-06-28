export function setJwtToken(window, token) {
    window.localStorage.setItem('jwtToken', token);
};

export function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
};

export function waitForArticlesList() {
    cy.get('@articlesList').contains('.article-preview', 'Loading')
        .should('not.be.visible');
};
