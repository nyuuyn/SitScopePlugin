const SUITABILITY_SCORE_HIGH = 100,
      SUITABILITY_SCORE_AVERGE = 50,
      SUITABILITY_SCORE_LOW = 25;


/*
 * This class has functions to add new elements to the canvas by appending them to already available elemetns in the canvas, i.e., this enables adding elements when clicking elements in the canvas instead of the palette
 */
export default class CustomContextPad {
  constructor(bpmnFactory, config, contextPad, create, elementFactory, injector, translate,moddle) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;
    this.moddle=moddle;

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', false);
    }
    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {
    const {
      autoPlace,
      bpmnFactory,
      create,
      elementFactory,
      translate,
      moddle
    } = this;

    function appendServiceTask() {
      return function(event, element) {
        if (autoPlace) {
          const businessObject = bpmnFactory.create('bpmn:SubProcess');
          businessObject.id=businessObject.id.replace('SubProcess', 'SituationScope');

          businessObject.name="Test";
          businessObject.situations=[];
          businessObject.entryCondition="Abort";
          businessObject.situationViolation="Abort";
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

          autoPlace.append(element, shape);
        } else {
          appendServiceTaskStart(event, element);
        }
      }
    }

    function appendServiceTaskStart() {
      return function(event) {
        const businessObject = bpmnFactory.create('bpmn:SubProcess');
        businessObject.id=businessObject.id.replace('SubProcess', 'SituationScope');

        businessObject.name="Execution";
        businessObject.entryCondition="Abort";
        businessObject.situationViolation="Abort";

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
      }
    }

    return {
      'append.high-task': {
        group: 'model',
        className: 'bpmn-icon-task green',
        title: translate('Append Situational Scope'),
        action: {
          click: appendServiceTask(),
          dragstart: appendServiceTaskStart()
        }
      }
    };
  }
}

CustomContextPad.$inject = [
  'bpmnFactory',
  'config',
  'contextPad',
  'create',
  'elementFactory',
  'injector',
  'translate',
  'moddle'
];
