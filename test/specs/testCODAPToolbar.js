import TableTileObject from '../elements/TableTileObject'
import GraphTile from '../elements/GraphTile'
import CodapObject from '../elements/CodapObject';
import MapTile from '../elements/MapTile';
import SliderTile from '../elements/SliderObject';
import TextTile from '../elements/TextObject';
import CalculatorTile from '../elements/CalculatorObject';
import SamplerPlugin from '../elements/SamplerPluginObject';
import DrawToolPlugin from '../elements/DrawToolObject';
import Commands from '../helper/common';

const table = new TableTileObject;
const codap = new CodapObject;
const graph = new GraphTile;
const map = new MapTile;
const slider = new SliderTile
const textTile = new TextTile
const calculator = new CalculatorTile
const sampler = new SamplerPlugin
const drawTool = new DrawToolPlugin
const commands = new Commands;

context('codap toolbar', ()=>{
    before(()=>{
        browser.url('https://codap.concord.org/releases/staging/static/dg/en/cert/index.html')
        $('button=Create New Document').click();
    });
    it('will open a new table', ()=>{
        codap.openTile('table','new')
        table.getCaseTableTile().waitForExist(3000)
        table.getCaseTableTile().should.be.visible;
    })
    it('will open a graph', ()=>{
        codap.openTile('graph')
        graph.getCaseTableTile().waitForExist(3000)
        graph.getGraphTile().should.be.visible;
    })
    it('will open a map', ()=>{
        codap.openTile('map')
        map.getMapTile().waitForExist(3000)
        map.getMapTile().should.be.visible;
    })
    it('will open a slider', ()=>{
        codap.openTile('slider')
        slider.getSliderTile().waitForExist(3000);
        slider.getSliderTile().should.be.visible;
    })
    it('will open a calculator', ()=>{
        codap.openTile('calc')
        calculator.getCalculatorTile().waitForExist(3000);
        calculator.getCalculatorTile().should.be.visible;
    })
    it('will open a text box', ()=>{
        codap.openTile('text')
        textTile.getTextTile().waitForExist(3000);
        textTile.getTextTile().should.be.visible;
    })
    it('will open Sampler', ()=>{
        codap.openTile('plugin','Sampler')
        browser.pause(4000);
        commands.switchToIframe();
        sampler.getSamplerPlugin().should.exist;
        sampler.getSamplerPlugin();
        console.log('found Sampler plugin at: '+sampler.getSamplerPlugin());
        commands.switchToParent();
        codap.closeTile(); //close the tile because it interferes with later tests
        sampler.getSamplerPlugin().should.not.exist;
        browser.pause(3000);
    })
    it('will open a Draw Tool', ()=>{
        codap.openTile('plugin','Draw Tool')
        browser.pause(4000);
        commands.switchToIframe()
            $('#camera-flash').should.be.visible;
        commands.switchToParent();
        codap.closeTile(); //close the tile because it interferes with later tests
        browser.pause(3000);
    })
    it('will focus table tile from Tile list', ()=>{
        codap.openTile('tilelist', 'New Dataset')
        cy.get('.dg-hier-table-view').siblings('.dg-titlebar-selected').should('exist')
    })
    it('will dsiplay a webpage', ()=>{
        var url='https://concord.org'
        codap.openTile('option', 'Display Web Page')
        codap.getSingleDialog().should.exist;
        codap.singleDialogEntry(url);
        //need to verify iframe with webpage
        browser.pause(4000);
        commands.switchToIframe()
            $('.concord-logo').should.be.visible;
        commands.switchToParent();    
        codap.closeTile(); //close the tile because it interferes with later tests
    })
    it('will open Help tile', ()=>{
        var helpURL = "https://codap.concord.org/help"
        codap.openTile('help', 'Help Pages')
        //verify iframe of helpURL is showing and has #page-title contains "CODAP Help"
        commands.switchToIframe()
            $('#page-title').should.contain('CODAP Help');
        commands.switchToParent();    
        codap.closeTile(); //close the tile because it interferes with later tests
    })
    // it('will open Help Forum Page', ()=>{
    //     //will have to investigate how to verify something opening in a new tab
    //     //Can't use the currently recommended way of 
    //     $('a[href="/foo"]').should.have.attribute('target', '_blank') // so simple
    //     //because menu item does not have an href
    // })
    // it('will open CODAP product Page', ()=>{
    //     //will have to investigate how to verify something opening in a new tab
    //     //Can't use the currently recommended way of 
    //     $('a[href="/foo"]').should.have.attribute('target', '_blank') // so simple
    //     //because menu item does not have an href
    // })
})