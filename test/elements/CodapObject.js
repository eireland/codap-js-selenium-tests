import GraphTile from './GraphTile';
import Commands from  '../helper/common';
import TableTileObject from './TableTileObject';

const table = new TableTileObject;
const graph = new GraphTile;
const commands = new Commands;

class CodapObject{
    openTile(tile, menuItem){
        const menuButtons = ['table', 'plugin', 'tilelist', 'option', 'help', 'guide']                
        $('.dg-'+tile+'-button').click();
        if (menuButtons.includes(tile)){
            commands.clickMenuItem(menuItem)
        }
        browser.pause(3000)
    }
    closeTile(){
        console.log("in closeTile");
        var closeIconsArr=$$('.dg-close-icon')
        console.log('found last close icon: '+ closeIconsArr[closeIconsArr.length-1] );
        (closeIconsArr[closeIconsArr.length-1]).moveTo().click();
        // browser.buttonDown();
        // browser.buttonUp();
    }
    dragAttributeToGraph(source,target){
        // table.getAttributeHeader(source)
        //     .trigger('mousedown', {which:1})
        // graph.getGraphTile()    
        //     .trigger('mousemove')
        //     .trigger('mouseup', {which:1})
        // $('.slick-header-column .two-line-header-line-1').contains(source)
        //     .trigger('mousedown', {which:1},{dt})
        //     .trigger('dragstart', {dt});
        // graph.getGraphTile()
        //     .trigger('mousemove',{which:1},{dt})
        //     .trigger('mousemove', {force:true},{which:1},{dt})
        //     .trigger('mouseup', {force:true}, {which:1}, {dt})
    }
    getSingleDialog(){
        return $('.dg-single-text-dialog-textfield')
    }
    getSingleDialogTextField(){
        return $('.dg-single-text-dialog-textfield input')
    }
    getSingleDialogOKButton(){
        return $('.dg-single-text-dialog-ok')
    }
    singleDialogEntry(text){
        this.getSingleDialogTextField().addValue(text)
        this.getSingleDialogOKButton().click()
    }
}
export default CodapObject