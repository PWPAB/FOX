const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    
    get #txtUsername(){
        return $('#Username');
    };

    get #txtPassword(){
        return $('#Password');
    };

    get #btnLogin(){
        return $('#LoginSubmit');
    };

    get #btnAdvance(){
        return $('#advancedButton');
    };


//Methods Starting Here....

    //Enter username method    
    async enterUsername(value){
        const username = await this.#txtUsername;
        return await username.setValue(value)
    }

    //Enter password method
    async enterPassword(value){
        const password = await this.#txtPassword;
        return await password.setValue(value)
    }

    //Click login button method
    async clickLoginButton(value) {
        const button = await this.#btnLogin;
        return await button.click();
    }
    
    //Click advance button method
    async clickAdvance(value){
        const abutton = await this.#btnAdvance;
        return await abutton.click();
    }

    //Method for the actual logging in
    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
}
module.exports = new LoginPage();






