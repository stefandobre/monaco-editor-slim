
const gulp = require('gulp');
const metadata = require('./metadata');
const es = require('event-stream');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const File = require('vinyl');
const ts = require('typescript');

async function _execute(task) {
	// Always invoke as if it were a callback task
	return new Promise((resolve, reject) => {
		if (task.length === 1) {
			// this is a calback task
			task((err) => {
				if (err) {
					return reject(err);
				}
				resolve();
			});
			return;
		}
		const taskResult = task();
		if (typeof taskResult === 'undefined') {
			// this is a sync task
			resolve();
			return;
		}
		if (typeof taskResult.then === 'function') {
			// this is a promise returning task
			taskResult.then(resolve, reject);
			return;
		}
		// this is a stream returning task
		taskResult.on('end', _ => resolve());
		taskResult.on('error', err => reject(err));
	});
}

function taskSeries(...tasks) {
	return async () => {
		for (let i = 0; i < tasks.length; i++) {
			await _execute(tasks[i]);
		}
	};
}

const cleanReleaseTask = function(cb) { rimraf('release', { maxBusyTries: 1 }, cb); };
gulp.task('release', taskSeries(cleanReleaseTask, function() {
	return es.merge(

		// dev folder
		releaseOne('dev'),

		// min folder
		releaseOne('min'),

		// esm folder
		ESM_release(),

		// package.json
		gulp.src('package.json')
			.pipe(es.through(function(data) {
				var json = JSON.parse(data.contents.toString());
				json.private = false;
				data.contents = Buffer.from(JSON.stringify(json, null, '  '));
				this.emit('data', data);
			}))
			.pipe(gulp.dest('release')),

		gulp.src('CHANGELOG.md')
			.pipe(gulp.dest('release')),

		// min-maps folder
		gulp.src('node_modules/monaco-editor-core/min-maps/**/*')
			.pipe(gulp.dest('release/min-maps')),

		// other files
		gulp.src([
			'node_modules/monaco-editor-core/LICENSE',
			'node_modules/monaco-editor-core/ThirdPartyNotices.txt',
			'README.md'
		])
		.pipe(addPluginThirdPartyNotices())
		.pipe(gulp.dest('release'))
	)
}));

/**
 * Release to `dev` or `min`.
 */
function releaseOne(type) {
	return es.merge(
		gulp.src('node_modules/monaco-editor-core/' + type + '/**/*')
			.pipe(addPluginContribs(type))
			.pipe(gulp.dest('release/' + type)),

		pluginStreams(type, 'release/' + type + '/')
	)
}

/**
 * Release plugins to `dev` or `min`.
 */
function pluginStreams(type, destinationPath) {
	return es.merge(
		metadata.METADATA.PLUGINS.map(function(plugin) {
			return pluginStream(plugin, type, destinationPath);
		})
	);
}

/**
 * Release a plugin to `dev` or `min`.
 */
function pluginStream(plugin, type, destinationPath) {
	var pluginPath = plugin.paths[`npm/${type}`]; // npm/dev or npm/min
	var contribPath = path.join(pluginPath, plugin.contrib.substr(plugin.modulePrefix.length)) + '.js';
	return (
		gulp.src([
			pluginPath + '/**/*',
			'!' + contribPath
		])
		.pipe(es.through(function(data) {
			if (!/_\.contribution/.test(data.path)) {
				this.emit('data', data);
				return;
			}

			let contents = data.contents.toString();
			contents = contents.replace('define(["require", "exports"],', 'define(["require", "exports", "vs/editor/editor.api"],');
			data.contents = Buffer.from(contents);
			this.emit('data', data);
		}))
		.pipe(gulp.dest(destinationPath + plugin.modulePrefix))
	);
}

/**
 * Edit editor.main.js:
 * - rename the AMD module 'vs/editor/editor.main' to 'vs/editor/edcore.main'
 * - append monaco.contribution modules from plugins
 * - append new AMD module 'vs/editor/editor.main' that stiches things together
 */
function addPluginContribs(type) {
	return es.through(function(data) {
		if (!/editor\.main\.js$/.test(data.path)) {
			this.emit('data', data);
			return;
		}
		var contents = data.contents.toString();

		// Rename the AMD module 'vs/editor/editor.main' to 'vs/editor/edcore.main'
		contents = contents.replace(/"vs\/editor\/editor\.main\"/, '"vs/editor/edcore.main"');

		var extraContent = [];
		var allPluginsModuleIds = [];

		metadata.METADATA.PLUGINS.forEach(function(plugin) {
			allPluginsModuleIds.push(plugin.contrib);
			var pluginPath = plugin.paths[`npm/${type}`]; // npm/dev or npm/min
			var contribPath = path.join(__dirname, pluginPath, plugin.contrib.substr(plugin.modulePrefix.length)) + '.js';
			var contribContents = fs.readFileSync(contribPath).toString();

			contribContents = contribContents.replace(
				/define\((['"][a-z\/\-]+\/fillers\/monaco-editor-core['"]),\[\],/,
				'define($1,[\'vs/editor/editor.api\'],'
			);

			extraContent.push(contribContents);
		});

		extraContent.push(`define("vs/editor/editor.main", ["vs/editor/edcore.main","${allPluginsModuleIds.join('","')}"], function(api) { return api; });`);
		var insertIndex = contents.lastIndexOf('//# sourceMappingURL=');
		if (insertIndex === -1) {
			insertIndex = contents.length;
		}
		contents = contents.substring(0, insertIndex) + '\n' + extraContent.join('\n') + '\n' + contents.substring(insertIndex);

		data.contents = Buffer.from(contents);
		this.emit('data', data);
	});
}

function ESM_release() {
	return es.merge(
		gulp.src([
			'node_modules/monaco-editor-core/esm/**/*',
			// we will create our own editor.api.d.ts which also contains the plugins API
			'!node_modules/monaco-editor-core/esm/vs/editor/editor.api.d.ts'
		])
			.pipe(ESM_addImportSuffix())
			.pipe(ESM_addPluginContribs('release/esm'))
			.pipe(gulp.dest('release/esm')),

		ESM_pluginStreams('release/esm/')
	)
}

/**
 * Release plugins to `esm`.
 */
function ESM_pluginStreams(destinationPath) {
	return es.merge(
		metadata.METADATA.PLUGINS.map(function(plugin) {
			return ESM_pluginStream(plugin, destinationPath);
		})
	);
}

/**
 * Release a plugin to `esm`.
 * Adds a dependency to 'vs/editor/editor.api' in contrib files in order for `monaco` to be defined.
 * Rewrites imports for 'monaco-editor-core/**'
 */
function ESM_pluginStream(plugin, destinationPath) {
	const DESTINATION = path.join(__dirname, destinationPath);
	let pluginPath = plugin.paths[`esm`];
	return (
		gulp.src([
			pluginPath + '/**/*'
		])
		.pipe(es.through(function(data) {
			if (!/\.js$/.test(data.path)) {
				this.emit('data', data);
				return;
			}

			let contents = data.contents.toString();

			const info = ts.preProcessFile(contents);
			for (let i = info.importedFiles.length - 1; i >= 0; i--) {
				let importText = info.importedFiles[i].fileName;
				const pos = info.importedFiles[i].pos;
				const end = info.importedFiles[i].end;

				if (!/(^\.\/)|(^\.\.\/)/.test(importText)) {
					// non-relative import
					if (!/^monaco-editor-core/.test(importText)) {
						console.error(`Non-relative import for unknown module: ${importText} in ${data.path}`);
						process.exit(0);
					}

					if (importText === 'monaco-editor-core') {
						importText = 'monaco-editor-core/esm/vs/editor/editor.api';
					}

					const myFileDestPath = path.join(DESTINATION, plugin.modulePrefix, data.relative);
					const importFilePath = path.join(DESTINATION, importText.substr('monaco-editor-core/esm/'.length));
					let relativePath = path.relative(path.dirname(myFileDestPath), importFilePath).replace(/\\/g, '/');
					if (!/(^\.\/)|(^\.\.\/)/.test(relativePath)) {
						relativePath = './' + relativePath;
					}

					contents = (
						contents.substring(0, pos + 1)
						+ relativePath
						+ contents.substring(end + 1)
					);
				}
			}

			contents = contents.replace(/\/\/# sourceMappingURL=.*((\r?\n)|$)/g, '');

			data.contents = Buffer.from(contents);
			this.emit('data', data);
		}))
		.pipe(es.through(function(data) {
			if (!/monaco\.contribution\.js$/.test(data.path)) {
				this.emit('data', data);
				return;
			}

			const myFileDestPath = path.join(DESTINATION, plugin.modulePrefix, data.relative);
			const apiFilePath = path.join(DESTINATION, 'vs/editor/editor.api');
			let relativePath = path.relative(path.dirname(myFileDestPath), apiFilePath).replace(/\\/g, '/');
			if (!/(^\.\/)|(^\.\.\/)/.test(relativePath)) {
				relativePath = './' + relativePath;
			}

			let contents = data.contents.toString();
			contents = (
				`import '${relativePath}';\n` +
				contents
			);

			data.contents = Buffer.from(contents);

			this.emit('data', data);
		}))
		.pipe(ESM_addImportSuffix())
		.pipe(gulp.dest(destinationPath + plugin.modulePrefix))
	);
}

function ESM_addImportSuffix() {
	return es.through(function(data) {
		if (!/\.js$/.test(data.path)) {
			this.emit('data', data);
			return;
		}

		let contents = data.contents.toString();

		const info = ts.preProcessFile(contents);
		for (let i = info.importedFiles.length - 1; i >= 0; i--) {
			const importText = info.importedFiles[i].fileName;
			const pos = info.importedFiles[i].pos;
			const end = info.importedFiles[i].end;

			if (/\.css$/.test(importText)) {
				continue;
			}

			contents = (
				contents.substring(0, pos + 1)
				+ importText + '.js'
				+ contents.substring(end + 1)
			);
		}

		data.contents = Buffer.from(contents);
		this.emit('data', data);
	});
}

/**
 * - Rename esm/vs/editor/editor.main.js to esm/vs/editor/edcore.main.js
 * - Create esm/vs/editor/editor.main.js that that stiches things together
 */
function ESM_addPluginContribs(dest) {
	const DESTINATION = path.join(__dirname, dest);
	return es.through(function(data) {
		if (!/editor\.main\.js$/.test(data.path)) {
			this.emit('data', data);
			return;
		}

		this.emit('data', new File({
			path: data.path.replace(/editor\.main/, 'edcore.main'),
			base: data.base,
			contents: data.contents
		}));

		const mainFileDestPath = path.join(DESTINATION, 'vs/editor/editor.main.js');
		let mainFileImports = [];
		metadata.METADATA.PLUGINS.forEach(function(plugin) {
			const contribDestPath = path.join(DESTINATION, plugin.contrib);

			let relativePath = path.relative(path.dirname(mainFileDestPath), contribDestPath).replace(/\\/g, '/');
			if (!/(^\.\/)|(^\.\.\/)/.test(relativePath)) {
				relativePath = './' + relativePath;
			}

			mainFileImports.push(relativePath);
		});

		let mainFileContents = (
			mainFileImports.map((name) => `import '${name}';`).join('\n')
			+ `\n\nexport * from './edcore.main';`
		);

		this.emit('data', new File({
			path: data.path,
			base: data.base,
			contents: Buffer.from(mainFileContents)
		}));
	});
}

/**
 * Edit ThirdPartyNotices.txt:
 * - append ThirdPartyNotices.txt from plugins
 */
function addPluginThirdPartyNotices() {
	return es.through(function(data) {
		if (!/ThirdPartyNotices\.txt$/.test(data.path)) {
			this.emit('data', data);
			return;
		}
		var contents = data.contents.toString();

		var extraContent = [];
		metadata.METADATA.PLUGINS.forEach(function(plugin) {
			if (!plugin.thirdPartyNotices) {
				return;
			}

			console.log('ADDING ThirdPartyNotices from ' + plugin.thirdPartyNotices);
			var thirdPartyNoticeContent = fs.readFileSync(plugin.thirdPartyNotices).toString();
			thirdPartyNoticeContent = thirdPartyNoticeContent.split('\n').slice(8).join('\n');
			extraContent.push(thirdPartyNoticeContent);
		});

		contents += '\n' + extraContent.join('\n');
		data.contents = Buffer.from(contents);

		this.emit('data', data);
	});
}