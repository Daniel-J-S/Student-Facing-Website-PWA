import React from 'react';
import { graphql  } from 'gatsby';

import Layout from '../components/layout';

import genLinks from '../utils/genLinks';


export default({ data, location }) => {
    
  const { week1, week2 } = genLinks(data.allMarkdownRemark.edges);


    return (
        <Layout
           
          pageTitle="React Fundamentals" 
          location={location} 
          crumbLabel={"React Fundamentals"}>
            <h1>React Fundamentals</h1>
            <main>
              <h2>Week 1</h2>  
              { week1 }
              <br />
              <hr />
              <br />
              <h2>Week 2</h2>  
              { week2 }
              {/* Uncomment to unlock additional weeks
              <br />
              <hr />
              <br />
              <h2>Project Week</h2>  
              { week3 } 
              */}
            </main>
        </Layout>
    );
}

export const query = graphql`
query {
    allMarkdownRemark (
          filter: {frontmatter: {track: {eq: "React Fundamentals"}, 
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
