//This is to test just the plugin
// That the plugin has the correct components,
// and the plugin creates the tables with the names of the collaborators as specified in the plugin
import PluginObject from '../elements/TableSharingPlugin.js';
import TableTileObject from '../elements/TableTileObject.js';
import HelperCommands from '../helper/common'
import CfmObject from '../elements/CfmObject.js';
import CodapObject from '../elements/CodapObject.js';

const plugin = new PluginObject;
const table = new TableTileObject;
const helper = new HelperCommands;
const cfm = new CfmObject;
const codap = new CodapObject;

// const url = 'https://codap.concord.org/releases/staging/static/dg/en/cert/index.html#shared=97255';
const pluginUrl = 'https://codap-shared-table-plugin.concord.org/branch/master/'
// const url = 'https://codap-server.concord.org/releases/staging/?di=https://codap-shared-table-plugin.concord.org/branch/master/'
const url = 'https://codap.concord.org/releases/staging/static/dg/en/cert/index.html';

const homeDir = process.env['HOME']
const filename=homeDir+'/development/table-sharing-plugin-js-selenium-test/fixtures/TableSharing2.codap'
var user1 = "Student A",
    user2 = "Student B";

before(()=>{
    browser.url(url);
    browser.pause(2000)
    cfm.openDocFromModal();
    cfm.openLocalDoc(filename);
    browser.pause(5000);
})
describe('Test Table Sharing plugin in CODAP', () => {
    it('verify correct document was loaded', ()=>{
        var title = browser.getTitle();
        expect(title).to.include('TableSharing2 - CODAP');
    })
    it('verify table sharing plugin is loaded', () => {
        var pluginTitle=''
        plugin.switchToPlugin(2);
        pluginTitle=plugin.getPluginTitle();
        expect(pluginTitle).to.include('To create or join a collaborative table')
        browser.switchToParentFrame();
    });
    it('Student A will create a new group', ()=>{
        plugin.switchToPlugin(2);
        plugin.openTable(0,'new-table');
        plugin.enterName(0,user1);
        browser.pause(1000);
        plugin.joinInvite(0);
        browser.pause(1000)
    })
    it('Student B will join Student A table', ()=>{
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
    })
    it('verify there are two tables', ()=>{
        expect($$(table.getCaseTableTile())).have.length(2);
    })
    it('verify there are 4 collections', ()=>{
        expect($$(table.getCollection())).to.have.length(4);
    })
    it('verify both tables have Collaborators collection with Name attribute', ()=>{
        expect($$(table.getCollectionName('Collaborators'))).to.have.length(2)
        expect($$(table.getAttribute('Name'))).to.have.length(2);
    })
    it('verify Name attribute has 2 cases with the 2 user names in the correct order', ()=>{
        //currently, user who owns the table is the last case in the Names attribute
        var tableCells = $$('.slick-cell.l1.r1');

        // expect((tableCells[0]).getText()).to.eq(user1);ß
        expect((tableCells[0]).getText()).to.eq(user1);
        // expect((tableCells[6]).getText()).to.eq(user1);
        expect((tableCells[3]).getText()).to.eq(user2);
    })
});