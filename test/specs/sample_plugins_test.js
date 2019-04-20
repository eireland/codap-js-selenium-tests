//Will not work because it opens different URLs from main one.
// //need to rethink this one because it opens a new tab when it clicks on the listing
const samplePluginURL = "https://concord-consortium.github.io/codap-data-interactives/";
const CODAP_URL = "https://codap.concord.org/releases/staging/";
const queryParam = "?di=";
const max_attempts = 10;

var listingArray = [],
    urlArray = [];

var i=0;
context('Load all Sample documents in the CODAP sample doc page', ()=>{
    var attempt=0;

    it('will load plugin in staging and take a screenshot', ()=>{
        var title='';
        browser.url(samplePluginURL);
        // cy.get('#codap-url').type(CODAP_URL+{enter})
        listingArray = $$('.listing-link')
        console.log("length of listingArray: "+listingArray.length)
        for (i=0; i<listingArray.length; i++){
                console.log(listingArray[i].getAttribute('href'))
                browser.newWindow(CODAP_URL+queryParam+listingArray[i].getAttribute('href'));
                // browser.pause(5000)
                // browser.saveScreenshot('../screenshots/'+i)
                browser.pause(2000)
                browser.switchWindow(samplePluginURL);
        }
        
 
          
        // urlArray.forEach((listing)=>{
        //     var title = listing.slice('//')//Take the last slice of the string for the title
        //     browser.url(CODAP_URL+queryParm+listing)
        //     browser.takeScreenshot() //maybe checking if plugin comes back 404 is enough so snapshot may not be needed.
        // })
    })

})
