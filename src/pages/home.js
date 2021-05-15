import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { FiCalendar, FiBook } from "react-icons/fi";
import moment from "moment";

import {
  Container,
  Flex,
  Banner,
  Cards,
  CategoryCtn,
} from "./styles";
import Header from "../components/header";
import Footer from "../components/footer";
import Layout from "../components/layout";

const Index = ({ pageContext }) => {
  const {strapi} = useStaticQuery(graphql`
    query fetchAllCourses {
      strapi {
        categories {
          id
          name
          created_at
          slug
          locale
          products { id }
        }
      }
    }
  `);

  return (
    <Layout>
      <Header />
      <Container>
        <Banner>
          <h4> STRAPI COURSE STORE </h4>
          <p> A Course Store With Support For Internationalization </p>
          <p>{JSON.stringify(pageContext)} </p>
        </Banner>
        <hr />

        <Cards >
          {strapi.categories.map(({ id, name, products, created_at, locale }) => (
            <CategoryCtn key={id}>
              <div>
                <Link to={`/product/${id}/${locale}`}>
                  <h5> {name} </h5>
                </Link>
                <Flex
                  direction="row"
                  style={{
                    opacity: ".8",
                  }}
                >
                  <div
                    style={{
                      marginRight: ".3rem",
                    }}
                  >
                    <FiCalendar size={19} />
                  </div>

                  <div>Added {moment(created_at).format("dddd mm yyyy")}</div>
                </Flex>
                <hr />
                <br />

                <Flex direction="row">
                  <div
                    style={{
                      marginRight: ".3rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FiBook size={19} />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {products.length} Courses Available
                  </div>
                </Flex>
              </div>
            </CategoryCtn>
          ))}
        </Cards>

        <Footer />
      </Container>
    </Layout>
  );
};

export default Index;
