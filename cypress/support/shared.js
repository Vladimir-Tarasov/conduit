export function setJwtToken(window, token) {
    window.localStorage.setItem('jwtToken', token);
};

export function waitForArticlesList() {
    cy.get('@articlesList').contains('.article-preview', 'Loading')
        .should('not.be.visible');
};
