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

// src/language/json/monaco.contribution.ts
var LanguageServiceDefaultsImpl = class {
  _onDidChange = new monaco_editor_core_exports.Emitter();
  _diagnosticsOptions;
  _modeConfiguration;
  _languageId;
  constructor(languageId, diagnosticsOptions, modeConfiguration) {
    this._languageId = languageId;
    this.setDiagnosticsOptions(diagnosticsOptions);
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
    return this._diagnosticsOptions;
  }
  setDiagnosticsOptions(options) {
    this._diagnosticsOptions = options || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(this);
  }
  setModeConfiguration(modeConfiguration) {
    this._modeConfiguration = modeConfiguration || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(this);
  }
};
var diagnosticDefault = {
  validate: true,
  allowComments: true,
  schemas: [],
  enableSchemaRequest: false,
  schemaRequest: "warning",
  schemaValidation: "warning",
  comments: "error",
  trailingCommas: "error"
};
var modeConfigurationDefault = {
  documentFormattingEdits: true,
  documentRangeFormattingEdits: true,
  completionItems: true,
  hovers: true,
  documentSymbols: true,
  tokens: true,
  colors: true,
  foldingRanges: true,
  diagnostics: true,
  selectionRanges: true
};
var jsonDefaults = new LanguageServiceDefaultsImpl("json", diagnosticDefault, modeConfigurationDefault);
monaco_editor_core_exports.languages.json = { jsonDefaults };
function getMode() {
  if (false) {
    return new Promise((resolve, reject) => {
      __require(["vs/language/json/jsonMode"], resolve, reject);
    });
  } else {
    return import("./jsonMode");
  }
}
monaco_editor_core_exports.languages.register({
  id: "json",
  extensions: [".json", ".bowerrc", ".jshintrc", ".jscsrc", ".eslintrc", ".babelrc", ".har"],
  aliases: ["JSON", "json"],
  mimetypes: ["application/json"]
});
monaco_editor_core_exports.languages.onLanguage("json", () => {
  getMode().then((mode) => mode.setupMode(jsonDefaults));
});
export {
  jsonDefaults
};
