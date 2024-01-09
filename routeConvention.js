"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConventionRoutes = void 0;
var node_fs_1 = require("node:fs");
var path_1 = require("path");
function getConventionRoutes(opts) {
    var files = {};
    // 如果 base 不是指向一个目录
    if (!((0, node_fs_1.existsSync)(opts.base) && (0, node_fs_1.statSync)(opts.base).isDirectory())) {
        return {};
    }
    visitFiles({
        base: opts.base,
        parent: 'assets',
        visitCallback: function (filepath, parent, filename) {
            //只记录source目录
            if (filename === 'source') {
                files[parent] = {
                    filename: filename,
                    filepath: filepath,
                    parent: parent
                };
            }
        },
    });
    return files;
    // files = files.sort((a,b)=>a.length - b.length)
}
exports.getConventionRoutes = getConventionRoutes;
function visitFiles(opts) {
    for (var _i = 0, _a = (0, node_fs_1.readdirSync)(opts.base); _i < _a.length; _i++) {
        var filename = _a[_i];
        // resolve文件路径
        var filepath = (0, path_1.resolve)(opts.base, filename);
        // 获取状态
        var stat = (0, node_fs_1.lstatSync)(filepath);
        // dfs
        if (stat.isDirectory()) {
            opts.visitCallback(filepath, opts.parent, filename);
            visitFiles(__assign(__assign({}, opts), { parent: filename, base: filepath }));
        }
    }
}
