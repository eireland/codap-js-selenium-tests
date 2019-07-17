class CfmObject{
    openCFMMenu(){
        $('.cfm-menu.menu-anchor').click();
    }
    getOpenDocButton(){
        return $('button*=Open Document')
    }
    getCreateNewDocButton(){
        return 'button*=Create New Document'
    }
    getOpenExampleTab(){
        return $('li*=Example Documents')
    }
    getOpenGoogleDocTab(){
        return $('li*=Google Drive')
    }
    getOpenLocalFileTab(){
        return $('li*=Local File')
    }
    getFileSelectionDropArea(){
        return $('.dropArea input');
    }
    createNewDocument(){
        $(this.getCreateNewDocButton()).click();
    }
    openDocFromModal(){
        this.getOpenDocButton().click();
    }
    openDocFromFileMenu(){
        this.openCFMMenu();
        $('.menuItem*=Open...').click();//.contains('Open...').click();
    }
    openExampleDoc(document){
        this.getOpenExampleTab().click();
        $('.selectable*='+document).click()//.contains(document).click();
        $('button*=Open').click()//.contains('Open').click();
    }
    openLocalDoc(filename){
        // const fp=browser.uploadFile(filename)
        browser.pause(1000);
        this.getOpenLocalFileTab().click();
        browser.pause(1000);
        this.getFileSelectionDropArea().setValue(filename);
        browser.pause(3000);
    }
    closeConfirmDialogMessage(){
        $('button*=Yes').click();
    }
    closeDocument(){
        this.openCFMMenu();
        $('.menuItem*=Close').click();
    }
}
export default CfmObject;