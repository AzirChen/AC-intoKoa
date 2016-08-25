const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var
        //给每个参数加上默认值
        autoescape = opts.autoescape && true,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        //变量env就表示Nunjucks模板引擎对象，它有一个render(view, model)方法，正好传入view和model两个参数，并返回字符串。
        env = new nunjucks.Environment(
            //创建一个文件系统加载器，从views目录读取模板。
            new nunjucks.FileSystemLoader('views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating(path, opts) {
    //创建NUnjucks的env对象
    var env = createEnv(path, opts);
    return async (ctx, next) => {
        //给ctx绑定render函数
        ctx.render = function (view, model) {
            //把render后的内容赋值给response.body
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            //设置content-Type
            ctx.response.type = 'text/html';
        };
        //继续处理请求
        await next();
    };
}

module.exports = templating;