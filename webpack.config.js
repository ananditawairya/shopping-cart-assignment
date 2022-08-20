const path=require("path");
module.exports={
    mode:"development",
    entry:"./index.js",
    output:{
        path:path.resolve(__dirname,"public"),
        filename:"bundle.js",
        publicPath: '/',
    },
    target:"web",
    devServer:{
        port:"3001",
        static:["./public"],
        open:true,
        hot:true,
        liveReload:true,
        historyApiFallback: true,
    },
    resolve:{
        extensions:[".js",".jsx",".json"]
    },
    module:{
        rules:[{
            test:/\.(js|jsx)$/,
            exclude:/node_modules/,
            use:"babel-loader"
        },
        {
            test: /\.png|svg|jpg|gif$/,
            use: ["file-loader"],
          },
          {
            test: /\.(s(a|c)ss)$/,
            use: ['style-loader','css-loader', 'sass-loader']
         }]
    }
}