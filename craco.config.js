/*craco.config.js 通过craco来对create-react-app进行修改默认配置*/
const CracoLessPlugin = require('craco-less');
module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {"@primary-color": "#24B06C"},  // 修改主题色，
                        javascriptEnabled: true
                    }
                }
            }
        }
    ]
};
