// This is to test the shared table functionalities
// This assumes that the plugin has created the collaboration properly
// Name of collaborators do not appear until collaborators has generated data from the other plugin
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
const filename=homeDir+'/development/table-sharing-plugin-js-selenium-test/fixtures/SharedRampGame.codap'

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
    plugin.openTable(0,'CarRampSimulation');
    plugin.enterName(0,user1);
    browser.pause(1000);
    plugin.joinInvite(0);
    browser.pause(1000)
    browser.switchToParentFrame();
})
describe('Test Collaborators collection', () => {
    it('verify that correct table is opened',()=>{
        codap.openTile('table','RunSummary/RunDetails')
        $(table.getCaseTableTile()).waitForExist(3000)
        expect(table.getCaseTableTile()).to.be.displayed();
    })
    it('verify Name attribute has 1 case with the 1 user names', ()=>{
        //currently, user who owns the table is the last case in the Names attribute
        var tableCells = $$('.slick-cell.l1.r1');
        expect((tableCells[0]).getText()).to.eq(user1);
    })
    it('verify that attributes cannot be added to the Collaborators collection',()=>{
        //verify that the + icon is not visible and verify that ruler tool add attribute to Collaborators collection is disabled

    })
    it('verify that new names cannot be added manually',()=>{
        var tableCells = $$('.slick-cell.l1.r1');
        expect((tableCells)).to.eq(6); //this is just to check that element exists
        // expect((tableCells.length)).to.eq(5);
    })
    it('verify that attributes cannot be added to the Collaborators collection',()=>{
        //verify that the + icon is not visible and verify that ruler tool add attribute to Collaborators collection is disabled
        //.dg-floating-plus.disabled with the sibling div.dg-case-table-title includes "Collaborators (1 case)"
        //get the classes of the canvas that is a sibling of div.dg-case-table-title includes "Collaborators (1 case)", verify that it includes .dg-floating-plus and .disabled
    })
    it('verify that Name attribute cannot be deleted', ()=>{
        //click on the attribute Name to open the attribute menu
        //$('span*=Delete Attribute') parent has class slick-header-menuitem-disabled
    })
    it('verify that Name attribute name cannot be edited', ()=>{
        //veriy that you cannot double click on the attribute name\
        //verify that you cannot edit name text field in attribute menu Edit Attribute Properties

    })
    it('verify that ghost row in Name attribute is not visible', ()=>{
        //cannot add people because ghost row won't be visible

    })
    it("verify that user cannot edit other collaborators' names", ()=>{

    })
    it("verify can edit own name", ()=>{

    })
});
describe('Test ')