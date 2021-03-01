import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';

import genLinks from '../utils/genLinks';


export default({ data, location }) => {

   const { week1, week2, week3 } = genLinks(data.allMarkdownRemark.edges);

    return (
        <Layout
          centerContent={true} 
          pageTitle="Frontend Fundamentals" 
          location={location} 
          crumbLabel={"Frontend Fundamentals"}>
            <h1>Frontend Fundamentals</h1>
            <main>
              <h2>Week 1</h2>  
              { week1 }
              <br />
              <hr />
              <br />
              <h2>Week 2</h2>  
              { week2 }
              <br />
              <hr />
              <br />
              <h2>Project Week</h2>  
              { week3 }
              {/* 
              Locked for Now
              <br />
              <hr />
              <br />
              <h2>Presentations</h2>  
              { week4 } */}
            </main>
        </Layout>
    );
}

export const query = graphql`
query {
    allMarkdownRemark (
          filter: {frontmatter: {track: {eq: "Frontend Fundamentals"}, 
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
