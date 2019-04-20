const fs = require('fs-extra')
const path = require('path')

//need to rethink this one because it opens a new tab when it clicks on the listing
const links_file = "../helper/CODAPDocLinks.txt";
const CODAP_URL = "https://codap.concord.org/releases/staging/";
const queryParam = "?";
const max_attempts = 10;

// var listingArray = []

context('Load all Sample documents in the CODAP sample doc page', ()=>{
    var attempt=0

    it('will load public page and take a screenshot', ()=>{
        //read in links_file and for each line, visit the site and take a screenshot
        var listingArray = fs.readFileSync(links_file);
        console.log(listingArray)

        browser.url(CODAP_URL)
        browser.pause(20000)

        // if (listingArray.length!=0){
        //     console.log(listingArray)
        //     console.log('i made it! in if')
        // } else { console.log('listingArray is empty! in else')}
        // browser.pause(20000)


        // listingArray.forEach((listing)=>{
        //     browser.url(listing);
        //     sleep(5000);
            // cy.matchImageSnapshot(title)

        })

    })

// })
