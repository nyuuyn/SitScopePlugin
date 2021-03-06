
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
    { value: '', name: 'Default' },
    { value: 'Adapt', name: 'Adapt' },
    { value: 'Continue', name: 'Continue' }
    
  ];

  var conditionselectOptions = [
    { value: '', name: 'Default' },
    { value: 'WaitCondition', name: 'WaitCondition' },
    { value: 'RunningCompensateCondition', name: 'RunningCompensateCondition' }
    
  ];

  if (is(element, 'bpmn:SequenceFlow')) {
 
    group.entries.push(entryFactory.selectBox({
      id : 'sequenceflowAdapt',
      description : 'SequenceFlow Adaption',
      label : 'Choose Type of SequenceFlow',
      selectOptions: adaptionStrategyselectOptions,
      modelProperty : 'flowtype'
    }));
    

    group.entries.push(entryFactory.selectBox({
      id : 'conditiontype',
      description : 'Conditiontype',
      label : 'Choose Type of Condition',
      selectOptions: conditionselectOptions,
      modelProperty : 'conditionType'
    }));
  }
}