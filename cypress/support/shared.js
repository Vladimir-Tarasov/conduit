export function setJwtToken(window, token) {
    window.localStorage.setItem('jwtToken', token);
};

export function waitForArticlesList() {
    cy.get('article-list')
        .contains('.article-preview', 'Loading')
        .should('not.be.visible');
};

export function waitPageLoading() {
    cy.get('article-list')
        .contains('.article-preview', 'Loading')
        .should('not.be.visible');
};
