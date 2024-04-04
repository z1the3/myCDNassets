import { watch } from 'node:fs';
import path, { extname, join } from 'path';
import { getConventionRoutes } from './routeConvention.js';
import chalk from 'chalk'

const ncpPromise = import("copy-paste") as any



// 解决 __dirname 无法在esm模块中使用
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const dir = join(__dirname,'../','assets')
const routes = getConventionRoutes({base: dir})
Object.keys(routes).forEach(k=>{
    const filepath = routes[k].filepath
    watch(filepath, (event,filename)=>{
        if(event==="rename"){
            const src = createAssetsSrc(filepath,filename || '')
            console.log(chalk.blue(src))
            // 如果是图片，生成html标签
            if(['.png','.jpg','.jpeg','.PNG'].includes(extname(filename || ''))){
                console.log(chalk.yellow(`<img src="${src}" width="500"/>`))
                ncpPromise.then((ncp) =>
                    ncp.copy(`<img src="${src}" width="500"/>`, () => {
                    console.log('标签已复制')
                }))
            }
        
        }
    })
})

const prefix = 'https://cdn.jsdelivr.net/gh/z1the3/myCDNassets'
function createAssetsSrc(filepath:string,filename:string):string{
    const temp = filepath.split('assets')
    const suffix = temp[temp.length-1]
    // 注意目录可能有多个assets关键词, 最末一个是有效的
    const src = prefix + '/assets' + suffix + '/' + filename
    return src
}
