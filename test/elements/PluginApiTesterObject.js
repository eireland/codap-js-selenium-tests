class PluginAPITesterObject {

  getRESOURCE_ITEMS() {
    return $$('.di-resources-type-list .di-item')
}
  getACTION_ITEMS() {
    return $$('.di-action-list .di-item')
  }
  getMESSAGE_AREA() {
    return $('.di-message-area')
  }
  getSEND_BUTTON() {
    return $('.di-send-button')
  }
  getRESPONSE_AREA() {
    return $('#message-log')
  }
  getSENT_MESSAGE_NUM() {
    return $('#sentMessages')
  }
  getSUCCESS_NUM() {
    return$('#success')
  }

  sendRequest(resource, action, message) {
    console.log("in sendRequest")
    var resource_elements = getRESOURCE_ITEMS();
    var action_elements = getACTION_ITEMS();
    var i=0, j=0;

    for (i=0;i<resource_elements.length; i++) {
      if (resource == resource_item[i].text) {
        resource_item.click
      }
    }

    for (j=0; j< action_elements.length; j++) {    // action_elements.each do |action_item|
      if (action==action_item.text) {              //   if action == action_item.text
        action_item.click();                       //     action_item.click
      }                                            //   end
    }                                              // end    

    this.getMESSAGE_AREA().clearValue();
    this.getMESSAGE_AREA().addValue(message);     //type(MESSAGE_AREA,message)

    this.getSEND_BUTTON().click();                //click_on(SEND_BUTTON)
  }//end

  sendMessage(message) {
    console.log("in sendMessage");

    this.getMESSAGE_AREA().clearValue();          //clear(MESSAGE_AREA)
    this.getMESSAGE_AREA().setValue(message);     //type(MESSAGE_AREA,message)
    this.getSEND_BUTTON.click();                  //click_on(SEND_BUTTON)
  }//end

  checkResponse() {
    console.log("in checkResponse");
    console.log(this.getRESPONSE_AREA().getText());//puts text_of(RESPONSE_AREA)
    console.log(this.getSENT_MESSAGE_NUM().getText());//puts text_of(SENT_MESSAGE_NUM)
    console.log(this.getSUCCESS_NUM().getText());//puts text_of(SUCCESS_NUM)
  }                                               //end

}
export default PluginAPITesterObject;