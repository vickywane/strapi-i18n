const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const productsQuery = await graphql(`
    query getData {
      strapi {
        categories(locale: "all") {
          locale
          id
          name
          slug
           localizations {
             locale
          }
          products {
            locale
            title
            description
            price
            slug
            image {
              provider
              width
            }
          }
        }
      }
    }
  `);

  // Template to create dynamic pages from.
  const productsTemplate = path.resolve(`src/pages/products.js`);

  productsQuery.data.strapi.categories.forEach(
    ({ title, id, products, price, slug, name, localizations, locale }) =>
    {
        if (localizations.length > 0) {
            localizations.forEach((data) => {
                data.locale
                    return createPage({
                        path: `product/${id}/${data.locale.toLowerCase()}`,
                        component: productsTemplate,
                        context: { slug, name, title, id, price, products, locale : data.locale, localizations },
                    })
            })
        }

        return createPage({
            path: `product/${id}/${locale}`,
            component: productsTemplate,
            context: { slug, name, title, id, price, products, locale, localizations },
        })
    }
  );
};
