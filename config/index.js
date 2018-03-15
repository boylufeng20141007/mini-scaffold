/*
 * @Author: luxlu 
 * @Date: 2018-03-14 21:06:02 
 * @Last Modified by: luxlu
 * @Last Modified time: 2018-03-15 17:03:35
 */

module.exports = env => {
    if( env === 'production' ) {
        return {
            publicPath: '/',
            NODE_EVN: 'production'
        };
    }else {
        return {
            publicPath: '/',
            NODE_EVN: 'development'
        };
    }
};