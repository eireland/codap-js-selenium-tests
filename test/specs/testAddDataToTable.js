import CfmObject from "../elements/CfmObject";
import TableTileObject from "../elements/TableTileObject";
import CodapObject from "../elements/CodapObject";

const cfm = new CfmObject;
const table = new TableTileObject;
const codap = new CodapObject;

const CODAP_URL = "https://codap.concord.org/releases/staging/";
const homeDir = process.env['HOME']
const filePath=homeDir+'/development/table-sharing-plugin-js-selenium-test/fixtures/TypesErrorSampleDoc.codap'


context('Open a local file', ()=>{
    before(()=>{
        browser.url(CODAP_URL);
        browser.pause(3000);
        cfm.createNewDocument();
        browser.pause(3000);
    })
    it('will open a a new table and add', ()=>{
        var attribute = 'NewAttribute';
        var data = ['Dopey', 'Doc', "Sneezy"];
        codap.openTile('table','new');
        browser.pause(2000);
        data.forEach(async (name)=>{
            await table.enterData(attribute, name,"1", "1");
            browser.pause(1000)
        })
        browser.pause(1000)
    })
})