/**
 * @ag-grid-community/core - Advanced Data Grid / Data Table supporting Javascript / React / AngularJS / Web Components
 * @version v24.0.0
 * @link http://www.ag-grid.com/
 * @license MIT
 */
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var componentAnnotations_1 = require("../../../widgets/componentAnnotations");
var simpleFilter_1 = require("../simpleFilter");
var generic_1 = require("../../../utils/generic");
var dom_1 = require("../../../utils/dom");
var array_1 = require("../../../utils/array");
var TextFilter = /** @class */ (function (_super) {
    __extends(TextFilter, _super);
    function TextFilter() {
        return _super.call(this, 'textFilter') || this;
    }
    TextFilter.prototype.getDefaultDebounceMs = function () {
        return 500;
    };
    TextFilter.prototype.getValue = function (inputField) {
        var val = inputField.getValue();
        val = generic_1.makeNull(val);
        if (val && val.trim() === '') {
            val = null;
        }
        return val;
    };
    TextFilter.prototype.addValueChangedListeners = function () {
        var _this = this;
        var listener = function () { return _this.onUiChanged(); };
        this.eValue1.onValueChange(listener);
        this.eValue2.onValueChange(listener);
    };
    TextFilter.prototype.setParams = function (params) {
        _super.prototype.setParams.call(this, params);
        this.textFilterParams = params;
        this.comparator = this.textFilterParams.textCustomComparator || TextFilter.DEFAULT_COMPARATOR;
        this.formatter = this.textFilterParams.textFormatter ||
            (this.textFilterParams.caseSensitive == true
                ? TextFilter.DEFAULT_FORMATTER
                : TextFilter.DEFAULT_LOWERCASE_FORMATTER);
        this.addValueChangedListeners();
    };
    TextFilter.prototype.setConditionIntoUi = function (model, position) {
        var positionOne = position === simpleFilter_1.ConditionPosition.One;
        var eValue = positionOne ? this.eValue1 : this.eValue2;
        eValue.setValue(model ? model.filter : null);
    };
    TextFilter.prototype.createCondition = function (position) {
        var positionOne = position === simpleFilter_1.ConditionPosition.One;
        var type = positionOne ? this.getCondition1Type() : this.getCondition2Type();
        var eValue = positionOne ? this.eValue1 : this.eValue2;
        var value = this.getValue(eValue);
        var model = {
            filterType: this.getFilterType(),
            type: type
        };
        if (!this.doesFilterHaveHiddenInput(type)) {
            model.filter = value;
        }
        return model;
    };
    TextFilter.prototype.getFilterType = function () {
        return 'text';
    };
    TextFilter.prototype.areSimpleModelsEqual = function (aSimple, bSimple) {
        return aSimple.filter === bSimple.filter && aSimple.type === bSimple.type;
    };
    TextFilter.prototype.resetUiToDefaults = function (silent) {
        var _this = this;
        return _super.prototype.resetUiToDefaults.call(this, silent).then(function () {
            _this.forEachInput(function (field) { return field.setValue(null, silent); });
            _this.resetPlaceholder();
        });
    };
    TextFilter.prototype.resetPlaceholder = function () {
        var placeholder = this.translate('filterOoo');
        this.forEachInput(function (field) {
            field.setInputPlaceholder(placeholder);
            field.setInputAriaLabel('Filter value');
        });
    };
    TextFilter.prototype.forEachInput = function (action) {
        array_1.forEach([this.eValue1, this.eValue2], action);
    };
    TextFilter.prototype.setValueFromFloatingFilter = function (value) {
        this.eValue1.setValue(value);
        this.eValue2.setValue(null);
    };
    TextFilter.prototype.getDefaultFilterOptions = function () {
        return TextFilter.DEFAULT_FILTER_OPTIONS;
    };
    TextFilter.prototype.createValueTemplate = function (position) {
        var pos = position === simpleFilter_1.ConditionPosition.One ? '1' : '2';
        return /* html */ "\n            <div class=\"ag-filter-body\" ref=\"eCondition" + pos + "Body\" role=\"presentation\">\n                <ag-input-text-field class=\"ag-filter-filter\" ref=\"eValue" + pos + "\"></ag-input-text-field>\n            </div>";
    };
    TextFilter.prototype.updateUiVisibility = function () {
        _super.prototype.updateUiVisibility.call(this);
        dom_1.setDisplayed(this.eCondition1Body, this.showValueFrom(this.getCondition1Type()));
        dom_1.setDisplayed(this.eCondition2Body, this.isCondition2Enabled() && this.showValueFrom(this.getCondition2Type()));
    };
    TextFilter.prototype.afterGuiAttached = function (params) {
        _super.prototype.afterGuiAttached.call(this, params);
        this.resetPlaceholder();
        if (!params || !params.suppressFocus) {
            this.eValue1.getInputElement().focus();
        }
    };
    TextFilter.prototype.isConditionUiComplete = function (position) {
        var positionOne = position === simpleFilter_1.ConditionPosition.One;
        var option = positionOne ? this.getCondition1Type() : this.getCondition2Type();
        if (option === simpleFilter_1.SimpleFilter.EMPTY) {
            return false;
        }
        if (this.doesFilterHaveHiddenInput(option)) {
            return true;
        }
        return this.getValue(positionOne ? this.eValue1 : this.eValue2) != null;
    };
    TextFilter.prototype.individualConditionPasses = function (params, filterModel) {
        var filterText = filterModel.filter;
        var filterOption = filterModel.type;
        var cellValue = this.textFilterParams.valueGetter(params.node);
        var cellValueFormatted = this.formatter(cellValue);
        var customFilterOption = this.optionsFactory.getCustomOption(filterOption);
        if (customFilterOption) {
            // only execute the custom filter if a value exists or a value isn't required, i.e. input is hidden
            if (filterText != null || customFilterOption.hideFilterInput) {
                return customFilterOption.test(filterText, cellValueFormatted);
            }
        }
        if (cellValue == null) {
            return filterOption === simpleFilter_1.SimpleFilter.NOT_EQUAL || filterOption === simpleFilter_1.SimpleFilter.NOT_CONTAINS;
        }
        var filterTextFormatted = this.formatter(filterText);
        return this.comparator(filterOption, cellValueFormatted, filterTextFormatted);
    };
    TextFilter.DEFAULT_FILTER_OPTIONS = [
        simpleFilter_1.SimpleFilter.CONTAINS,
        simpleFilter_1.SimpleFilter.NOT_CONTAINS,
        simpleFilter_1.SimpleFilter.EQUALS,
        simpleFilter_1.SimpleFilter.NOT_EQUAL,
        simpleFilter_1.SimpleFilter.STARTS_WITH,
        simpleFilter_1.SimpleFilter.ENDS_WITH
    ];
    TextFilter.DEFAULT_FORMATTER = function (from) { return from; };
    TextFilter.DEFAULT_LOWERCASE_FORMATTER = function (from) {
        return from == null ? null : from.toString().toLowerCase();
    };
    TextFilter.DEFAULT_COMPARATOR = function (filter, value, filterText) {
        switch (filter) {
            case TextFilter.CONTAINS:
                return value.indexOf(filterText) >= 0;
            case TextFilter.NOT_CONTAINS:
                return value.indexOf(filterText) === -1;
            case TextFilter.EQUALS:
                return value === filterText;
            case TextFilter.NOT_EQUAL:
                return value != filterText;
            case TextFilter.STARTS_WITH:
                return value.indexOf(filterText) === 0;
            case TextFilter.ENDS_WITH:
                var index = value.lastIndexOf(filterText);
                return index >= 0 && index === (value.length - filterText.length);
            default:
                // should never happen
                console.warn('invalid filter type ' + filter);
                return false;
        }
    };
    __decorate([
        componentAnnotations_1.RefSelector('eValue1')
    ], TextFilter.prototype, "eValue1", void 0);
    __decorate([
        componentAnnotations_1.RefSelector('eValue2')
    ], TextFilter.prototype, "eValue2", void 0);
    return TextFilter;
}(simpleFilter_1.SimpleFilter));
exports.TextFilter = TextFilter;

//# sourceMappingURL=textFilter.js.map
