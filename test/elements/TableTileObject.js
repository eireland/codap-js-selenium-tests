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
    addNewAttribute(collection){
        //Have to find the appropriate collection
        $('.dg-floating-plus').click();
    }
    getCollectionName(collection){
        $('.dg-case-table-title').contains(collection);
    }

    getCell(){
        //get collection name
        //get the .dg-case-table sibling of the .dg-case-table-title
        //get the child .slick-cell of the found .dg-case-table
    }
    //Ruler options
    addNewAttributeInRuler(collection){
        clickMenuItem('New Attribute in '+ collection);
    }

}
export default TableTileObject