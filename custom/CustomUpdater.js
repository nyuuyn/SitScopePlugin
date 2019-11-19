import BpmnUpdater from 'bpmn-js/lib/features/modeling/BpmnUpdater';
import { is } from 'bpmn-js/lib/util/ModelUtil';
import inherits from 'inherits';


export default function CustomUpdater(injector){
    injector.invoke(BpmnUpdater,this);

}
    CustomUpdater.prototype.updateParent=function(element,oldParent){

        if(is(element,'sitscope:SituationalScope')){
        var parentShape = element.parent;

        var businessObject = element.businessObject,
        parentBusinessObject = parentShape && parentShape.businessObject,
        parentDi = parentBusinessObject && parentBusinessObject.di;
        
            this.bpmnUpdater.updateFlowNodeRefs(businessObject, parentBusinessObject, oldParent && oldParent.businessObject);
            this.bpmnUpdater.updateDiParent(businessObject.di, parentDi);

        } else{
            BpmnUpdater.prototype.updateParent.call(this, element, oldParent);

        }
    }
    CustomUpdater.prototype.updateSemanticParent=function(businessObject, newParent, visualParent){
        if (is(businessObject, 'sitscope:SituationalScope')) {
            containment = 'situationalScopes';
            var children;
    if (businessObject.$parent) {
        // remove from old parent
        children = businessObject.$parent.get(containment);
        collectionRemove(children, businessObject);
      }
    
      if (!newParent) {
        businessObject.$parent = null;
      } else {
        // add to new parent
        children = newParent.get(containment);
        children.push(businessObject);
        businessObject.$parent = newParent;
      }
    
      if (visualParent) {
        var diChildren = visualParent.get(containment);
    
        collectionRemove(children, businessObject);
    
        if (newParent) {
    
          if (!diChildren) {
            diChildren = [];
            newParent.set(containment, diChildren);
          }
    
          diChildren.push(businessObject);
        }
      }
    }else{
        BpmnUpdater.prototype.updateSemanticParent.call(this, businessObject, newParent, visualParent);

    }
    
}
inherits(CustomUpdater, BpmnUpdater);

CustomUpdater.$inject = [ 'injector' ];
