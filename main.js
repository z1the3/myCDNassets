"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fs_1 = require("node:fs");
var path_1 = require("path");
var routeConvention_js_1 = require("./routeConvention.js");
var chalk_1 = require("chalk");
// 解决 __dirname 无法在esm模块中使用
var __filename = new URL(import.meta.url).pathname;
var __dirname = path_1.default.dirname(__filename);
var dir = (0, path_1.join)(__dirname, 'assets');
var routes = (0, routeConvention_js_1.getConventionRoutes)({ base: dir });
Object.keys(routes).forEach(function (k) {
    var filepath = routes[k].filepath;
    (0, node_fs_1.watch)(filepath, function (event, filename) {
        if (event === "rename") {
            var src = createAssetsSrc(filepath, filename || '');
            console.log(chalk_1.default.blue(src));
            // 如果是图片，生成html标签
            if (['.png', '.jpg'].includes((0, path_1.extname)(filename || ''))) {
                console.log(chalk_1.default.yellow("<img src=\"".concat(src, "\" width=\"500\"/>")));
            }
        }
    });
});
var prefix = 'https://cdn.jsdelivr.net/gh/z1the3/myCDNassets';
function createAssetsSrc(filepath, filename) {
    var temp = filepath.split('assets');
    var suffix = temp[temp.length - 1];
    // 注意目录可能有多个assets关键词, 最末一个是有效的
    var src = prefix + suffix + '/' + filename;
    return src;
}
