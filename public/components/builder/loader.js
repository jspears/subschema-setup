"use strict";

import subschema, {loaderFactory, DefaultLoader} from 'subschema';

import FieldSetBuilder from './FieldSetBuilder.jsx';
import SchemaBuilder from './SchemaBuilder.jsx';
import TypeBuilder from './TypeBuilder.jsx';
import SelectDefault from './SelectDefault.jsx';
import cssClass from './validators/css.js';
import InputFalse from './InputFalse.jsx';
import ToggleTemplate from './ToggleTemplate.jsx';
import ExpressionSelect from './ExpressionSelect.jsx';

var loader = loaderFactory([DefaultLoader]);
loader.addType({
    FieldSetBuilder,
    TypeBuilder,
    SchemaBuilder,
    SelectDefault,
    InputFalse,
    ExpressionSelect
});
loader.addValidator({
    cssClass
});
loader.addTemplate({
    ToggleTemplate
})

export default loader;