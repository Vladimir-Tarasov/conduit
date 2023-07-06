import { Login } from '../login.view';
import { App } from '../app/app.view';
import { GlobalFeed } from './global-feed.view';

describe('like article test', () => {
    const login = new Login();
    const app = new App();
    const globalFeed = new GlobalFeed();

    before(() => {
        app.open();
        login.login();
    });

    it('should test like article', () => {
        globalFeed.openGlobal()
            .selectArticle()
            .likeArticle()
            .cancelLike();
    });
})
