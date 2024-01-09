import { watch } from 'node:fs';
import path, { extname, join } from 'path';
import { getConventionRoutes } from './routeConvention.js';
import chalk from 'chalk';
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
// 注意编译后文件在 dist 目录下
const dir = join(__dirname, '../', 'assets');
const routes = getConventionRoutes({ base: dir });
Object.keys(routes).forEach(k => {
    const filepath = routes[k].filepath;
    watch(filepath, (event, filename) => {
        if (event === "rename") {
            const src = createAssetsSrc(filepath, filename || '');
            console.log(chalk.blue(src));
            if (['.png', '.jpg'].includes(extname(filename || ''))) {
                console.log(chalk.yellow(`<img src="${src}" width="500"/>`));
            }
        }
    });
});
const prefix = 'https://cdn.jsdelivr.net/gh/z1the3/myCDNassets';
function createAssetsSrc(filepath, filename) {
    const temp = filepath.split('assets');
    const suffix = temp[temp.length - 1];
    const src = prefix + suffix + '/' + filename;
    return src;
}
