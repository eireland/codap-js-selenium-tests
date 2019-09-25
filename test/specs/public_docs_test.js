//WIP -- the shared urls only loads the first site and not the rest
//WIP -- the ones with plugin only loads up to the splashscreen and doesn't wait for the full load
// embeded pages loads correctly

const fs = require('fs-extra')
const path = require('path')

//need to rethink this one because it opens a new tab when it clicks on the listing
const doclinks_file = "fixtures/CODAPDocLinks.txt";
const embedlinks_file = "fixtures/CODAPEmbedLinks.txt";
const pluginlinks_file = "fixtures/CODAPPluginDocLinks.txt";
const dirname = "snapshots/"

context('Load all Sample documents in the CODAP sample doc page', ()=>{
    it('will load public share links page and take a screenshot', async ()=>{
        //read in links_file and for each line, visit the site and take a screenshot
        var list = fs.readFileSync(doclinks_file, 'utf-8');
        var listingArray = list.split("\n")

        let i = 0;

        for (const url of listingArray)  {
            await browser.url(url);
            await console.log('url: '+url)
            await browser.saveScreenshot(path.join(dirname, `doclinks-${i}.png`)); 
            i+=1 
        }
    })
    it.skip('will load public share links page and take a screenshot', async ()=>{
        //read in links_file and for each line, visit the site and take a screenshot
        var list = fs.readFileSync(embedlinks_file, 'utf-8');
        var listingArray = list.split("\n")

        let i = 0;

        for(i=0;i<listingArray.length; i++) {
            await browser.url(listingArray[i]);
            await browser.saveScreenshot(path.join(dirname, `embedlinks-${i}.png`));  
        }
    })
    it.skip('will load public share links page and take a screenshot', async ()=>{
        //read in links_file and for each line, visit the site and take a screenshot
        var list = fs.readFileSync(pluginlinks_file, 'utf-8');
        var listingArray = list.split("\n")

        let i = 0;

        for(i=0;i<listingArray.length; i++) {
            await browser.url(listingArray[i]);
            await browser.saveScreenshot(path.join(dirname, `pluginlinks-${i}.png`));  
        }
    })
})