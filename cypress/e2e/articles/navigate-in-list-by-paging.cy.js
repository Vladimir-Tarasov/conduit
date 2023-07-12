import { getRandomNumber, waitForArticlesList, waitPageLoading } from '../../support/shared';
import { Login } from '../login.view';
import { App } from '../app/app.view';
import { GlobalFeed } from './global-feed.view';
import { PagingView } from './paging.view';

describe('navigate in list by paging', () => {
    const login = new Login();
    const app = new App();
    const globalFeed = new GlobalFeed();
    const paging = new PagingView();

    before(() => {
        app.open();
        login.login();
    });

    it('should navigate in list by paging', () => {
        waitForArticlesList();
        globalFeed.openGlobal()
            .selectArticle()
            .getArticleTitle();
        paging.selectRandomPage();
        waitForArticlesList();
        globalFeed.checkArticleUnavailability();
        // paging.backToFirstPage();
        // globalFeed.checkArticleAvailability();
    });
});
