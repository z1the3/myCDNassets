import { existsSync, lstatSync, readdirSync, statSync } from "node:fs"
import { extname, relative, resolve } from "path"


export function getConventionRoutes(
    opts:{
        // 基于该目录获得下面的所有资源
        base: string
    }
){
    const files: {[fileId: string]:Record<string,string>} = {}
    // 如果 base 不是指向一个目录
    if(!(existsSync(opts.base)&&statSync(opts.base).isDirectory())){
        return {}
    }

    visitFiles({
        base: opts.base,
        parent: 'assets',
        visitCallback(filepath,parent,filename) {
            //只记录source目录
            if(filename==='source'){
                files[parent] = {
                    filename,
                    filepath,
                    parent
                }
            }
        },
    })
    return files;
    // files = files.sort((a,b)=>a.length - b.length)

}

function visitFiles(opts: {
    base: string,
    parent: string,
    visitCallback: (filepath: string,parent:string,filename:string) => void
}): void {
    for(let filename of readdirSync(opts.base)){
        // resolve文件路径
        let filepath = resolve(opts.base, filename)
        // 获取状态
        let stat = lstatSync(filepath)
        // dfs
        if(stat.isDirectory()){
            opts.visitCallback(filepath,opts.parent,filename)
            visitFiles({...opts,parent:filename,base:filepath})
        }
        

    }
}
