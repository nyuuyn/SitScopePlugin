
import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import cmdHelper from './CmdHelper';
import {
  is,
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

export default function(group, element, bpmnFactory,moddle) {

  // Only return an entry, if the currently selected
  // element is a start event.
  var entryselectOptions = [
    { value: 'Abort', name: 'Abort' },
    { value: 'Adapt', name: 'Adapt' },
    { value: 'Return', name: 'Return' },
    { value: 'Retry', name: 'Retry' },
    { value: 'Continue', name: 'Continue' }
  ];


  var runningselectOptions = [
    { value: 'Abort', name: 'Abort' },
    { value: 'Adapt', name: 'Adapt' },
    { value: 'Return', name: 'Return' },
    { value: 'Retry', name: 'Retry' },
    { value: 'Continue', name: 'Continue' }
  ];

  var executionStrategyselectOptions = [
    { value: 'One', name: 'One' },
    { value: 'x out of y', name: 'x out of y' },
    { value: 'All', name: 'All' }
  ];
  var executionTypeselectOptions = [
    { value: 'Non-interrupting', name: 'Non-interrupting' },
    { value: 'Interrupting', name: 'Interrupting' }
  ];


  if (is(element, 'bpmn:SubProcess')) {
    group.entries.push(entryFactory.textField({
      id : 'situationscopename',
      description : 'Situation Name',
      label : 'Situationname',
      modelProperty : 'name'
    }));

    group.entries.push(entryFactory.checkbox({
      id : 'default',
      description : 'Default Situation',
      label : 'Default Situation',
      modelProperty : 'isDefault'
    }));
    
    group.entries.push(entryFactory.table({
      id: 'situations',
      modelProperties: [ 'situationname', 'situationtrigger' ],
      labels: [ 'SituationName', 'SituationTrigger' ],
      addLabel: 'Add Entry',
  
      getElements: function(element, node) {
        var bo = getBusinessObject(element);
          return bo.situations;
        
  
      },
  
      updateElement: function(element, values, node, idx) {
        var bo = getBusinessObject(element);
        var entry = bo.situations[idx];
        
     
  
        return cmdHelper.updateBusinessObject(element, entry, values);
      },
  
      addElement: function(element, node) {
        var bo = getBusinessObject(element);
        var newEntry = moddle.create('sitscope:Situation', {
          "situationname": "Test",
          "situationtrigger": "true"
                  });
        return cmdHelper.addElementsTolist(element, bo, 'situations', [ newEntry ]);
      },

      removeElement: function(element, node, idx) {
        var bo = getBusinessObject(element);
        return cmdHelper.removeElementsFromList(element, bo, 'situations', null, [ bo.situations[idx] ]);
      },
  
      editable: function(element, node, prop, idx) {
        var bo = getBusinessObject(element);
        return true;
      },
  

  
      show: function(element, node) {
        var bo = getBusinessObject(element);
        return true;
      }
    }));
    


    
    group.entries.push(entryFactory.selectBox({
      id : 'entryConditionsvalue',
      description : 'Entry Condition',
      label : 'Choose Entry Condition',
      selectOptions: entryselectOptions,
      modelProperty : 'entryCondition'
    }));
    group.entries.push(entryFactory.checkbox({
      id : 'waitforentry',
      description : 'Wait for Entry Condition Evaluation?',
      label : 'Wait for Entry',
      modelProperty : 'waitforentry'
    }));
    group.entries.push(entryFactory.textBox({
      id : 'entryConditionWait',
      description : 'Entry Condition Wait Time, only Integer allowed',
      label : 'Entry Condition Wait Time',
      modelProperty : 'entryConditionWait'
    }));
    group.entries.push(entryFactory.selectBox({
      id : 'runningCompensateConditionsvalue',
      description : 'Running Compensate Condition',
      label : 'Choose Running Compensate Condition',
      selectOptions: runningselectOptions,
      modelProperty : 'runningCompensateCondition'
    }));
    group.entries.push(entryFactory.checkbox({
      id : 'waitforrunning',
      description : 'Wait for Resume?',
      label : 'Wait for Resume',
      modelProperty : 'waitforcompensate'
    }));
    group.entries.push(entryFactory.textBox({
      id : 'runningCompensateConditionWait',
      description : 'Entry Condition Wait Time, only Integer allowed',
      label : 'Entry Condition Wait Time',
      modelProperty : 'runningCompensateConditionWait'
    }));
    group.entries.push(entryFactory.selectBox({
      id : 'executionStrategy',
      description : 'Entry Execution Strategy',
      label : 'Choose Execution Strategy',
      selectOptions: executionStrategyselectOptions,
      modelProperty : 'executionStrategy'
    }));
    group.entries.push(entryFactory.selectBox({
      id : 'executionType',
      description : 'Entry Execution Type',
      label : 'Choose Execution Type',
      selectOptions: executionTypeselectOptions,
      modelProperty : 'executionType'
    }));
    group.entries.push(entryFactory.textBox({
      id : 'xoutofy',
      description : 'Entry Number of x out of y',
      label : 'Define x out of y',
      modelProperty : 'executionStrategyDefinition'
    }));

    
  }
}