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
            .click();
    }
}
