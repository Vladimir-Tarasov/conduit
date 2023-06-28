import { App } from './app/app.view';
import { Login } from './login.view';

export const app = new App();
export const login = new Login();

describe('Sign in user', () => {
    before(() => {
        app.open();
    });

    it('should login user', () => {
        login.openLoginForm()
            .login();
    });

    it('should logout user', () => {
        login.openSettings()
    })
})
