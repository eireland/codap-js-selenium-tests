class TableTileObject{
    getCaseTableTile(){
        return $('.dg-case-table-view');
    }
    getAttributeHeader(){
        return $('.slick-column-name .two-line-header-line-1')
    }
    getAttribute(name){
        return $('.two-line-header-line-1='+name);
    }
    changeToCaseCard(){
        $('.dg-card-icon').click();
    }
    changeToTable(){
        $('.dg-table-icon').click();
    }
    addNewAttribute(collection, attribute){
        //Have to find the appropriate collection. Plus is sibling canvas.dg-floating-plus to the title div.dg-case-table-title
        $('.dg-case-table-title*='+collection).moveTo();
        $('.dg-case-table-title*='+collection).siblings('canvas.dg-floating-plus').click();
        // $('.dg-floating-plus').click();
    }
    getCollectionName(collection){
        // $('.dg-case-table-title').contains(collection);
        $('.dg-case-table-title*='+collection);
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
    addNewAttributeInRuler(collection){
        clickMenuItem('New Attribute in '+ collection);
    }

}
export default TableTileObject