"use strict";

import subschema, {loaderFactory, DefaultLoader} from 'subschema';

import FieldSetBuilder from './FieldSetBuilder.jsx';
import SchemaBuilder from './SchemaBuilder.jsx';
import TypeBuilder from './TypeBuilder.jsx';
import SelectDefault from './SelectDefault.jsx';

var loader = loaderFactory([DefaultLoader]);
loader.addType({
    FieldSetBuilder,
    TypeBuilder,
    SchemaBuilder,
    SelectDefault
});

export default loader;