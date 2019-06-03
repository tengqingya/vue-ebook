// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api/v1/public/homepage': {
        target: 'http://ebook.meizu.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/public/homepage': '/api/v1/public/homepage'
        }
      },
      '/api/v1/public/search/hotword': {
        target: 'http://ebook.meizu.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/public/search/hotword': '/api/v1/public/search/hotword'
        }
      },
      '/api/v1/public/search/whole': {
        target: 'http://ebook.meizu.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/public/search/whole': '/api/v1/public/search/whole'
        }
      },
      '/api/v1/public/book/detail': {
        target: 'http://ebook.meizu.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/public/book/detail': '/api/v1/public/book/detail'
        }
      },
      '/oauth/token': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/oauth/token': '/oauth/token'
        }
      },
      '/api/v1/public/book/comment/get': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/public/book/comment/get': '/api/v1/public/book/comment/get'
        }
      },
      '/api/v1/public/bookdetail/recommend': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/public/bookdetail/recommend': '/api/v1/public/bookdetail/recommend'
        }
      },
      '/api/v1/public/book/catalog': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/public/book/catalog': '/api/v1/public/book/catalog'
        }
      },
      '/api/v1/oauth/user/sign_in': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/oauth/user/sign_in': '/api/v1/oauth/user/sign_in'
        }
      },
      '/api/v1/oauth/user/sign_in_info': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/oauth/user/sign_in_info': '/api/v1/oauth/user/sign_in_info'
        }
      },
      '/api/v1/public/booklist/detail': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/public/booklist/detail': '/api/v1/public/booklist/detail'
        }
      },
      '/api/v1/public/chart/list': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/public/chart/list': '/api/v1/public/chart/list'
        }
      },
      '/api/v1/public/chart/detail': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/public/chart/detail': '/api/v1/public/chart/detail'
        }
      },
      '/api/v1/public/category/list': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/public/category/list': '/api/v1/public/category/list'
        }
      },
      '/api/v1/public/category/detail': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/public/category/detail': '/api/v1/public/category/detail'
        }
      },
      '/api/v1/public/special/groups': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/public/special/groups': '/api/v1/public/special/groups'
        }
      },
      '/api/v1/public/limit/groups': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/public/limit/groups': '/api/v1/public/limit/groups'
        }
      },
      '/api/v1/public/special/group/books': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/public/special/group/books': '/api/v1/public/special/group/books'
        }
      },
      '/api/v1/public/limit/group/books': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/public/limit/group/books': '/api/v1/public/limit/group/books'
        }
      }
      ,
      '/api/v1/public/limit/book/wish': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/public/limit/book/wish': '/api/v1/public/limit/book/wish'
        }
      }
      ,
      '/api/v1/public/recharge/promotion_info': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/public/recharge/promotion_info': '/api/v1/public/recharge/promotion_info'
        }
      }
      ,
      '/api/v1/oauth/user/unread/message/count': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/oauth/user/unread/message/count': '/api/v1/oauth/user/unread/message/count'
        }
      }
      ,
      '/api/v1/oauth/user/favorite/count': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/oauth/user/favorite/count': '/api/v1/oauth/user/favorite/count'
        }
      }
      ,
      '/api/v1/oauth/user/book/currency': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/oauth/user/book/currency': '/api/v1/oauth/user/book/currency'
        }
      }
      ,
      '/api/v1/oauth/user/book/currency/detail': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/oauth/user/book/currency/detail': '/api/v1/oauth/user/book/currency/detail'
        }
      }
      ,
      '/api/v1/oauth/user/purchase/book/count': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/oauth/user/purchase/book/count': '/api/v1/oauth/user/purchase/book/count'
        }
      }
      ,
      '/api/v1/oauth/user/purchase/list': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/oauth/user/purchase/list': '/api/v1/oauth/user/purchase/list'
        }
      },
      '/api/v1/oauth/user/favorite/ids': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/oauth/user/favorite/ids': '/api/v1/oauth/user/favorite/ids'
        }
      },
      '/api/v1/oauth/user/favorite/list': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/oauth/user/favorite/list': '/api/v1/oauth/user/favorite/list'
        }
      },
      '/api/v1/oauth/user/message/list': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/oauth/user/message/list': '/api/v1/oauth/user/message/list'
        }
      },
      '/api/v1/public/recharge/package/list': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/public/recharge/package/list': '/api/v1/public/recharge/package/list'
        }
      },
      '/api/v1/oauth/user/book/currency/bill': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/oauth/user/book/currency/bill': '/api/v1/oauth/user/book/currency/bill'
        }
      },
      '/api/v1/oauth/user/coupon/codes': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/oauth/user/coupon/codes': '/api/v1/oauth/user/coupon/codes'
        }
      },
      '/api/v1/oauth/shelf/books': {
        target: 'http://gen.meizu.com:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/oauth/shelf/books': '/api/v1/oauth/shelf/books'
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
