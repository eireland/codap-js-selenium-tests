// This is to test the shared table functionalities
// This assumes that the plugin has created the collaboration properly
// 
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
        var line0=0, row0=0;
        // var collabCollections=$$('.dg-case-table-view')
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
    })
    it("verify that user cannot edit other collaborators' names", ()=>{

    })
    it("verify can edit own name", ()=>{

    })
})

describe('Test child collection',()=>{
    it('verify child collection is created', ()=>{

    })
    it('verify there is one attribute per user created',()=>{

    })
    it("verify user1 cannot edit user2's case",()=>{

    })
    it("verify user1 cannot add cases to user2", ()=>{

    })
    it("verify user1 cannot delete user2 cases", ()=>{

    })
})