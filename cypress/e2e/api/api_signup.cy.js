import { faker } from '@faker-js/faker';

const BACKEND_BASE_URL = 'https://api.realworld.io/api';
const DEFAULT_BASE_URL = Cypress.config('baseUrl');

before(() => {
    cy.log('set base url to backend');
    Cypress.config('baseUrl', BACKEND_BASE_URL);
});

after(() => {
    cy.log('reset base url');
    Cypress.config('baseUrl', DEFAULT_BASE_URL);
});

describe('signup', () => {

    it('should register user', () => {

        const username = faker.internet.userName();
        const email = faker.internet.email();
        const password = faker.internet.password();

        const payload = {
            user: { username, email, password }
        };

        cy.request('POST', '/users', payload)
            .then(({ status, body }) => {
                debugger;
                expect(status).to.eq(200);
                expect(body).to.have.key('user');
                const { user } = body;
                expect(user).to.have.all.keys('username', 'email', 'bio', 'image', 'token');
                expect(user.username).to.not.be.empty;
                expect(user.email).to.not.be.empty;
                expect(user.image).to.not.be.empty;
                expect(user.token).to.not.be.empty;
            });
    });

    it('should not register user with empty data', () => {

        const payload = {
            user: { username: '', email: '', password: '' }
        };

        cy.request({ method: 'POST', url: '/users', body: payload, failOnStatusCode: false })
            .then(({ status, body }) => {
                expect(status).to.eq(422);
                expect(body).to.have.key('errors');
                const { errors } = body;
                expect(errors).to.have.key('email');
                const { email } = errors;
                expect(email).to.have.lengthOf(1);
                const message = email.join('');
                expect(message).to.have.eq('can\'t be blank');
            });
    });

    it.only('should get logged me user', () => {

        cy.readFile('token.txt')
            .should('not.be.empty')
            .then(token => {
                cy.request({
                    method: 'GET',
                    url: '/user',
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }).then(({ status, body }) => {
                    debugger;

                    expect(status).to.eq(200);
                    expect(body).to.have.key('user');
                    const { user } = body;
                    expect(user).to.have.keys('username', 'email', 'bio', 'image', 'token');
                    expect(user.username).to.not.be.empty;
                    expect(user.email).to.not.be.empty;
                    expect(user.image).to.not.be.empty;
                })
            });
    });
})