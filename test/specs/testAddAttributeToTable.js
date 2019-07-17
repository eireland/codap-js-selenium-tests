import CfmObject from "../elements/CfmObject";
import TableTileObject from "../elements/TableTileObject";
import CodapObject from "../elements/CodapObject";

const cfm = new CfmObject;
const table = new TableTileObject;
const codap = new CodapObject;

const CODAP_URL = "https://codap.concord.org/releases/staging/";
const homeDir = process.env['HOME']
const filePath=homeDir+'/development/table-sharing-plugin-js-selenium-test/fixtures/TypesErrorSampleDoc.codap'


context('Open a Mammals sample doc', ()=>{
    before(()=>{
        browser.url(CODAP_URL);
        browser.pause(3000);
        cfm.openDocFromModal();
        cfm.openExampleDoc('Mammals')
        browser.pause(5000);
    })
    it('will open a new attribute with plus icon', ()=>{
        var newAttribute = 'attr';
        $(table.getTableTitleBar()).click()
        table.addNewAttributeWithPlusIcon('Mammals')
    })
})