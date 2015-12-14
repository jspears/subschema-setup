"use strict";

import subschema, {loaderFactory, DefaultLoader} from 'subschema';

import FieldSetBuilder from './FieldSetBuilder.jsx';
import TypeBuilder from './TypeBuilder.jsx';
import SelectDefault from './SelectDefault.jsx';
import cssClass from './validators/css.js';
import InputFalse from './InputFalse.jsx';
import ToggleTemplate from './ToggleTemplate.jsx';
import ExpressionSelect from './ExpressionSelect.jsx';
import ModalCreateTemplate from './ModalCreateTemplate.jsx';
import LabelValue from './LabelValue.jsx';
var loader = loaderFactory([DefaultLoader]);
loader.addType({
    FieldSetBuilder,
    TypeBuilder,
    SelectDefault,
    InputFalse,
    ExpressionSelect
});
loader.addValidator({
    cssClass
});
loader.addTemplate({
    LabelValue,
    ToggleTemplate,
    ModalCreateTemplate
})

export default loader;