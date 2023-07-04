import meUser from '../fixtures/me-user.json';

export class Login {
    link = {
        login: 'a[href$="/login"]',
        settings: 'a[href="#/settings"]'
    };

    input = {
        signIn: 'h1',
        email: 'input[ng-model$=email]',
        password: 'input[ng-model$=password]'
    };

    loginForm = {
        page: '.auth-page',
        form: 'form'
    };

    button = {
        submit: 'button[type=submit]',
        logout: 'button[ng-click="$ctrl.logout()"]'
    };

    openLoginForm() {
        cy.get('@appHeader').find(this.link.login).click();
        cy.url().should('include', '/#/login');
        cy.get(this.loginForm.page).should('be.visible').as('loginPage');
        cy.get('@loginPage').find(this.input.signIn).should('have.text', 'Sign in');
        cy.get('@loginPage').find(this.loginForm.form).should('be.visible').as('loginForm');
        return this;
    }

    inputEmail() {
        cy.get('@loginForm').find(this.input.email).type(meUser.email);
        return this;
    }

    inputPassword() {
        cy.get('@loginForm').find(this.input.password).type(meUser.password);
        return this;
    }

    submit() {
        cy.get('@loginForm').find(this.button.submit).click();
        return this;
    }

    checkLogin() {
        cy.get('@appHeader').should('contain.text', meUser.username);
    }

    login() {
        this.openLoginForm()
            .inputEmail()
            .inputPassword()
            .submit()
            .checkLogin();
    }

    openSettings() {
        cy.get(this.link.settings)
            .click();
        cy.url().should('include', '#/settings')
        return this;
    }

    submitLogout() {
        cy.get(this.button.logout).click();
        return this;
    }

    checkLogout() {
        cy.get('@appHeader').should('not.contain.text', meUser.username);
    }
}
