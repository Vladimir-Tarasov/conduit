import { Login } from '../login.view';
import { App } from '../app/app.view';
import { GlobalFeed } from './global-feed.view';
import { ArticlePage } from './article-page.view';

describe('test add comment', () => {
    const login = new Login();
    const app = new App();
    const globalFeed = new GlobalFeed();
    const articlePage = new ArticlePage();

    before(() => {
        app.open();
        login.login();
    });

    it('should test add comment', () => {
        globalFeed.openGlobal()
            .selectArticle()
            .openArticle();

        articlePage.addComment()
            .checkComment();
    });
});
