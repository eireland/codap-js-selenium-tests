// This is to test the shared table functionalities
// This assumes that the plugin has created the collaboration properly
// 
// Table column/row setup is:
// div[index] is the row in the table for each collection
// div[containst(@class,'lx rx')] where x is the column in div[index]

import PluginObject from '../elements/TableSharingPlugin.js';
import TableTile from '../elements/TableTileObject.js';
import HelperCommands from '../helper/common'
import CfmObject from '../elements/CfmObject.js';
import CodapObject from '../elements/CodapObject.js';

const plugin = new PluginObject;
const table = new TableTile;
const helper = new HelperCommands;
const cfm = new CfmObject;
const codap = new CodapObject;

// const url = 'https://codap.concord.org/releases/staging/static/dg/en/cert/index.html#shared=97255';
const codapUrl = 'https://codap.concord.org/releases/staging/static/dg/en/cert/index.html'
// const pluginUrl = 'https://codap-shared-table-plugin.concord.org/branch/master/'
const homeDir = process.env['HOME']

// const url = 'https://codap-server.concord.org/releases/staging/?di=https://codap-shared-table-plugin.concord.org/branch/master/'
const filename=homeDir+'/development/table-sharing-plugin-js-selenium-test/fixtures/TableSharing2.codap'

var user1 = "Student A",
    user2 = "Student B";    

before(()=>{
    //upload the TableSharing2.codap file and set up the collaboration
    browser.url(codapUrl);
    browser.pause(3000);
    cfm.openDocFromModal();
    cfm.openLocalDoc(filename);
    browser.pause(5000);
    browser.getTitle();
    //start the collaboration
    plugin.switchToPlugin(2);
    plugin.openTable(0,'new-table');
    plugin.enterName(0,user1);
    browser.pause(1000);
    plugin.joinInvite(0);
    browser.pause(1000)
    var code = plugin.getCode();
    browser.switchToParentFrame();
    plugin.switchToPlugin(3);
    plugin.openTable(0,'new-table');
    plugin.enterName(0, user2);
    browser.pause(1000);
            // console.log("typeof code: "+typeof code)
    console.log("before enterCode: "+code);
    plugin.enterCode(code);
    browser.pause(3000)
    browser.switchToParentFrame();

    //add data to child collection to get the two users to appear in each other's table
})
describe('Test Collaborators collection', () => { //Test to verify there are 2 tables correctly set up is in testSharingWithPlugin
    var collection="Collaborators (1 cases)";
    it('verify that ghost row in Name attribute is not visible', ()=>{
        var line1 = 1,row1=1; //line and row are by parent group
        var collabCollections=$$('.dg-case-table-view')
        var collabCollectionTitle=$('.dg-case-table-title*=' + collection)
        expect($$(table.getTableCells(line1, row1)).length).to.eq(6);
        collabCollections.forEach(collection=>{
            const indexes = collection.$$('//div[contains(text(),"Collaborators")]/following-sibling::div[contains(@class,"dg-case-table")]/div[5]/div/div/div/span')
            expect(indexes.length).to.eq(2)
        })
    })
    it
    ('verify that attributes cannot be added to the Collaborators collection through + icon',()=>{
        //verify that the + icon is not visible
        var plusArr = $$(table.getAddNewAttributePlusIcon(collection))
        plusArr.forEach(plus=>{
            var classArr=plus.getAttribute('class');
            expect(classArr).to.include('disabled')
        })
    })
    it('verify that attributes cannot be added to the Collaborators collection through the ruler tool palette',()=>{
        // verify that ruler tool add attribute to Collaborators collection is disabled
        $(table.getCaseTableTile()).click();
        browser.pause(1000);
        $(table.getRulerToolPalette()).click();
        browser.pause(1000);
        var menuItemClasses = $('//span[contains(text(),"New Attribute in Collaborators...")]/../..').getAttribute('class');
        expect(menuItemClasses).to.include('disabled');
        $('//span[contains(text(),"New Attribute in Collaborators...")]/../..').click();//to dismiss the menu
        browser.pause(2000);
    })
    it('verify that Name attribute cannot be deleted', ()=>{
        //click on the attribute Name to open the attribute menu
        //$('span*=Delete Attribute') parent has class slick-header-menuitem-disabled
        $(table.getSelectedTableTitleBar()).click();
        browser.pause(1000);
        $(table.getAttribute('Name')).click();
        browser.pause(1000);
        var menuItemClasses = $('//span[contains(text(),"Delete Attribute")]/..').getAttribute('class');
        expect(menuItemClasses).to.include('slick-header-menuitem-disabled');
        browser.pause(2000)
    })
    it('verify that Name attribute name cannot be edited', ()=>{
        //verify that you cannot edit name text field in attribute menu Edit Attribute Properties
        $(table.getSelectedTableTitleBar()).click();
        browser.pause(1000);
        $(table.getAttribute('Name')).click();
        $('//span[contains(text(),"Edit Attribute Properties")]').click();
        expect($('//div[contains(text(),"name")]/following-sibling::div[contains(@class,"sc-text-field-view")]/div[2]/input').getAttribute('disabled')).to.eq('true');
        $('label*=Cancel').click();
    })
    it("verify that user cannot edit names", ()=>{
        //cells do not have .editable class
        var tableCells = $$('.slick-cell.l1.r1');
        tableCells[0].click();
        expect((tableCells[0]).getAttribute('class')).to.not.include('editable');
        tableCells[3].click();
        expect((tableCells[3]).getAttribute('class')).to.not.include('editable');
    })
})

describe.only('Test child collection',()=>{
    it('verify data can be added manually to user2 and will appear in user1 table', ()=>{
        ////div[contains(@title,"NewAttribute")]/../../following-sibling::div[contains(@class,"slick-viewport")]/div/div[1]/div[contains(@class,"r1")]
        var attribute = 'NewAttribute';
        var data1 = ['Dopey', 'Doc', "Sneezy"];
        var header_el='//div[contains(@title,"'+attribute+'")]';
        var index = 1; // indicates the div the row is in 
        var x = 1; // indicates which cell it is
        var row_el='', cells='';
        var cell_el= '/div[contains(@class,"r'+x+'")]'

        for (index=1;index<=data1.length;index++){
            row_el = '/../../following-sibling::div[contains(@class,"slick-viewport")]/div/div['+index+']'
            cells = $$(header_el+row_el+cell_el)
            table.enterData(cells[1], data1[index-1]);
            browser.pause(3000)
            expect((cells[1]).getAttribute('title')).to.eq(data1[index-1])
            expect((cells[0]).getAttribute('title')).to.eq(data1[index-1])
        }  
        browser.pause(3000);
    })
    it('verify data can be added manually to user1 and will appear in user2 table', ()=>{
        ////div[contains(@title,"NewAttribute")]/../../following-sibling::div[contains(@class,"slick-viewport")]/div/div[1]/div[contains(@class,"r1")]
        var attribute = 'NewAttribute';
        var data2 = ['Sleepy', 'Grumpy']
        var header_el='//div[contains(@title,"'+attribute+'")]';
        var index = 4; // indicates the div the row is in 
        var x = 1; // indicates which cell it is
        var row_el='', cells='';
        var cell_el= '/div[contains(@class,"r'+x+'")]';
        var user2Row_el='',user2Cells='';

        for (index=4;index<=data2.length+3;index++){
            console.log('index: '+index)
            row_el = '/../../following-sibling::div[contains(@class,"slick-viewport")]/div/div['+index+']'
            user2Row_el = '/../../following-sibling::div[contains(@class,"slick-viewport")]/div/div['+(index-3)+']'
            cells = $$(header_el+row_el+cell_el)
            table.enterData(cells[0], data2[index-4]);
            browser.pause(3000)
            user2Cells = $$(header_el+user2Row_el+cell_el)
            expect((cells[0]).getAttribute('title')).to.eq(data2[index-4]);
            expect((user2Cells[1]).getAttribute('title')).to.eq(data2[index-4])
        }  
        browser.pause(3000);
    })
    it('verify there is still one attribute in the Data Collection',()=>{
        //verifies that a new attribute is not created when the data is shared

    })
    it("verify user1 cannot edit user2's case",()=>{

    })
    it("verify user1 cannot add cases to user2", ()=>{

    })
    it("verify user1 cannot delete user2 cases", ()=>{

    })
    it('will verify that an attribute can be added to the Data collection',()=>{ //this cannot be done with TableSharing2.codap doc

    })
    it('verify that attributes can be reordered, and new data added to the correct attribute across all shared table',()=>{

    })
    it('verify attribute can be renamed, rename is propagated to across all shared tables, and new data added to the correct attribute')
})