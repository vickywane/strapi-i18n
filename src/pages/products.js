import React, { useState } from "react";
import { Cards, Item, Button, Image, Flex, Banner, Container } from "./styles";
import {graphql, Link, navigate} from 'gatsby'

import Header from "../components/header";
import Footer from "../components/footer";
import Layout from "../components/layout";

const shrinkText = (text, length) => {
  let txt = text.split(" ");

  if (txt.length < 7) {
    return text;
  }

  return [ ...txt.splice(0, length), '...' ].join(" ")
};

const Index = ({ pageContext, data }) => {
  const { name, localizations, id } = pageContext;
  const [ currentLang, setCurrentLang ] = useState("en")
  const { categories } = data.strapi

  return (
    <Layout>
      <Header />
      <Container>
        <Banner>
          <br />
          <h4 style={{ textAlign: "center" }}> {name} </h4>

          <p> Display products in:
            {categories[0].localizations.map(({ locale}) =>
                <Link to={`/product/${id}/${locale.toLowerCase()}`} >
                  <span style={{padding : "0 .5rem"}} > {locale} </span>
                </Link>
            )}
          </p>
        </Banner>
        <hr />

        <Cards>
          {categories.map(({products}) =>
                products.map(({ id, title, price, description }) => (
                    <Item key={id}>
                      <div>
                        <Image
                            src={
                              "https://res.cloudinary.com/dkfptto8m/image/upload/v1620468926/shirts.jpg"
                            }
                        />
                        <h5> {title} </h5>
                        <p style={{opacity : ".8"}} >{shrinkText(description, 4)} </p>

                        <Flex direction="row" justify="space-between">
                          <div>
                            <p style={{ textAlign: "left" }}> ${price} </p>
                          </div>

                          <div>
                            <Button>Buy Now</Button>
                          </div>
                        </Flex>
                      </div>
                    </Item>
                )))}


        </Cards>
        <Footer />
      </Container>
    </Layout>
  );
};

export const query = graphql`
        query fetchLocaleData($locale: String) {
          strapi {
            categories(locale: $locale) {
                localizations {
                    locale
                }
              products(limit:1) {
                title
                description
                price
              }
            }
          }
        }
`

export default Index;
