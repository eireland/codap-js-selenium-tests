import CfmObject from "../elements/CfmObject";
import TableTileObject from "../elements/TableTileObject";

const cfm = new CfmObject;
const table = new TableTileObject;

const CODAP_URL = "https://codap.concord.org/releases/staging/";
const homeDir = process.env['HOME']
const errorFilePath=homeDir+'/development/codap-js-selenium-tests/fixtures/TypesErrorSampleDoc.codap'
const dateTimeFilePath=homeDir+'/development/codap-js-selenium-tests/fixtures/date-time-test.codap'

context('Open a local file', ()=>{
    beforeEach(()=>{
        browser.url(CODAP_URL);
        browser.pause(3000); 
    })
    it('will open a TypesErrorSampleDoc file in CODAP', ()=>{
        cfm.openDocFromModal();
        cfm.openLocalDoc(errorFilePath); 
        browser.pause(5000);
        // expect(table.getCaseTableTile()).be.visible;
    })
    it('will open a date-time test doc in CODAP', ()=>{
        cfm.openDocFromModal();
        cfm.openLocalDoc(dateTimeFilePath); 
        browser.pause(5000);
        // expect(table.getCaseTableTile()).be.visible;
    })
})