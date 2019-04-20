class GraphTile {
    // Graph Plot Area
    getGraphTile(){
        return $('.dg-graph-view')
    }
    getHorizontalAxis(){
        return $('.dg-axis-view.dg-h-axis')
    }
    getHorizontalAxisLabel(){
        return $('.dg-axis-view.dg-h-axis .dg-axis-label')
    }
    getLeftVerticalAxis(){
        return $('.dg-axis-view.dg-v-axis')
    }
    getLeftVerticalAxisLabel(){
        return $('.dg-axis-view.dg-v-axis .dg-axis-label')
    }
    getRightVerticalAxis(){
        return $('.dg-v2-axis')
    }
    getRightVerticalAxisLabel(){
        return $('.dg-v2-axis .dg-axis-label')
    }
    getPlotView(){
        return $('.dg-plot-view')
    }
    getLegend(){
        return $('.dg-legend-view')
    }
    getLegendLabel(){
        return $('.dg-legend-view .dg-axis-label')
    }
    changeAxisAttribute(hash){ //{attribute:'ACAT1', axis:'graph_legend1', collection:'Table A'}
        var attribute = hash.attribute,
            axis = hash.axis,
            collection = hash.collection;
        switch(axis) {
            case('x1') :
                this.getHorizontalAxis().click();
                cy.clickMenuItem(collection);
                cy.clickMenuItem(attribute);
                return 
            case('x') :
                this.getHorizontalAxisLabel()
                    .trigger('mousemove', {force:true})
                    .click({force:true});
                cy.clickMenuItem(collection);
                cy.clickMenuItem(attribute);
                return     
            case('y1') : //first time clicking on the y axis, label does not exist yet.
                this.getLeftVerticalAxis().click();
                cy.clickMenuItem(collection);
                cy.clickMenuItem(attribute);
                return    
            case('y') :
                this.getLeftVerticalAxisLabel()
                    .trigger('mousemove', {force:true})
                    .click({force:true});
                cy.clickMenuItem(collection);
                cy.clickMenuItem(attribute);
                return
            case('graph_legend1') :
                cy.dragAttributeToTarget('table', attribute, axis)
                return  
            case('graph_legend') :
                this.getLegendLabel()
                    .trigger('mousemove', {force:true})
                    .click({force:true});
                cy.clickMenuItem(collection);
                cy.clickMenuItem(attribute);
                return            
        }
        cy.wait(4000)
    }
    removeAxisAttribute(axis){
        switch(axis) {
            case('x'):
                this.getHorizontalAxisLabel().click();
                break
            case('x1'):
                this.getHorizontalAxisLabel().click();
                break    
            case('y'):
                this.getLeftVerticalAxisLabel().click();
                break
            case('y1'):
                this.getLeftVerticalAxisLabel().click();
                break    
            case('legend'):
                this.getLegendLabel().click();
                break        
        }
        cy.clickMenuItem('Remove')
    }
    
    //Graph adornments
    getCountAdorn(){
        return $('.dg-graph-adornment-count')
    }
    getValueFormulaLabel(){
        return $('.sc-text-field-accessory-view.dg:nth-child-last');
    }

    //Formula Dialog
    getDialogApplyButton(){
        return $('.dg-formula-dialog-apply');
    }
    enterFormula(formula){
        $('.dg-formula-dialog-input-field .CodeMirror textarea').click({force:true}).clear({force:true}).type(formula, {force:true});
        this.getDialogApplyButton().click();
    }
    //Graph Tool Palette

    //Graph Ruler Palette
    clickRulerTool(){
        $('.dg-display-values').click();
    }
    turnOnRulerTool(tool) {
        $('.dg-graph-'+tool+'-check').click({animationDistanceThreshold: 20});
    }
    turnOffRulerTool(tool){ //same as turnOnRulerTool but here for test clarity
        $('.dg-graph-'+tool+'-check').click({animationDistanceThreshold: 20});    
    }
    getMovableValueButton(){
        return $('.dg-movable-value-button')
    }
    
}
export default GraphTile