/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(cfb2c38540ef92ed199fc5ce09db1bbb5e8b9bb4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define("vs/language/typescript/monaco.contribution", ["require","vs/editor/editor.api"],(require)=>{
var moduleExports = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __reExport = (target, module, copyDefault, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toESM = (module, isNodeMode) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };
  var __toCommonJS = /* @__PURE__ */ ((cache) => {
    return (module, temp) => {
      return cache && cache.get(module) || (temp = __reExport(__markAsModule({}), module, 1), cache && cache.set(module, temp), temp);
    };
  })(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

  // src/fillers/monaco-editor-core-amd.ts
  var require_monaco_editor_core_amd = __commonJS({
    "src/fillers/monaco-editor-core-amd.ts"(exports, module) {
      var api = __toESM(__require("vs/editor/editor.api"));
      module.exports = api;
    }
  });

  // src/language/typescript/monaco.contribution.ts
  var monaco_contribution_exports = {};
  __export(monaco_contribution_exports, {
    JsxEmit: () => JsxEmit,
    ModuleKind: () => ModuleKind,
    ModuleResolutionKind: () => ModuleResolutionKind,
    NewLineKind: () => NewLineKind,
    ScriptTarget: () => ScriptTarget,
    getJavaScriptWorker: () => getJavaScriptWorker,
    getTypeScriptWorker: () => getTypeScriptWorker,
    javascriptDefaults: () => javascriptDefaults,
    typescriptDefaults: () => typescriptDefaults,
    typescriptVersion: () => typescriptVersion2
  });

  // src/language/typescript/lib/typescriptServicesMetadata.ts
  var typescriptVersion = "4.5.5";

  // src/fillers/monaco-editor-core.ts
  var monaco_editor_core_exports = {};
  __reExport(monaco_editor_core_exports, __toESM(require_monaco_editor_core_amd()));

  // src/language/typescript/monaco.contribution.ts
  var ModuleKind = /* @__PURE__ */ ((ModuleKind2) => {
    ModuleKind2[ModuleKind2["None"] = 0] = "None";
    ModuleKind2[ModuleKind2["CommonJS"] = 1] = "CommonJS";
    ModuleKind2[ModuleKind2["AMD"] = 2] = "AMD";
    ModuleKind2[ModuleKind2["UMD"] = 3] = "UMD";
    ModuleKind2[ModuleKind2["System"] = 4] = "System";
    ModuleKind2[ModuleKind2["ES2015"] = 5] = "ES2015";
    ModuleKind2[ModuleKind2["ESNext"] = 99] = "ESNext";
    return ModuleKind2;
  })(ModuleKind || {});
  var JsxEmit = /* @__PURE__ */ ((JsxEmit2) => {
    JsxEmit2[JsxEmit2["None"] = 0] = "None";
    JsxEmit2[JsxEmit2["Preserve"] = 1] = "Preserve";
    JsxEmit2[JsxEmit2["React"] = 2] = "React";
    JsxEmit2[JsxEmit2["ReactNative"] = 3] = "ReactNative";
    JsxEmit2[JsxEmit2["ReactJSX"] = 4] = "ReactJSX";
    JsxEmit2[JsxEmit2["ReactJSXDev"] = 5] = "ReactJSXDev";
    return JsxEmit2;
  })(JsxEmit || {});
  var NewLineKind = /* @__PURE__ */ ((NewLineKind2) => {
    NewLineKind2[NewLineKind2["CarriageReturnLineFeed"] = 0] = "CarriageReturnLineFeed";
    NewLineKind2[NewLineKind2["LineFeed"] = 1] = "LineFeed";
    return NewLineKind2;
  })(NewLineKind || {});
  var ScriptTarget = /* @__PURE__ */ ((ScriptTarget2) => {
    ScriptTarget2[ScriptTarget2["ES3"] = 0] = "ES3";
    ScriptTarget2[ScriptTarget2["ES5"] = 1] = "ES5";
    ScriptTarget2[ScriptTarget2["ES2015"] = 2] = "ES2015";
    ScriptTarget2[ScriptTarget2["ES2016"] = 3] = "ES2016";
    ScriptTarget2[ScriptTarget2["ES2017"] = 4] = "ES2017";
    ScriptTarget2[ScriptTarget2["ES2018"] = 5] = "ES2018";
    ScriptTarget2[ScriptTarget2["ES2019"] = 6] = "ES2019";
    ScriptTarget2[ScriptTarget2["ES2020"] = 7] = "ES2020";
    ScriptTarget2[ScriptTarget2["ESNext"] = 99] = "ESNext";
    ScriptTarget2[ScriptTarget2["JSON"] = 100] = "JSON";
    ScriptTarget2[ScriptTarget2["Latest"] = 99] = "Latest";
    return ScriptTarget2;
  })(ScriptTarget || {});
  var ModuleResolutionKind = /* @__PURE__ */ ((ModuleResolutionKind2) => {
    ModuleResolutionKind2[ModuleResolutionKind2["Classic"] = 1] = "Classic";
    ModuleResolutionKind2[ModuleResolutionKind2["NodeJs"] = 2] = "NodeJs";
    return ModuleResolutionKind2;
  })(ModuleResolutionKind || {});
  var LanguageServiceDefaultsImpl = class {
    _onDidChange = new monaco_editor_core_exports.Emitter();
    _onDidExtraLibsChange = new monaco_editor_core_exports.Emitter();
    _extraLibs;
    _removedExtraLibs;
    _eagerModelSync;
    _compilerOptions;
    _diagnosticsOptions;
    _workerOptions;
    _onDidExtraLibsChangeTimeout;
    _inlayHintsOptions;
    constructor(compilerOptions, diagnosticsOptions, workerOptions, inlayHintsOptions) {
      this._extraLibs = /* @__PURE__ */ Object.create(null);
      this._removedExtraLibs = /* @__PURE__ */ Object.create(null);
      this._eagerModelSync = false;
      this.setCompilerOptions(compilerOptions);
      this.setDiagnosticsOptions(diagnosticsOptions);
      this.setWorkerOptions(workerOptions);
      this.setInlayHintsOptions(inlayHintsOptions);
      this._onDidExtraLibsChangeTimeout = -1;
    }
    get onDidChange() {
      return this._onDidChange.event;
    }
    get onDidExtraLibsChange() {
      return this._onDidExtraLibsChange.event;
    }
    get workerOptions() {
      return this._workerOptions;
    }
    get inlayHintsOptions() {
      return this._inlayHintsOptions;
    }
    getExtraLibs() {
      return this._extraLibs;
    }
    addExtraLib(content, _filePath) {
      let filePath;
      if (typeof _filePath === "undefined") {
        filePath = `ts:extralib-${Math.random().toString(36).substring(2, 15)}`;
      } else {
        filePath = _filePath;
      }
      if (this._extraLibs[filePath] && this._extraLibs[filePath].content === content) {
        return {
          dispose: () => {
          }
        };
      }
      let myVersion = 1;
      if (this._removedExtraLibs[filePath]) {
        myVersion = this._removedExtraLibs[filePath] + 1;
      }
      if (this._extraLibs[filePath]) {
        myVersion = this._extraLibs[filePath].version + 1;
      }
      this._extraLibs[filePath] = {
        content,
        version: myVersion
      };
      this._fireOnDidExtraLibsChangeSoon();
      return {
        dispose: () => {
          let extraLib = this._extraLibs[filePath];
          if (!extraLib) {
            return;
          }
          if (extraLib.version !== myVersion) {
            return;
          }
          delete this._extraLibs[filePath];
          this._removedExtraLibs[filePath] = myVersion;
          this._fireOnDidExtraLibsChangeSoon();
        }
      };
    }
    setExtraLibs(libs) {
      for (const filePath in this._extraLibs) {
        this._removedExtraLibs[filePath] = this._extraLibs[filePath].version;
      }
      this._extraLibs = /* @__PURE__ */ Object.create(null);
      if (libs && libs.length > 0) {
        for (const lib of libs) {
          const filePath = lib.filePath || `ts:extralib-${Math.random().toString(36).substring(2, 15)}`;
          const content = lib.content;
          let myVersion = 1;
          if (this._removedExtraLibs[filePath]) {
            myVersion = this._removedExtraLibs[filePath] + 1;
          }
          this._extraLibs[filePath] = {
            content,
            version: myVersion
          };
        }
      }
      this._fireOnDidExtraLibsChangeSoon();
    }
    _fireOnDidExtraLibsChangeSoon() {
      if (this._onDidExtraLibsChangeTimeout !== -1) {
        return;
      }
      this._onDidExtraLibsChangeTimeout = window.setTimeout(() => {
        this._onDidExtraLibsChangeTimeout = -1;
        this._onDidExtraLibsChange.fire(void 0);
      }, 0);
    }
    getCompilerOptions() {
      return this._compilerOptions;
    }
    setCompilerOptions(options) {
      this._compilerOptions = options || /* @__PURE__ */ Object.create(null);
      this._onDidChange.fire(void 0);
    }
    getDiagnosticsOptions() {
      return this._diagnosticsOptions;
    }
    setDiagnosticsOptions(options) {
      this._diagnosticsOptions = options || /* @__PURE__ */ Object.create(null);
      this._onDidChange.fire(void 0);
    }
    setWorkerOptions(options) {
      this._workerOptions = options || /* @__PURE__ */ Object.create(null);
      this._onDidChange.fire(void 0);
    }
    setInlayHintsOptions(options) {
      this._inlayHintsOptions = options || /* @__PURE__ */ Object.create(null);
      this._onDidChange.fire(void 0);
    }
    setMaximumWorkerIdleTime(value) {
    }
    setEagerModelSync(value) {
      this._eagerModelSync = value;
    }
    getEagerModelSync() {
      return this._eagerModelSync;
    }
  };
  var typescriptVersion2 = typescriptVersion;
  var typescriptDefaults = new LanguageServiceDefaultsImpl({ allowNonTsExtensions: true, target: 99 /* Latest */ }, { noSemanticValidation: false, noSyntaxValidation: false, onlyVisible: false }, {}, {});
  var javascriptDefaults = new LanguageServiceDefaultsImpl({ allowNonTsExtensions: true, allowJs: true, target: 99 /* Latest */ }, { noSemanticValidation: true, noSyntaxValidation: false, onlyVisible: false }, {}, {});
  var getTypeScriptWorker = () => {
    return getMode().then((mode) => mode.getTypeScriptWorker());
  };
  var getJavaScriptWorker = () => {
    return getMode().then((mode) => mode.getJavaScriptWorker());
  };
  monaco_editor_core_exports.languages.typescript = {
    ModuleKind,
    JsxEmit,
    NewLineKind,
    ScriptTarget,
    ModuleResolutionKind,
    typescriptVersion: typescriptVersion2,
    typescriptDefaults,
    javascriptDefaults,
    getTypeScriptWorker,
    getJavaScriptWorker
  };
  function getMode() {
    if (true) {
      return new Promise((resolve, reject) => {
        __require(["vs/language/typescript/tsMode"], resolve, reject);
      });
    } else {
      return null;
    }
  }
  monaco_editor_core_exports.languages.onLanguage("typescript", () => {
    return getMode().then((mode) => mode.setupTypeScript(typescriptDefaults));
  });
  monaco_editor_core_exports.languages.onLanguage("javascript", () => {
    return getMode().then((mode) => mode.setupJavaScript(javascriptDefaults));
  });
  return __toCommonJS(monaco_contribution_exports);
})();
return moduleExports;
});
