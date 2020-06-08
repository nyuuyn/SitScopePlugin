import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
  append as svgAppend,
  attr as svgAttr,
  classes as svgClasses,
  create as svgCreate
} from 'tiny-svg';

import {
  assign

} from 'min-dash';

import {
  getRoundRectPath,
  getStrokeColor
} from 'bpmn-js/lib/draw/BpmnRenderUtil';

import {
  query as domQuery
} from 'min-dom';

import {
  is,
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import { isNil } from 'min-dash';
import Ids from 'ids';
const HIGH_PRIORITY = 1500,
      TASK_BORDER_RADIUS = 2,
      COLOR_GREEN = '#52B415',
      COLOR_YELLOW = '#ffc800',
      COLOR_RED = '#cc0000';

/*
 * Class is used to render the elements such as situations within the canvas
 */

export default class CustomRenderer extends BaseRenderer {
  constructor(config,eventBus, bpmnRenderer, textRenderer,modeling,canvas) {
    super(eventBus, HIGH_PRIORITY);
    this.defaultFillColor = config && config.defaultFillColor;
    this.defaultStrokeColor = config && config.defaultStrokeColor;
    this.bpmnRenderer = bpmnRenderer;
    this.textRenderer=textRenderer;
    this.modeling=modeling;
    this.markers = {};
    this.RENDERER_IDS = new Ids();
    this.rendererId = this.RENDERER_IDS.next();
    this.canvas=canvas;
  }

  canRender(element) {

    // ignore labels
    return !element.labelTarget;
  }

  drawShape(parentNode, element) {
    const shape = this.bpmnRenderer.drawShape(parentNode, element);
    const suitabilityScore = this.getSituations(element);

    if(!isNil(suitabilityScore)){
      for (var i = 0; i < suitabilityScore.length; i++) {
        const color =this.getColor(suitabilityScore[i]);

        const rect = drawRect(parentNode, 100, 20, TASK_BORDER_RADIUS, color);
        var transformstring='translate(-20,'+(-10+(i*20))+')';
        svgAttr(rect, {
          transform: transformstring
        });
        var transformstring2='translate(-15,'+(5+(i*20))+')';

        var text = svgCreate('text');

        svgAttr(text, {
          fill: '#fff',
          transform: transformstring2
        });
        svgClasses(text).add('djs-label');
        //this.renderEmbeddedLabel(parentNode, element, true ? 'center-top' : 'center-middle');

        svgAppend(text, document.createTextNode(suitabilityScore[i].situationname));

        svgAppend(parentNode, text);



  }
    }
    return shape;

  }

  drawConnection(parentNode,element){
    const shape = this.bpmnRenderer.drawConnection(parentNode, element);
    if(is(element,'bpmn:SequenceFlow')){
      console.log(element);
      const businessObject = getBusinessObject(element);

      var flowtype   = businessObject.$attrs.flowtype;
      console.log(flowtype);
      if(flowtype=="Continue"){
        svgAttr(shape, {
          stroke: 'green',
          markerEnd: this.marker('sequenceflow-end', 'green', 'green'),
          'stroke-width': '10px'
              });
      }else if(flowtype=="Adapt"){
        svgAttr(shape, {
          stroke: 'blue',
          markerEnd: this.marker('sequenceflow-end', 'blue', 'blue'),
          'stroke-width': '10px'
              });
      }

    //  this.modeling.setColor(element,{
    //    stroke: 'green'
    //  });

    };
  }

  marker(type, fill, stroke) {
    var id = type + '-' + this.colorEscape(fill) + '-' + this.colorEscape(stroke) + '-' + this.rendererId;

    if (!this.markers[id]) {
      this.createMarker(id, type, fill, stroke);
    }

    return 'url(#' + id + ')';
  }

  createMarker(id, type, fill, stroke) {

    if (type === 'sequenceflow-end') {
      var sequenceflowEnd = svgCreate('path');
      svgAttr(sequenceflowEnd, { d: 'M 1 5 L 11 10 L 1 15 Z' });

      this.addMarker(id, {
        element: sequenceflowEnd,
        ref: { x: 11, y: 10 },
        scale: 0.1,
        attrs: {
          fill: stroke,
          stroke: stroke
        }
      });
    }
  }

    addMarker(id, options) {
    var attrs = assign({
      fill: 'green',
      strokeWidth: 10,
      strokeLinecap: 'round',
      strokeDasharray: 'none'
    }, options.attrs);

    var ref = options.ref || { x: 0, y: 0 };

    var scale = options.scale || 1;

    // fix for safari / chrome / firefox bug not correctly
    // resetting stroke dash array
    if (attrs.strokeDasharray === 'none') {
      attrs.strokeDasharray = [10000, 1];
    }

    var marker = svgCreate('marker');

    svgAttr(options.element, attrs);

    svgAppend(marker, options.element);

    svgAttr(marker, {
      id: id,
      viewBox: '0 0 20 20',
      refX: ref.x,
      refY: ref.y,
      markerWidth: 20 * scale,
      markerHeight: 20 * scale,
      orient: 'auto'
    });

    var defs = domQuery('defs', this.canvas._svg);

    if (!defs) {
      defs = svgCreate('defs');

      svgAppend(this.canvas._svg, defs);
    }

    svgAppend(defs, marker);

    this.markers[id] = marker;
  }

  colorEscape(str) {

    // only allow characters and numbers
    return str.replace(/[^0-9a-zA-z]+/g, '_');
  }

  getShapePath(shape) {
    if (is(shape, 'sitscope:SituationalScope')) {
      return getRoundRectPath(shape, TASK_BORDER_RADIUS);
    }

    return this.bpmnRenderer.getShapePath(shape);
  }

  getSituations(element) {

    const businessObject = getBusinessObject(element);

    const { situations } = businessObject;

    return situations;
  }

  getColor(suitabilityScore) {
    if (suitabilityScore.situationtrigger=="true") {
      return COLOR_GREEN;
    }else if(suitabilityScore.situationtrigger=="false"){
      return COLOR_RED;

    }

  }

  renderLabel(parentGfx, label, options) {
    options = assign({
      size: {
        width: 100
      }
    }, options);

    var text = this.textRenderer.createText(label || '', options);

    svgClasses(text).add('djs-label');

    svgAppend(parentGfx, text);

    return text;
  }

  renderEmbeddedLabel(parentGfx, element, align) {
    console.log(element.situationscopename);
    var semantic = getBusinessObject(element);
    return this.renderLabel(parentGfx, element.situationscopename, {
      box: element,
      align: align,
      padding: 5,
      style: {
        fill: getStrokeColor(element, this.defaultStrokeColor)
      }
    });
  }






}

CustomRenderer.$inject = [ 'config',
 'eventBus', 'bpmnRenderer', 'textRenderer','modeling','canvas' ];

// helpers //////////

// copied from https://github.com/bpmn-io/bpmn-js/blob/master/lib/draw/BpmnRenderer.js
function drawRect(parentNode, width, height, borderRadius, color) {
  const rect = svgCreate('rect');

  svgAttr(rect, {
    width: width,
    height: height,
    rx: borderRadius,
    ry: borderRadius,
    stroke: color,
    strokeWidth: 2,
    fill: color
  });

  svgAppend(parentNode, rect);

  return rect;
}
