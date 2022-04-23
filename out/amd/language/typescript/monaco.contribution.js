/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "./lib/typescriptServicesMetadata", "../../fillers/monaco-editor-core"], function (require, exports, typescriptServicesMetadata_1, monaco_editor_core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getJavaScriptWorker = exports.getTypeScriptWorker = exports.javascriptDefaults = exports.typescriptDefaults = exports.typescriptVersion = exports.ModuleResolutionKind = exports.ScriptTarget = exports.NewLineKind = exports.JsxEmit = exports.ModuleKind = void 0;
    //#region enums copied from typescript to prevent loading the entire typescriptServices ---
    var ModuleKind;
    (function (ModuleKind) {
        ModuleKind[ModuleKind["None"] = 0] = "None";
        ModuleKind[ModuleKind["CommonJS"] = 1] = "CommonJS";
        ModuleKind[ModuleKind["AMD"] = 2] = "AMD";
        ModuleKind[ModuleKind["UMD"] = 3] = "UMD";
        ModuleKind[ModuleKind["System"] = 4] = "System";
        ModuleKind[ModuleKind["ES2015"] = 5] = "ES2015";
        ModuleKind[ModuleKind["ESNext"] = 99] = "ESNext";
    })(ModuleKind = exports.ModuleKind || (exports.ModuleKind = {}));
    var JsxEmit;
    (function (JsxEmit) {
        JsxEmit[JsxEmit["None"] = 0] = "None";
        JsxEmit[JsxEmit["Preserve"] = 1] = "Preserve";
        JsxEmit[JsxEmit["React"] = 2] = "React";
        JsxEmit[JsxEmit["ReactNative"] = 3] = "ReactNative";
        JsxEmit[JsxEmit["ReactJSX"] = 4] = "ReactJSX";
        JsxEmit[JsxEmit["ReactJSXDev"] = 5] = "ReactJSXDev";
    })(JsxEmit = exports.JsxEmit || (exports.JsxEmit = {}));
    var NewLineKind;
    (function (NewLineKind) {
        NewLineKind[NewLineKind["CarriageReturnLineFeed"] = 0] = "CarriageReturnLineFeed";
        NewLineKind[NewLineKind["LineFeed"] = 1] = "LineFeed";
    })(NewLineKind = exports.NewLineKind || (exports.NewLineKind = {}));
    var ScriptTarget;
    (function (ScriptTarget) {
        ScriptTarget[ScriptTarget["ES3"] = 0] = "ES3";
        ScriptTarget[ScriptTarget["ES5"] = 1] = "ES5";
        ScriptTarget[ScriptTarget["ES2015"] = 2] = "ES2015";
        ScriptTarget[ScriptTarget["ES2016"] = 3] = "ES2016";
        ScriptTarget[ScriptTarget["ES2017"] = 4] = "ES2017";
        ScriptTarget[ScriptTarget["ES2018"] = 5] = "ES2018";
        ScriptTarget[ScriptTarget["ES2019"] = 6] = "ES2019";
        ScriptTarget[ScriptTarget["ES2020"] = 7] = "ES2020";
        ScriptTarget[ScriptTarget["ESNext"] = 99] = "ESNext";
        ScriptTarget[ScriptTarget["JSON"] = 100] = "JSON";
        ScriptTarget[ScriptTarget["Latest"] = 99] = "Latest";
    })(ScriptTarget = exports.ScriptTarget || (exports.ScriptTarget = {}));
    var ModuleResolutionKind;
    (function (ModuleResolutionKind) {
        ModuleResolutionKind[ModuleResolutionKind["Classic"] = 1] = "Classic";
        ModuleResolutionKind[ModuleResolutionKind["NodeJs"] = 2] = "NodeJs";
    })(ModuleResolutionKind = exports.ModuleResolutionKind || (exports.ModuleResolutionKind = {}));
    // --- TypeScript configuration and defaults ---------
    var LanguageServiceDefaultsImpl = /** @class */ (function () {
        function LanguageServiceDefaultsImpl(compilerOptions, diagnosticsOptions, workerOptions, inlayHintsOptions) {
            this._onDidChange = new monaco_editor_core_1.Emitter();
            this._onDidExtraLibsChange = new monaco_editor_core_1.Emitter();
            this._extraLibs = Object.create(null);
            this._removedExtraLibs = Object.create(null);
            this._eagerModelSync = false;
            this.setCompilerOptions(compilerOptions);
            this.setDiagnosticsOptions(diagnosticsOptions);
            this.setWorkerOptions(workerOptions);
            this.setInlayHintsOptions(inlayHintsOptions);
            this._onDidExtraLibsChangeTimeout = -1;
        }
        Object.defineProperty(LanguageServiceDefaultsImpl.prototype, "onDidChange", {
            get: function () {
                return this._onDidChange.event;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LanguageServiceDefaultsImpl.prototype, "onDidExtraLibsChange", {
            get: function () {
                return this._onDidExtraLibsChange.event;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LanguageServiceDefaultsImpl.prototype, "workerOptions", {
            get: function () {
                return this._workerOptions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LanguageServiceDefaultsImpl.prototype, "inlayHintsOptions", {
            get: function () {
                return this._inlayHintsOptions;
            },
            enumerable: false,
            configurable: true
        });
        LanguageServiceDefaultsImpl.prototype.getExtraLibs = function () {
            return this._extraLibs;
        };
        LanguageServiceDefaultsImpl.prototype.addExtraLib = function (content, _filePath) {
            var _this = this;
            var filePath;
            if (typeof _filePath === 'undefined') {
                filePath = "ts:extralib-".concat(Math.random().toString(36).substring(2, 15));
            }
            else {
                filePath = _filePath;
            }
            if (this._extraLibs[filePath] && this._extraLibs[filePath].content === content) {
                // no-op, there already exists an extra lib with this content
                return {
                    dispose: function () { }
                };
            }
            var myVersion = 1;
            if (this._removedExtraLibs[filePath]) {
                myVersion = this._removedExtraLibs[filePath] + 1;
            }
            if (this._extraLibs[filePath]) {
                myVersion = this._extraLibs[filePath].version + 1;
            }
            this._extraLibs[filePath] = {
                content: content,
                version: myVersion
            };
            this._fireOnDidExtraLibsChangeSoon();
            return {
                dispose: function () {
                    var extraLib = _this._extraLibs[filePath];
                    if (!extraLib) {
                        return;
                    }
                    if (extraLib.version !== myVersion) {
                        return;
                    }
                    delete _this._extraLibs[filePath];
                    _this._removedExtraLibs[filePath] = myVersion;
                    _this._fireOnDidExtraLibsChangeSoon();
                }
            };
        };
        LanguageServiceDefaultsImpl.prototype.setExtraLibs = function (libs) {
            for (var filePath in this._extraLibs) {
                this._removedExtraLibs[filePath] = this._extraLibs[filePath].version;
            }
            // clear out everything
            this._extraLibs = Object.create(null);
            if (libs && libs.length > 0) {
                for (var _i = 0, libs_1 = libs; _i < libs_1.length; _i++) {
                    var lib = libs_1[_i];
                    var filePath = lib.filePath || "ts:extralib-".concat(Math.random().toString(36).substring(2, 15));
                    var content = lib.content;
                    var myVersion = 1;
                    if (this._removedExtraLibs[filePath]) {
                        myVersion = this._removedExtraLibs[filePath] + 1;
                    }
                    this._extraLibs[filePath] = {
                        content: content,
                        version: myVersion
                    };
                }
            }
            this._fireOnDidExtraLibsChangeSoon();
        };
        LanguageServiceDefaultsImpl.prototype._fireOnDidExtraLibsChangeSoon = function () {
            var _this = this;
            if (this._onDidExtraLibsChangeTimeout !== -1) {
                // already scheduled
                return;
            }
            this._onDidExtraLibsChangeTimeout = window.setTimeout(function () {
                _this._onDidExtraLibsChangeTimeout = -1;
                _this._onDidExtraLibsChange.fire(undefined);
            }, 0);
        };
        LanguageServiceDefaultsImpl.prototype.getCompilerOptions = function () {
            return this._compilerOptions;
        };
        LanguageServiceDefaultsImpl.prototype.setCompilerOptions = function (options) {
            this._compilerOptions = options || Object.create(null);
            this._onDidChange.fire(undefined);
        };
        LanguageServiceDefaultsImpl.prototype.getDiagnosticsOptions = function () {
            return this._diagnosticsOptions;
        };
        LanguageServiceDefaultsImpl.prototype.setDiagnosticsOptions = function (options) {
            this._diagnosticsOptions = options || Object.create(null);
            this._onDidChange.fire(undefined);
        };
        LanguageServiceDefaultsImpl.prototype.setWorkerOptions = function (options) {
            this._workerOptions = options || Object.create(null);
            this._onDidChange.fire(undefined);
        };
        LanguageServiceDefaultsImpl.prototype.setInlayHintsOptions = function (options) {
            this._inlayHintsOptions = options || Object.create(null);
            this._onDidChange.fire(undefined);
        };
        LanguageServiceDefaultsImpl.prototype.setMaximumWorkerIdleTime = function (value) { };
        LanguageServiceDefaultsImpl.prototype.setEagerModelSync = function (value) {
            // doesn't fire an event since no
            // worker restart is required here
            this._eagerModelSync = value;
        };
        LanguageServiceDefaultsImpl.prototype.getEagerModelSync = function () {
            return this._eagerModelSync;
        };
        return LanguageServiceDefaultsImpl;
    }());
    exports.typescriptVersion = typescriptServicesMetadata_1.typescriptVersion;
    exports.typescriptDefaults = new LanguageServiceDefaultsImpl({ allowNonTsExtensions: true, target: ScriptTarget.Latest }, { noSemanticValidation: false, noSyntaxValidation: false, onlyVisible: false }, {}, {});
    exports.javascriptDefaults = new LanguageServiceDefaultsImpl({ allowNonTsExtensions: true, allowJs: true, target: ScriptTarget.Latest }, { noSemanticValidation: true, noSyntaxValidation: false, onlyVisible: false }, {}, {});
    var getTypeScriptWorker = function () {
        return getMode().then(function (mode) { return mode.getTypeScriptWorker(); });
    };
    exports.getTypeScriptWorker = getTypeScriptWorker;
    var getJavaScriptWorker = function () {
        return getMode().then(function (mode) { return mode.getJavaScriptWorker(); });
    };
    exports.getJavaScriptWorker = getJavaScriptWorker;
    // export to the global based API
    monaco_editor_core_1.languages.typescript = {
        ModuleKind: ModuleKind,
        JsxEmit: JsxEmit,
        NewLineKind: NewLineKind,
        ScriptTarget: ScriptTarget,
        ModuleResolutionKind: ModuleResolutionKind,
        typescriptVersion: exports.typescriptVersion,
        typescriptDefaults: exports.typescriptDefaults,
        javascriptDefaults: exports.javascriptDefaults,
        getTypeScriptWorker: exports.getTypeScriptWorker,
        getJavaScriptWorker: exports.getJavaScriptWorker
    };
    function getMode() {
        if (AMD) {
            return new Promise(function (resolve, reject) {
                require(['vs/language/typescript/tsMode'], resolve, reject);
            });
        }
        else {
            return new Promise(function (resolve_1, reject_1) { require(['./tsMode'], resolve_1, reject_1); });
        }
    }
    monaco_editor_core_1.languages.onLanguage('typescript', function () {
        return getMode().then(function (mode) { return mode.setupTypeScript(exports.typescriptDefaults); });
    });
    monaco_editor_core_1.languages.onLanguage('javascript', function () {
        return getMode().then(function (mode) { return mode.setupJavaScript(exports.javascriptDefaults); });
    });
});
