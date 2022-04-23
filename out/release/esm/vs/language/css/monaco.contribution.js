/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(cfb2c38540ef92ed199fc5ce09db1bbb5e8b9bb4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __reExport = (target, module, copyDefault, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};

// src/fillers/monaco-editor-core.ts
var monaco_editor_core_exports = {};
__reExport(monaco_editor_core_exports, monaco_editor_core_star);
import * as monaco_editor_core_star from "monaco-editor-core";

// src/language/css/monaco.contribution.ts
var LanguageServiceDefaultsImpl = class {
  _onDidChange = new monaco_editor_core_exports.Emitter();
  _options;
  _modeConfiguration;
  _languageId;
  constructor(languageId, options, modeConfiguration) {
    this._languageId = languageId;
    this.setOptions(options);
    this.setModeConfiguration(modeConfiguration);
  }
  get onDidChange() {
    return this._onDidChange.event;
  }
  get languageId() {
    return this._languageId;
  }
  get modeConfiguration() {
    return this._modeConfiguration;
  }
  get diagnosticsOptions() {
    return this.options;
  }
  get options() {
    return this._options;
  }
  setOptions(options) {
    this._options = options || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(this);
  }
  setDiagnosticsOptions(options) {
    this.setOptions(options);
  }
  setModeConfiguration(modeConfiguration) {
    this._modeConfiguration = modeConfiguration || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(this);
  }
};
var optionsDefault = {
  validate: true,
  lint: {
    compatibleVendorPrefixes: "ignore",
    vendorPrefix: "warning",
    duplicateProperties: "warning",
    emptyRules: "warning",
    importStatement: "ignore",
    boxModel: "ignore",
    universalSelector: "ignore",
    zeroUnits: "ignore",
    fontFaceProperties: "warning",
    hexColorLength: "error",
    argumentsInColorFunction: "error",
    unknownProperties: "warning",
    ieHack: "ignore",
    unknownVendorSpecificProperties: "ignore",
    propertyIgnoredDueToDisplay: "warning",
    important: "ignore",
    float: "ignore",
    idSelector: "ignore"
  },
  data: { useDefaultDataProvider: true },
  format: {
    newlineBetweenSelectors: true,
    newlineBetweenRules: true,
    spaceAroundSelectorSeparator: false,
    braceStyle: "collapse",
    maxPreserveNewLines: void 0,
    preserveNewLines: true
  }
};
var modeConfigurationDefault = {
  completionItems: true,
  hovers: true,
  documentSymbols: true,
  definitions: true,
  references: true,
  documentHighlights: true,
  rename: true,
  colors: true,
  foldingRanges: true,
  diagnostics: true,
  selectionRanges: true,
  documentFormattingEdits: true,
  documentRangeFormattingEdits: true
};
var cssDefaults = new LanguageServiceDefaultsImpl("css", optionsDefault, modeConfigurationDefault);
var scssDefaults = new LanguageServiceDefaultsImpl("scss", optionsDefault, modeConfigurationDefault);
var lessDefaults = new LanguageServiceDefaultsImpl("less", optionsDefault, modeConfigurationDefault);
monaco_editor_core_exports.languages.css = { cssDefaults, lessDefaults, scssDefaults };
function getMode() {
  if (false) {
    return new Promise((resolve, reject) => {
      __require(["vs/language/css/cssMode"], resolve, reject);
    });
  } else {
    return import("./cssMode");
  }
}
monaco_editor_core_exports.languages.onLanguage("less", () => {
  getMode().then((mode) => mode.setupMode(lessDefaults));
});
monaco_editor_core_exports.languages.onLanguage("scss", () => {
  getMode().then((mode) => mode.setupMode(scssDefaults));
});
monaco_editor_core_exports.languages.onLanguage("css", () => {
  getMode().then((mode) => mode.setupMode(cssDefaults));
});
export {
  cssDefaults,
  lessDefaults,
  scssDefaults
};
