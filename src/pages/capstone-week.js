import React from 'react';
import { graphql  } from 'gatsby';

import Layout from '../components/layout';

import genLinks from '../utils/genLinks';


export default({ data, location }) => {
    
  const { week1  } = genLinks(data.allMarkdownRemark.edges);


    return (
        <Layout
          centerContent={true} 
          pageTitle="Capstone Week" 
          location={location} 
          crumbLabel={"Capstone Week"}>
            <h1>Capstone Week</h1>
            <main>
              { week1 }
            </main>
        </Layout>
    );
}

export const query = graphql`
query {
    allMarkdownRemark (
          filter: {frontmatter: {track: {eq: "Capstone Week"}, 
          type: {eq: "homepage"}}}
            sort: {fields:  [frontmatter___week, frontmatter___day]}
        ){
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            track
            title
            week
            day
            type
            topics
          }
        }
      }
    }
  }
`;
