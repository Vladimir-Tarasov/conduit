export class App {

    app = {
        header: '.navbar'
    };

    open() {
        cy.visit('/');
        cy.get(this.app.header).should('be.visible').as('appHeader');
    }
}
