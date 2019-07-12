import CfmObject from "../elements/CfmObject";
import TableTileObject from "../elements/TableTileObject";

const cfm = new CfmObject;
const table = new TableTileObject;

const CODAP_URL = "https://codap.concord.org/releases/staging/";
const homeDir = process.env['HOME']
const filePath=homeDir+'/development/table-sharing-plugin-js-selenium-test/fixtures/TypesErrorSampleDoc.codap'


context('Open a local file', ()=>{
    before(()=>{
        browser.url(CODAP_URL);
        browser.pause(3000);
    })
    it('will open a local file in CODAP', ()=>{
        cfm.openDocFromModal();
        cfm.openLocalDoc(filePath); 
        browser.pause(5000);
        // expect(table.getCaseTableTile()).be.visible;
    })
})