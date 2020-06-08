
import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import cmdHelper from './CmdHelper';
import {
  is,
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

/*
* These functions provide the detailed info for property panels and are called by the CustomPropertiesProvider.js
 */

export default function(group, element, bpmnFactory,moddle) {

  // Only return an entry, if the currently selected
  // element is a start event.
  var selectOptions = [
    { value: 'Abort', name: 'Abort' },
    { value: 'Wait', name: 'Wait' },
    { value: 'Continue', name: 'Continue' }
  ];

  if (is(element, 'bpmn:SubProcess')) {

    var table = entryFactory.table({
      id: 'situations',
      modelProperties: [ 'situationname', 'situationtrigger' ],
      labels: [ 'SituationName', 'Negate' ],
      addLabel: 'Add Situation Element',

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
          "situationtrigger": true
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
    });

    group.entries.push(table);




    group.entries.push(entryFactory.selectBox({
      id : 'entryConditionsvalue',
      description : 'Entry Condition',
      label : 'Choose Entry Condition',
      selectOptions: selectOptions,
      modelProperty : 'entryCondition'
    }));
    group.entries.push(entryFactory.selectBox({
      id : 'situationViolation',
      description : 'Choose Situation Violation',
      label : 'Choose Situation Violation',
      selectOptions: selectOptions,
      modelProperty : 'situationViolation'
    }));
    /*group.entries.push(entryFactory.textBox({
      id : 'entryConditionWait',
      description : 'Entry Condition Wait Time, according to ISO 8601',
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
      description : 'Resume Condition Wait Time, according to ISO 8601',
      label : 'Resume Condition Wait Time',
      modelProperty : 'runningCompensateConditionWait'
    }));*/
    /*
    group.entries.push(entryFactory.selectBox({
      id : 'executionStrategy',
      description : 'Entry Execution Strategy',
      label : 'Choose Execution Strategy',
      selectOptions: executionStrategyselectOptions,
      modelProperty : 'executionStrategy'
    }));
    */
    /*group.entries.push(entryFactory.selectBox({
      id : 'executionType',
      description : 'Entry Execution Type',
      label : 'Choose Execution Type',
      selectOptions: executionTypeselectOptions,
      modelProperty : 'executionType'
    }));*/
    /*
    group.entries.push(entryFactory.textBox({
      id : 'xoutofy',
      description : 'Entry Number of x out of y',
      label : 'Define x out of y',
      modelProperty : 'executionStrategyDefinition'
    }));
    */

  }
}
