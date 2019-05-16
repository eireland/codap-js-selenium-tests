class CfmObject{
    openCFMMenu(){
        $('.cfm-menu.menu-anchor').click();
    }
    getOpenDocButton(){
        return $('button*=Open Document')//.contains("Open Document");
    }
    getCreateNewDocButton(){
        
    }
    getOpenExampleTab(){
        return $('.workspace-tabs').contains('Example Documents')
    }
    getOpenGoogleDocTab(){

    }
    getOpenLocalFileTab(){
        return $('.workspace-tabs ul:nth-child(3) li')//.contains('Local File')
        //return $('.workspace-tabs li*=Local File')//.contains('Local File')
    }
    getFileSelectionDropArea(){
        return $('.dropArea input');
    }
    openDocFromModal(){
        this.getOpenDocButton().click();
    }
    openDocFromFileMenu(){
        this.openCFMMenu();
        $('.cfm-menu .menuItem*=Open...').click();//.contains('Open...').click();
    }
    openExampleDoc(document){
        this.getOpenExampleTab().click();
        $('.filelist .selectable*='+document).click()//.contains(document).click();
        $('button*=Open').click()//.contains('Open').click();
    }
    openLocalDoc(filename){
        // const fp=browser.uploadFile(filename)
        browser.pause(2000);
        this.getOpenLocalFileTab().click();
        this.getFileSelectionDropArea().click();//.parent().click();
        browser.uploadFile(filename)
        browser.chooseFile(this.getFileSelectionDropArea(), filename)
        // this.getFileSelectionDropArea().setValue(fp);
        browser.pause(3000);
    }
    closeConfirmDialogMessage(){
        $('.confirm-dialog button').contains('Yes').click();
    }
}
export default CfmObject;