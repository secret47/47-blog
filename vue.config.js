module.exports = {
  publicPath: "/",
  outputDir: "dist", //打包后的目录名称
  assetsDir: "static", //静态资源目录名称
  devServer: {
    open: true,
    host: 'localhost',
    port: '8080',
    https: false,
    hotOnly: true
  },
};
