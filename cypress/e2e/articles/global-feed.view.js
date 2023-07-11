import { getRandomNumber } from '../../support/utils';

export class GlobalFeed {
    link = {
        global: '.feed-toggle ul li:nth-child(2) a'
    };

    article = {
        list: 'article-list',
        preview: '.article-preview'
    }

    openGlobal() {
        cy.get(this.link.global).click();
        return this;
    }

    selectArticle() {
        const rnd = getRandomNumber(0, 9);

        cy.get(this.article.list).as('articleList');
        cy.get('@articleList')
            .contains(this.article.preview, 'Loading')
            .should('not.be.visible');
        cy.get('@articleList')
            .find(this.article.preview)
            .eq(rnd)
            .as('randomArticle')
        return this;
    }

    getArticleTitle() {
        cy.get('@randomArticle')
            .find('h1')
            .invoke('text')
            .invoke('trim')
            .as('randomArticleTitle');
    }

    checkArticleUnavailability() {
        cy.get('@randomArticleTitle').then(title => {
            cy.get('article-list').should('not.contains.text', title)
        });
    }

    checkArticleAvailability() {
        cy.get('@randomArticleTitle').then(title => {
            cy.get('article-list').should('contains.text', title)
        });
    }

    openArticle() {
        cy.get('@randomArticle').click();
    }

    likeArticle() {
        cy.get('@randomArticle').find('favorite-btn ng-transclude span')
            .invoke('text')
            .invoke('trim')
            .as('likeCount');
        cy.get('@randomArticle').find('favorite-btn').click();
        cy.get('@likeCount').then(count => {
            cy.get('@randomArticle').find('favorite-btn ng-transclude span')
                .invoke('text')
                .invoke('trim')
                .should('include', 1 + + count);
        });
        return this;
    }

    cancelLike() {
        cy.get('@randomArticle').find('favorite-btn').click();
        cy.wait(2000);
        cy.get('@likeCount').then(count => {
            cy.get('@randomArticle').find('favorite-btn ng-transclude span')
                .invoke('text')
                .invoke('trim')
                .should('include', count);
        });
    }
}
