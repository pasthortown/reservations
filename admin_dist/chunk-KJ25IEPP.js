import{a as F}from"./chunk-MJBOIPQL.js";import"./chunk-UAOFOE2L.js";import{a as le,b as ae,f as re,n as ce}from"./chunk-WPXTPOO6.js";import{$ as I,Ac as U,Ca as E,Cc as Y,Da as h,Dc as Z,Ea as T,I as k,Jb as N,Kc as $,Lc as ee,Mc as ie,N as d,Na as W,Nc as te,O as s,Oa as p,Oc as ne,P as v,Pa as D,Q as w,Qa as G,Sa as f,Ta as S,Ua as b,Va as P,Wa as H,Ya as z,Yb as A,Yc as oe,Zb as O,_ as t,dc as R,ec as j,ja as V,la as m,pa as y,ra as M,sa as B,sb as X,ua as x,uc as q,va as L,wa as i,wc as J,xa as n,ya as C,yc as K,zc as Q}from"./chunk-3WV2BAOI.js";import"./chunk-IGH4DTA6.js";var de=a=>({row_selected:a});function se(a,u){a&1&&(i(0,"h5",12),p(1,"Nueva Condici\xF3n"),n())}function me(a,u){a&1&&(i(0,"h5",12),p(1,"Edici\xF3n de Condici\xF3n"),n())}function pe(a,u){a&1&&C(0,"i",30)}function ue(a,u){if(a&1&&p(0),a&2){let g=T().$index;G(" ",g+1," ")}}function _e(a,u){if(a&1){let g=E();i(0,"tr",28),h("click",function(){let r=d(g).$implicit,e=T();return s(e.condition_selected=r)}),i(1,"th",29),V(2,pe,1,0,"i",30)(3,ue,1,1),n(),i(4,"th"),C(5,"i"),n(),i(6,"td"),p(7),n(),i(8,"td"),p(9),n()()}if(a&2){let g=u.$implicit,o=T();y(z(8,de,o.condition_selected==g)),t(2),M(o.condition_selected==g?2:-1),t(),M(o.condition_selected!==g?3:-1),t(2),y(g.ico),t(2),D(g.name),t(2),D(g.description)}}var We=(()=>{let u=class u{constructor(o){this.catalogService=o,this.filter="",this.condiciones=[],this.condiciones_shown=[],this.condition_selected={name:"",ico:"",description:""},this.visible=!1,this.is_new=!1}ngOnInit(){this.get_catalog()}get_catalog(){this.condiciones=[],this.condition_selected={name:"",ico:"",description:""},this.catalogService.get_items("condiciones",{name:!0,ico:!0,description:!0}).then(o=>{this.condiciones=o.response,this.filterData()}).catch(o=>console.log(o))}new_item(){this.condition_selected={name:"",ico:"",description:""},this.is_new=!0}filterData(){let o=this.filter.toLowerCase();this.condiciones_shown=this.condiciones.filter(r=>r.name.toLowerCase().includes(o)||r.ico.toLowerCase().includes(o)||r.description.toLowerCase().includes(o))}cancelar(){this.visible=!this.visible,this.get_catalog()}handleChange(o){this.visible=o}save(){this.is_new?this.upload_item(this.condition_selected,"condiciones"):this.update_item(this.condition_selected,"condiciones"),this.visible=!this.visible}update_item(o,r){this.catalogService.update_item(r,o.item_id,o).then(e=>{this.get_catalog()}).catch(e=>console.log(e))}delete_item(o,r){this.catalogService.delete_item(r,o.item_id).then(e=>{this.get_catalog()}).catch(e=>console.log(e))}upload_item(o,r){this.catalogService.upload_items(r,[o]).then(e=>{this.get_catalog()}).catch(e=>console.log(e))}};u.\u0275fac=function(r){return new(r||u)(I(F))},u.\u0275cmp=k({type:u,selectors:[["app-condiciones"]],standalone:!0,features:[P([F]),H],decls:62,vars:30,consts:[["modalXl",""],[1,"g-3","mb-2"],[3,"sm"],["aria-label","Toolbar with button groups","role","group"],["aria-label","Basic example","role","group",1,"me-2"],["cButton","","color","primary","title","Nuevo",3,"click","cModalToggle"],["cIcon","","size","1xl",3,"name","title"],["cButton","","color","warning","title","Editar",3,"click","cModalToggle","disabled"],["cButton","","color","danger","title","Eliminar",3,"click","disabled"],["cInputGroupText",""],["cFormControl","","id","autoSizingInputGroup","placeholder","Buscar",3,"ngModelChange","keyup","ngModel"],["id","modalXl","size","xl",3,"visibleChange","visible"],["cModalTitle",""],["cButtonClose","",3,"click"],[1,"mb-3",3,"cFormFloating"],["cFormControl","","id","floatingInput","placeholder","Icono de la Condici\xF3n","type","text",3,"ngModelChange","ngModel"],["cLabel","","for","floatingInput"],[1,"mb-3"],["disabled","","cFormControl","","id","autoSizingInputGroup","placeholder","Vista previa del Icono",3,"ngModelChange","ngModel"],["cFormControl","","id","floatingInput","placeholder","Texto Corto de la Condici\xF3n","type","text",3,"ngModelChange","ngModel"],["cFormControl","","id","floatingInput","placeholder","Descripci\xF3n de la Condici\xF3n",3,"ngModelChange","ngModel"],["aria-label","Basic example","role","group",1,"m-auto"],["cButton","","color","primary","title","Guardar",3,"click"],["cButton","","color","danger","title","Cancelar",3,"click"],[1,"row",2,"max-height","75vh","overflow-y","auto"],["cTable","","hover",""],["scope","col"],[3,"class"],[3,"click"],["scope","row"],[1,"fa-regular","fa-hand-point-right"]],template:function(r,e){if(r&1){let c=E();i(0,"c-row",1)(1,"c-col",2)(2,"c-button-toolbar",3)(3,"c-button-group",4)(4,"button",5),h("click",function(){return d(c),s(e.new_item())}),v(),C(5,"svg",6),n(),w(),i(6,"button",7),h("click",function(){return d(c),s(e.is_new=!1)}),v(),C(7,"svg",6),n(),w(),i(8,"button",8),h("click",function(){return d(c),s(e.delete_item(e.condition_selected,"condiciones"))}),v(),C(9,"svg",6),n()()()(),w(),i(10,"c-col",2)(11,"c-input-group")(12,"span",9),v(),C(13,"svg",6),n(),w(),i(14,"input",10),b("ngModelChange",function(l){return d(c),S(e.filter,l)||(e.filter=l),s(l)}),h("keyup",function(){return d(c),s(e.filterData())}),n()()()(),i(15,"c-modal",11,0),h("visibleChange",function(l){return d(c),s(e.handleChange(l))}),i(17,"c-modal-header"),V(18,se,2,0,"h5",12)(19,me,2,0,"h5",12),i(20,"button",13),h("click",function(){return d(c),s(e.cancelar())}),n()(),i(21,"c-modal-body")(22,"div",14)(23,"input",15),b("ngModelChange",function(l){return d(c),S(e.condition_selected.ico,l)||(e.condition_selected.ico=l),s(l)}),n(),i(24,"label",16),p(25,"Icono de la Condici\xF3n"),n()(),i(26,"c-input-group",17)(27,"span",9),C(28,"i"),n(),i(29,"input",18),b("ngModelChange",function(l){return d(c),S(e.condition_selected.ico,l)||(e.condition_selected.ico=l),s(l)}),n()(),i(30,"div",14)(31,"input",19),b("ngModelChange",function(l){return d(c),S(e.condition_selected.name,l)||(e.condition_selected.name=l),s(l)}),n(),i(32,"label",16),p(33,"Texto Corto de la Condici\xF3n"),n()(),i(34,"div",14)(35,"textarea",20),b("ngModelChange",function(l){return d(c),S(e.condition_selected.description,l)||(e.condition_selected.description=l),s(l)}),n(),i(36,"label",16),p(37,"Descripci\xF3n de la Condici\xF3n"),n()(),i(38,"c-row",1)(39,"c-button-toolbar",3)(40,"c-button-group",21)(41,"button",22),h("click",function(){return d(c),s(e.save())}),v(),C(42,"svg",6),p(43," Guardar"),n(),w(),i(44,"button",23),h("click",function(){return d(c),s(e.cancelar())}),v(),C(45,"svg",6),p(46," Cancelar"),n()()()()()(),w(),i(47,"div",24)(48,"table",25)(49,"thead")(50,"tr")(51,"th",26),p(52,"#"),n(),i(53,"th",26),p(54,"Icono"),n(),i(55,"th",26),p(56,"Texto Corto"),n(),i(57,"th",26),p(58,"Descripci\xF3n"),n()()(),i(59,"tbody"),x(60,_e,10,10,"tr",27,B),n()()()}if(r&2){let c=W(16);t(),m("sm",7),t(3),m("cModalToggle",c.id),t(),m("name","cilPlus")("title","cilPlus"),t(),m("cModalToggle",c.id)("disabled",e.condition_selected.name==""),t(),m("name","cilPen")("title","cilPen"),t(),m("disabled",e.condition_selected.name==""),t(),m("name","cilTrash")("title","cilTrash"),t(4),m("name","cilSearch")("title","cilSearch"),t(),f("ngModel",e.filter),t(),m("visible",e.visible),t(3),M(e.condition_selected.name==""?18:-1),t(),M(e.condition_selected.name!==""?19:-1),t(3),m("cFormFloating",!0),t(),f("ngModel",e.condition_selected.ico),t(5),y(e.condition_selected.ico),t(),f("ngModel",e.condition_selected.ico),t(),m("cFormFloating",!0),t(),f("ngModel",e.condition_selected.name),t(3),m("cFormFloating",!0),t(),f("ngModel",e.condition_selected.description),t(7),m("name","cilSave")("title","cilSave"),t(3),m("name","cilX")("title","cilX"),t(15),L(e.condiciones_shown)}},dependencies:[Q,ce,le,ae,re,R,j,N,X,q,U,K,J,oe,O,A,Y,Z,ne,ie,te,$,ee],styles:[".row_selected[_ngcontent-%COMP%]{font-size:20px;font-weight:700}"]});let a=u;return a})();export{We as CondicionesComponent};
