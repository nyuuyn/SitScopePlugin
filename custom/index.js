import CustomContextPad from './CustomContextPad';
import CustomPalette from './CustomPalette';
import CustomRenderer from './CustomRenderer';
//import CustomElementFactory from './CustomElementFactory';
import CustomUpdater from './CustomUpdater';
import CustomProperties from './CustomPropertiesProvider';
import Switchdelete from './Switchdelete';
export default {
  __init__: [ 'customContextPad', 'customPalette', 'customRenderer'
//  ,'customElementFactory'
//,'bpmnUpdater' 
,'propertiesProvider',
'choreoSwitch'
],
  customContextPad: [ 'type', CustomContextPad ],
  customPalette: [ 'type', CustomPalette ],
  customRenderer: [ 'type', CustomRenderer ]
 // customElementFactory: [ 'type', CustomElementFactory ]
 //, bpmnUpdater: ['type', CustomUpdater]
 ,propertiesProvider: ['type',CustomProperties],
 choreoSwitch:['type',Switchdelete]
};