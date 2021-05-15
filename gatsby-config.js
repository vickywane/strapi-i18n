module.exports = {
  siteMetadata: {
    title: "i18n",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {  },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
          // Arbitrary name for the remote schema Query type
          typeName: "STRAPI",
          // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
          fieldName: "strapi",
          url: "http://localhost:1337/graphql",
      },
  },
  ],
};
