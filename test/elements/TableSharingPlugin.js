class PluginObject{
    switchToPlugin(order){
        var iframe = $('#codap  .dg-component-view:nth-child('+order+') iframe');
        iframe.waitForExist();
        browser.switchToFrame(iframe);
    }
    getPluginTitle(){
        return $('.App').getText();
    }
    getTableDropdown(){
        return $('.App select')
    }
    getNameTextField(){
        // return('.App input[data-test="group-name"]')
        return $('.App input:nth-child(1)')

    }
    getButton(){
        return '.App button'
    }
    getCodeTextField(){
        // return ('.App input[data-test="code-input"]')
        return $('.App li:nth-child(3) input')
    }
    getCode(){
        return $('.App .shareId').getText();   
    }
    openTable(order,table){
        console.log('in openTable')
        var selectBox = this.getTableDropdown();

        selectBox.selectByAttribute('value', table );
    }
    enterName(order,name){
        console.log('in enterName');
        var inputBox = this.getNameTextField();
    
        inputBox.addValue(name);
    }
    joinInvite(order){
        console.log('in joinInvite');
        var inviteButton = $(this.getButton()+':nth-child(1)')

        inviteButton.click();
    }
    enterCode(code){
        var groupCode = code;
        console.log("in enterCode: " + code)
        
        this.getCodeTextField().addValue(code);
        $(this.getButton()+':nth-child(2)').click()
    }
}
export default PluginObject;