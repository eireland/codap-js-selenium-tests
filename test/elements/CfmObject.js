class CfmObject{
    getOpenDocButton(){
        return $('button').contains("Open Document");
    }
    getCreateNewDocButton(){
        
    }
    getOpenExampleTab(){

    }
    getOpenGoogleDocTab(){

    }
    getOpenLocalFileTab(){
        return $('.workspace-tabs').contains('Local File')
    }
    getFileSelectionDropArea(){
        return $('.dropArea > input');
    }
    openLocalDoc(filename){
        $('.workspace-tabs').contains('Local File').click();
        this.getFileSelectionDropArea().parent().click();
        // cy.uploadFile(this.getFileSelectionDropArea(), filename, 'file');
    }

}
export default CfmObject;