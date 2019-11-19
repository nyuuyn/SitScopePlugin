
import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import cmdHelper from './CmdHelper';
import {
  is,
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';
import { isNil } from 'min-dash';

export default function(group, element, bpmnFactory,moddle) {

  // Only return an entry, if the currently selected
  // element is a start event.
  var adaptionStrategyselectOptions = [
    { value: 'BestFit', name: 'BestFit' },
    { value: 'AllFit', name: 'AllFit' }
  ];
  if (is(element, 'bpmn:SubProcess')) {
 
    group.entries.push(entryFactory.selectBox({
      id : 'adaptionStrategy',
      description : 'Adaption Strategy',
      label : 'Choose Adaption Strategy',
      selectOptions: adaptionStrategyselectOptions,
      modelProperty : 'adaptionStrategy'
    }));
    group.entries.push(entryFactory.table({
        id: 'appendedSituations',
        modelProperties: [ 'situationscopename', 'isDefault' ],
        labels: [ 'SituationScopeName', 'Default Situation' ],
    
        getElements: function(element, node) {
          var bo = getBusinessObject(element);
          console.log(bo);
            var allelements=[];
            console.log(!isNil(bo.outgoing));
            if(!isNil(bo.outgoing)){
                for(var i=0;i<bo.outgoing.length;i++){
                    var newelement={
                    situationscopename:bo.outgoing[i].targetRef.situationscopename,
                    isDefault:bo.outgoing[i].targetRef.isDefault
                    };
                    console.log(newelement.isDefault=bo.outgoing[i].targetRef.isDefault);

                    console.log(newelement.situationscopename=bo.outgoing[i].targetRef.situationscopename);

                    allelements.push(newelement);
                }
            }
            
            return allelements;
          
    
        },
    
        updateElement: function(element, values, node, idx) {
          var bo = getBusinessObject(element);
          var entry = bo.situations[idx];
          
       
    
          return cmdHelper.updateBusinessObject(element, entry, values);
        },
    
      
    
        editable: function(element, node, prop, idx) {
          var bo = getBusinessObject(element);
          return false;
        },
    
  
    
        show: function(element, node) {
          var bo = getBusinessObject(element);
          return true;
        }
      }));
    
  }
}