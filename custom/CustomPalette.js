const SITSCOPE = "sit",
      EVALUATIONPROCESS = "eval",
      SUITABILITY_SCORE_LOW = 25;
//const cli = require('bpmn-js-cli');

/**
 * This class implements functionality when adding a shape from the palette to the main canvas
 */
export default class CustomPalette {
  constructor(bpmnjs,bpmnFactory, create, elementFactory, palette, translate,moddle) {
    this.bpmnjs=bpmnjs;
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;
    this.moddle=moddle;
   // console.log(cli);
    palette.registerProvider(this);
  }

  getPaletteEntries(element) {
    const {
      bpmnFactory,
      create,
      elementFactory,
      translate,
      moddle
    } = this;

    function createTask(processtype) {
      return function(event) {
        if(processtype==="sit"){
          const businessObject = bpmnFactory.create('bpmn:SubProcess');
          businessObject.name="Execution";
          businessObject.entryCondition="Abort";
          businessObject.situationViolation="Abort";

          businessObject.id=businessObject.id.replace('SubProcess', 'SituationScope');
          businessObject.situations=[];

          var situation =moddle.create('sitscope:Situation', {
            "situationname": "TestSituation",
            "situationtrigger": true
                    });

          businessObject.situations.push(situation);
          const shape = elementFactory.createShape({
            type: 'bpmn:SubProcess',
            isExpanded: true,
            businessObject: businessObject
          });
          create.start(event, shape);
        }else if(processtype==="eval"){
        const businessObject = bpmnFactory.create('bpmn:SubProcess');


          businessObject.id=businessObject.id.replace('SubProcess', 'EvaluationProcess');
          businessObject.name="EvaluationProcess";
          const shape = elementFactory.createShape({
            type: 'bpmn:SubProcess',
            isExpanded: true,
            businessObject: businessObject
          });
          create.start(event, shape);
        }
      }
    }

    return {
      'create.high-task': {
        group: 'activity',
        className: 'bpmn-icon-task green',
        title: translate('Create Situational Scope'),
        action: {
          dragstart: createTask(SITSCOPE),
          click: createTask(SITSCOPE)
        }
      },
      'create.low-task': {
        group: 'activity',
        className: 'bpmn-icon-task yellow',
        title: translate('Create Evaluation Process'),
        action: {
          dragstart: createTask(EVALUATIONPROCESS),
          click: createTask(EVALUATIONPROCESS)
        }
      }
    }
  }
}

CustomPalette.$inject = [
  'bpmnjs',
  'bpmnFactory',
  'create',
  'elementFactory',
  'palette',
  'translate',
  'moddle'
];
