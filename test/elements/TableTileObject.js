import HelperCommands from "../helper/common";

const helper = new HelperCommands;

class TableTileObject{
    getCaseTableTile(){
        return ('.dg-hier-table-view');
    }
    getTableTitleBar(){
        return ('.dg-case-table-component-view .dg-titlebar')
    }
    getSelectedTableTitleBar(){
        return ('.dg-case-table-component-view .dg-titlebar-selected')
    }
    getCollection(){
        return ('.dg-case-table-title')
    }
    getAttributeHeaders(){
        return ('.slick-column-name .two-line-header-line-1')
    }
    getCaseCardIcon(){
        return ('.dg-card-icon')
    }
    getTableIcon(){
        return ('.dg-table-icon')
    }
    getAddNewAttributePlusIcon(collection){
        return ('//div[contains(text(),"'+collection+'")]/following-sibling::canvas[contains(@class,"dg-floating-plus")]')
    }
    getAttribute(name){
        return ('.two-line-header-line-1*='+name);
    }
    changeToCaseCard(){
        $('.dg-card-icon').click();
    }
    changeToTable(){
        $('.dg-table-icon').click();
    }
    addNewAttributeWithPlusIcon(collection, attribute){
        //Have to find the appropriate collection. Plus is sibling canvas.dg-floating-plus to the title div.dg-case-table-title
        $('.dg-case-table-title*='+collection).moveTo();
        $(this.getAddNewAttributePlusIcon(collection)).click();
        // $('.dg-floating-plus').click();
    }

    getCollectionName(collection){
        // $('.dg-case-table-title').contains(collection);
        return ('.dg-case-table-title*='+collection)
    }
    getIndexCell(){
        return $('.dg-index') //<span> with index text
    }
    getCell(collection, attribute){
        $('.dg-case-table-title='+collection)//get collection name
        //get the .dg-case-table sibling of the .dg-case-table-title
        //get the child .slick-cell of the found .dg-case-table
    }
    //Ruler options
    getRulerToolPalette(){
        return ('.dg-table-attributes');
    }
    addNewAttributeInRuler(collection){
        $(this.getRulerToolPalette()).click();
        browser.pause(1000)
        helper.clickMenuItem('New Attribute in '+ collection);
    }

    //Index menu
    getIndexMenu(){
        return $('.dg-case-index-popup')
    }
    openIndexMenu(index_num){ //currently only opens the last occurence of that index number. Index nums are in an array of all indexes, not separated by collection
        //Ideally, get collection to know which index num in the array to click on
        //click on index num
        $('.dg-index').then(($index_arr)=>{
            $index_arr[index_num].click();
        })
    }
    getTableCells(line,row){
        return ('.slick-cell.l'+line+'.r'+row)
    }

    enterData(cell, data){
        console.log('in enterData');
        var inputCell = $('.dg-editor-text')
        cell.doubleClick();
        browser.pause(1000)
        inputCell.setValue(data + '\uE007')
    }
}
export default TableTileObject