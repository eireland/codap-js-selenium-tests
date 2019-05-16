import Commands from "../helper/common";
import PluginAPITesterObject from "../elements/PluginApiTesterObject";

import * as Papa from 'papaparse'

const apiTester = new PluginAPITesterObject;
const commands = new Commands;
const url = "https://codap.concord.org/releases/staging/?di=https://concord-consortium.github.io/codap-data-interactives//DataInteractiveAPITester/index.html";
// const url = "http://localhost:4020?http://~/eireland/codap-data-interactives/DataInteractiveAPITester/index.html"
const data_filename = "../helper/SmokeTestData.csv";
const data_context = 'SmokeTestData'; 
//graph_types =[{graph name, y-axis attr, x-axis attr, legend attr, y2-axis attr}] all elements in string
const graph_types = [{'name':'Cat Legend', 'y_attr':'','x_attr':'','legend_attr':'Eyes','y2_attr':''},
               {'name':'Cat X','y_attr':'','x_attr':'YesNo','legend_attr':'','y2_attr':''},
               {'name':'Cat Y','y_attr':'YesNo','x_attr':'','legend_attr':'','y2_attr':''},
               {'name':'Num X','y_attr':'','x_attr':'Weight','legend_attr':'','y2_attr':''},
               {'name':'Num Y','y_attr':'Height','x_attr':'','legend_attr':'','y2_attr':''},
               {'name':'Num X Num Y Num Legend','y_attr':'Height','x_attr':'Weight','legend_attr':'Sample','y2_attr':''},
               {'name':'Cat X Cat Y Num Legend','y_attr':'NumCat','x_attr':'Eyes','legend_attr':'Sample','y2_attr':''},
               {'name':'Cat X Cat Y Cat Legend','y_attr':'Eyes','x_attr':'NumCat','legend_attr':'WinLose','y2_attr':''},
               {'name':'Num X Num Y Cat Legend','y_attr':'Height','x_attr':'Weight','legend_att':'Eyes','y2_attr':''},
               {'name':'Num X Cat Y','y_attr':'Sample','x_attr':'Eyes','legend_attr':'','y2_attr':''},
               {'name':'Cat X Num Y','y_attr':'Weight','x_attr':'Eyes','legend_attr':'','y2_attr':''},
               {'name':'Num X Num YR','y_attr':'Height','x_attr':'Sample','legend_attr':'','y2_attr':'Weight'},
               {'name':'Num X 2Num Y','y_attr':'[\'Height\',\'Weight\']','x_attr':'Sample','legend_attr':'','y2_attr':''}
            ]

async function getData(filename, callBack) {
    return Papa.parse(filename, {
        complete: (results)=>{ callBack(results.data) }
    })
        .then((data)=>{return data})
}

function createDataContext(contextName){
    console.log('In createDataContext');
    var message = '{"action": "create","resource": "dataContext","values": {"name" : "'+contextName+ '", "title": "'+contextName+'","description": "Test data with different types"}}'

    apiTester.sendMessage(message);
    apiTester.getResponseArea()//get the text response somehow to verify data context got created
}

function createCollectionWithAttributes(attributes,types,contextName) {
    var i=0;
    var attributeToAdd='';
    var message = '{"action":"create","resource":"dataContext['+contextName+'].collection","values":{"name":"'+contextName+'","attributes":[]}}'

    for (i=0;i<attributes.length-1;i++) {
        if (i==0){ //check if it is the the first attribute so don't add comma before hash
            attributeToAdd = '{"name":"'+attributes[i]+'", "type":"'+types[i]+'"}'
        } else {
            attributeToAdd = ', {"name":"'+attributes[i]+'", "type":"'+types[i]+'"}'
        }
        message = message.insert(-4, attributeToAdd) //adds to the third character in from the end. In this case it will concat it to just prior the last square bracket
    }

    apiTester.sendMessage(message);
    apiTester.getResponseArea()//get the text response somehow to verify collection with attributes got created
}

function createGraph(contextName, graphName, xAttr, yAttr,legendAttr, y2Attr) {
    var message = '{"action":"create","resource":"component","values":{"type":"graph","name":"'+graphName+'","dimensions":{"width":220,"height":220},"position":"top","dataContext":"'+dataContext+'","yAttributeName":"'+yAttr+'","xAttributeName":"'+xAttr+'","legendAttributeName":"'+legendAttr+'","y2AttributeName":"'+y2Attr+'"}}'
    apiTester.sendMessage(message);
    apiTester.getResponseArea()//get the text response somehow to verify graph got created
}

function addDataByItem(contextName, item){
    var message='{"action":"create", "resource":"dataContext['+contextName+'].item","values":[{"Sample": "'+item[0]+'", "YesNo":"'+item[1]+'", "WinLose":"'+item[2]+'", "Height":"'+item[3]+'", "Weight":"'+item[4]+'", "Width":"'+item[5]+'", "Eyes":"'+item[6]+'","NumCat":"'+item[7]+'"}]}'

    apiTester.sendMessage(message);
    apiTester.getResponseArea()//get the text response somehow to verify data got created
}

describe('it will test graph creation when data is created by item', ()=>{
    it('will load frame', ()=>{
        browser.url(url);
    })
    it('will create data by item', ()=>{
        let i=0, j=0, count=1;
        this.getData(data_filename)
            .then((data_file)=>{
                console.log ('data_file: '+data_file);
                let attributes = data_file[0] //assumes first line of csv file has the attribute names
                let types = data_file[1] //assumes second line of csv file has the type of the attribute
                commands.switchToIframe.then(()=>{
                    createDataContext(data_context); //create data context
                    createCollectionWithAttributes(attributes, types, data_context);//create collection with attributes
                    for (i=0;i<graph_types.length; i++) {//create what type of graph
                        let graph = graph_types[i];
                        createGraph(data_context,graph.name,graph.y_attr, graph.x_attr, graph.legend_attr, graph.y2_attr)
                        browser.pause(2000)
                    }
                    for (j=2;j<data_file.length-2;j++) {    //add data by item
                        let item = data_file[j];
                        addDataByItem(data_context, item)
                        if ((count==1) || (count==((data_file.length-2)/2)) || (count==(data_file.length-2))) {
                            browser.saveScreenshot('../screenshots/create_items/item_screenshot_'+count)//save the screenshot at 1, 10, and 20 items created.
                        }
                    count++;  
                    } 
                }); 
            });
    })
})