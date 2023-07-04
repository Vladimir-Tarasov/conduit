import { getRandomNumber, login } from '../../support/shared';
import meUser from '../../fixtures/me-user.json';
import { setJwtToken } from '../../support/utils';

describe('like article test', () => {
    before(() => {
        cy.visit('/');
        //login();
        cy.location('hash').should('eq', '#/');
        cy.get('.feed-toggle ul > li:nth-child(2) a').click()
            .should('have.class', 'active');
        cy.get('article-list').as('articleList');
    })

    it('should test like article', () => {
        cy.readFile('token.txt')
            .should('not.be.empty')
            .then(token => {
                cy.visit('/', {
                    onBeforeLoad: (window) => setJwtToken(window, token)
                });
            });
        cy.get('.navbar').should('be.visible')
            .should('contain.text', meUser.username);

        const rand = getRandomNumber(0, 9);
        cy.get('@articleList')
            .contains('.article-preview', 'Loading')
            .should('not.be.visible');

        cy.get('@articleList')

            //TODO test failed on that step
            .find('article-preview')
            .eq(rand)
            .as('randomArticle');

        cy.get('@randomArticle').find('h1[ng-bind="$ctrl.article.title"]')
            .invoke('text')
            .invoke('trim')
            .as('articleTitle')
        // cy.get('@randomArticle')
        //     .find('[ui-sref="app.article({ slug: $ctrl.article.slug })"]')
        //     .click();

        cy.get('favorite-btn button')
            .eq(rand)
            .as('likeButton')
            .invoke('text')
            .invoke('trim')
            .then(likes => parseInt(likes))
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt

            //parseInt() - это функция JavaScript, которая преобразует строку в целое число.
            // Функция принимает два параметра - строку для преобразования 
            //и систему счисления (если не указана, то по умолчанию используется десятичная система).
            .as('likesBefore');

        cy.get('@likeButton')
            .invoke('hasClass', 'btn-primary')
            .then(likedBefore => {
                console.log('liked before', likedBefore);
                cy.get('@likeButton')
                    .click()
                    .should('not.have.class', 'disabled');

                cy.get('@likesBefore').then(likesBefore => {
                    const expectingLikes = likesBefore + (likedBefore ? -1 : 1);
                    cy.get('@likeButton')
                        .invoke('text')
                        .invoke('trim')
                        .then(likes => parseInt(likes))
                        .should('eq', expectingLikes);
                });
            });
    });
})