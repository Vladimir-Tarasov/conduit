import { getRandomNumber } from '../../support/utils';

export class GlobalFeed {
    link = {
        global: '.feed-toggle ul li:nth-child(2) a'
    };

    article = {
        list: 'article-list',
        preview: '.article-preview',
        author: 'a[class="author ng-binding"]',
        avatar: 'article-meta a img',
        like: 'favorite-btn',
        title: '[ng-bind="$ctrl.article.title"]',
        description: '[ng-bind="$ctrl.article.description"]',
        tag: '[class="tag-list"]'
    };

    openGlobal() {
        cy.get(this.link.global).click();
        cy.get(this.article.list).as('articleList');
        cy.get('@articleList')
            .contains(this.article.preview, 'Loading')
            .should('not.be.visible');
        return this;
    }

    selectArticle() {
        const rnd = getRandomNumber(0, 9);

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
        return this;
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

    checkArticlePreview() {
        cy.get(this.article.preview).each(article => {
            cy.wrap(article).within(() => {
                cy.get(this.article.author).as('authorName');
                cy.get('@authorName').should('be.visible');
                cy.get(this.article.avatar).as('avatar');
                cy.get('@avatar').should('be.visible');
                cy.get(this.article.like).as('like');
                cy.get('@like').should('be.visible');

                // //code from Anton
                // cy.get('favorite-btn')
                //             .invoke('text')
                //             // TODO: learn jquery trim
                //             .invoke('trim')
                //             // TODO: learn more about regular expressions
                //             .should('match', /^[0-9]+$/)

                cy.get(this.article.title).as('title');
                cy.get('@title').should('be.visible');
                cy.get(this.article.description).as('description');
                cy.get('@description').should('be.visible');
                cy.get(this.article.tag).as('tags');
                cy.get('@tags').should('be.visible');
            })
        })
    }
}
