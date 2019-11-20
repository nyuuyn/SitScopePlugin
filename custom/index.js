import CustomContextPad from './CustomContextPad';
import CustomPalette from './CustomPalette';
import CustomRenderer from './CustomRenderer';
import CustomProperties from './CustomPropertiesProvider';
import Switchdelete from './Switchdelete';
export default {
  __init__: [ 'customContextPad', 'customPalette', 'customRenderer','propertiesProvider','choreoSwitch'],
  customContextPad: [ 'type', CustomContextPad ],
  customPalette: [ 'type', CustomPalette ],
  customRenderer: [ 'type', CustomRenderer ],
  propertiesProvider: ['type',CustomProperties],
  choreoSwitch:['type',Switchdelete]
};