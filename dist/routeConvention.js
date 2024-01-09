import { existsSync, lstatSync, readdirSync, statSync } from "node:fs";
import { resolve } from "path";
export function getConventionRoutes(opts) {
    const files = {};
    if (!(existsSync(opts.base) && statSync(opts.base).isDirectory())) {
        return {};
    }
    visitFiles({
        base: opts.base,
        parent: 'assets',
        visitCallback(filepath, parent, filename) {
            if (filename === 'source') {
                files[parent] = {
                    filename,
                    filepath,
                    parent
                };
            }
        },
    });
    return files;
}
function visitFiles(opts) {
    for (let filename of readdirSync(opts.base)) {
        let filepath = resolve(opts.base, filename);
        let stat = lstatSync(filepath);
        if (stat.isDirectory()) {
            opts.visitCallback(filepath, opts.parent, filename);
            visitFiles({ ...opts, parent: filename, base: filepath });
        }
    }
}
