// Cypress.Commands.add('uploadFile', (selector, fileUrl, type = '') => { //fix this to work with CFM
//     return cy
//       .fixture(fileUrl, 'base64')
//       .then(Cypress.Blob.base64StringToBlob)
//       .then(blob => {
//         return cy.window().then(win => {
//           //papaparse was doing an instanceOf window.File check that was failing so we needed 
//           //https://github.com/cypress-io/cypress/issues/170#issuecomment-411289023 
//           const nameSegments = fileUrl.split('/');
//           const name = nameSegments[nameSegments.length - 1];
//           const testFile = new win.File([blob], name, { type });
//           const event = { dataTransfer: { files: [testFile] } };
//           // return subject
//           return cy.get(selector).trigger('drop', event);
//         });
//       });
// });
class Commands {
clickMenuItem (text) {
    console.log('in clickMenuItem. text: '+text)
    var span_text= $(".//*[span[contains(text(),'"+text+"')]]").getText();
    console.log('span text: '+span_text);
    var menu_item = $(".//*[span[contains(text(),'"+text+"')]]")
    menu_item.moveTo();
    browser.buttonDown();
    browser.buttonUp();
    browser.pause(2000)
  };
  
dragAttributeToTarget (source, attribute, target) {
    const dt = new DataTransfer;
    const el={  tableHeader: '.slick-header-column .two-line-header-line-1',
                caseCardHeader: '.react-data-card-attribute',
                graphTile: '.dg-graph-view',
                x_axis:'.dg-axis-view.dg-h-axis',
                x_axis_label: '.dg-axis-view.dg-h-axis .dg-axis-label',
                y_axis: '.dg-axis-view.dg-v-axis',
                y_axis_label: '.dg-axis-view.dg-v-axis .dg-axis-label',
                mapTile: '.dg.leaflet-container'
              }
  
    var source_el='', target_el='';
  
    switch(source) {
      case ('table') :
          source_el=el.tableHeader;
          break
      case ('card') :
          source_el=el.caseCardHeader;
          break   
      case ('x1') :
          source_el=el.x_axis;
          break 
      case ('x') :
          source_el=el.x_axis_label;
          break
      case ('y1') :
          source_el=el.y_axis;
          break     
      case ('y') :
          source_el=el.y_axis_label;
          break     
    }
  
    switch(target) {
      case ('table') :
          target_el=el.tableHeader;
          break
      case ('graph_legend1') :
          target_el=el.graphTile;
          break  
      case ('map') :
          target_el=el.mapTile;
          break  
      case ('x1') :
          target_el=el.x_axis;
          break          
      case ('x') :
          target_el=el.x_axis_label;
          break
      case ('y1') :
          target_el=el.y_axis;
          break      
      case ('y') :
          target_el=el.y_axis_label;
          break    
    }
    $(source_el).contains(attribute)
        .trigger('mousedown', {which:1},{dt})
        .trigger('dragstart', {dt});
    $(target_el)
        .trigger('mousemove',{force:true}, {which:1},{dt})
        .trigger('mousemove', {force:true},{which:1},{dt})
        .trigger('mouseup', {force:true}, {which:1}, {dt})
  };
  
  getPluginIframe ()  {
    return $("#codap .dg-component-view iframe")
  };
  
  getWebviewIframe () {
    return $("#codap .dg-component-view iframe")
  };
  switchToIframe(){
    console.log("in switchToIframe");
          // Using `element` to find an iframe and providing it to `frame` method
    var iframe = $('#codap .dg-component-view iframe').last();      

    iframe.waitForExist();
    browser.switchToFrame(iframe);
  }
  switchToParent(){
    console.log("in switchToParentFrame");
        browser.switchToParentFrame();
  }
}
export default Commands;  