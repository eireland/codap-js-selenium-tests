//Will not work because it opens different URLs from main one.

// need to rethink this one because it opens a new tab when it clicks on the listing
const sampleDocURL = 'https://concord-consortium.github.io/codap-data/';
const CODAP_URL = "https://codap.concord.org/releases/staging/";
const queryParam = "?url=";
const max_attempts = 10;

context('Verify all sample documents in the CODAP sample doc page', ()=>{
    it('will load sample doc in staging and atake a screenshot', ()=>{
        cy.visit(sampleDocURL);
    })
})

context('Load all Sample documents in the CODAP sample doc page', ()=>{
    it('will load sample doc in staging and take a screenshot', ()=>{
        var listingArray = [],
            i=0;

        cy.visit(sampleDocURL)
        cy.get('.listing-link').each(($link,index,$links)=>{
            var href = $link.prop('href');
            listingArray.push(href);   
        }).then(($links)=>{
            cy.log($links)
             for (i=0; i<$links.length-1; i++) {
                // var title = $links[i].split('/');//Take the last slice of the string for the title
                // cy.log('title: '+title)
                cy.visit(CODAP_URL+queryParam+$links[i]);
                // cy.matchImageSnapshot(title[title.length-1]);
             }   
        })
    })
})
