import TableTileObject from "../elements/TableTileObject";
var should = require('chai').should()

const table = new TableTileObject;
const url = 'https://codap.concord.org/releases/staging/static/dg/en/cert/index.html#file=examples:Mammals';

describe('Get CODAP Table elements', ()=>{
    before(()=>{
        browser.url(url);
    })
    it('will get an attribute header', ()=>{
        console.log('in get attribute header');
        var num_attributes = $$(table.getAttributeHeader()).length;
        var first_attribute = $(table.getAttribute('Mammal')).getText()
        console.log('num of attributes: '+num_attributes);
        console.log('first attribute: '+first_attribute);

        num_attributes.should.be.eq(10)
        first_attribute.should.be.eq('Mammal');
    })
})