module.exports = {
  flags: {
    DEV_SSR: false,
    FAST_DEV: false,
    PRESERVE_WEBPACK_CACHE: false,
    PRESERVE_FILE_DOWNLOAD_CACHE: false,
    PARALLEL_SOURCING: false,
    FUNCTIONS: false
  },
  siteMetadata: {
    title: `Thomas & the Unicorn`,
    author: {
      name: `The Unicorn`,
      summary: `a mystical being of great imaginings.`
    },
    description: `A rock opera`,
    siteUrl: `https://gatsbystarterblogsource.gatsbyjs.io/`,
    social: {
      twitter: `unioliviaart`
    }
  },
  plugins: [
    `gatsby-plugin-image`, {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/songs`,
        name: `song`
      }
    }, {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/uploads`,
        name: 'uploads'
      }
    }, {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    }, {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630
            }
          }, {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`, {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Thomas & the Unicorn`,
        short_name: `Unicorn`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/unicorn-icon.png`
      }
    },
    `gatsby-plugin-react-helmet`,
    // `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
