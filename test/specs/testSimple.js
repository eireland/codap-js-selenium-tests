import SampleObject from "../elements/SampleObject";

const sample = new SampleObject;

describe('webdriver.io page', () => {
    it('should have the right title', () => {
        browser.url('https://webdriver.io');
        const title = browser.getTitle();
        browser.getTitle().should.be.equal('WebdriverIO · Next-gen WebDriver test framework for Node.js');
        browser.pause(5000)
    });
    it('should have a tagline', ()=>{
        sample.getTagline().should.be.equal('Next-gen WebDriver test framework for Node.js');
        console.log('i made it!')
    })
});