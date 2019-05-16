import TableTileObject from "../elements/TableTileObject";
var should = require('chai').should()

const table = new TableTileObject;
// const url = 'https://codap.concord.org/releases/staging/static/dg/en/cert/index.html?url=https://codap.concord.org/~eireland/Types_error_sample_doc.codap';
const url = 'https://codap.concord.org/releases/staging/static/dg/en/cert/index.html#file=examples:Roller%20Coasters';

describe('Get CODAP Table elements', ()=>{
    before(()=>{
        browser.url(url);
        browser.pause(5000);
    })
    // it('will get collection name', ()=>{
    //     // var browserLogs = browser.url(url).log('browser')
    //     var collectionName = table.getCollectionName('Age_Group').getText();
    //     browser.pause(20000);
    //     browser.debug();
    //     console.log("collection name: "+collectionName);
    // })
    // it('will get an attribute header', ()=>{
    //     console.log('in get attribute header');
    //     var num_attributes = $$(table.getAttributeHeader()).length;
    //     var first_attribute = $(table.getAttribute('String')).getText()
    //     console.log('num of attributes: '+num_attributes);
    //     console.log('first attribute: '+first_attribute);

    //     num_attributes.should.be.eq(10)
    //     first_attribute.should.be.eq('String');
    // })
    it('will add a new attribute', ()=>{
        // table.addNewAttribute('Age_Groups', 'mean_length')
        var collection = 'Age_Groups';
        $('.dg-case-table-title*='+collection).moveTo();
        $('.dg-case-table-title*='+collection).siblings('canvas.dg-floating-plus').click();
        browser.pause(5000);
    })
    // it('will get index column', ()=>{

    // })
    // it('will get a cell', ()=>{

    // })
})