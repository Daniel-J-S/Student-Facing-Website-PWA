import React from 'react';
import { graphql  } from 'gatsby';
import genLinks from '../utils/genLinks';

import Head from '../components/head';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb';


const ReactFundamentals = ({ data, location }) => {
    
  const { week1 } = genLinks(data.allMarkdownRemark.edges);


    return (
        <>
          <Head pageTitle="React Fundamentals"/>
          <div style={{margin: '1rem 0 1.5rem 0'}}>
              <Breadcrumb 
                  location={location} 
                  crumbLabel={'React Fundamentals'}
                  
                   
              />
          </div>
            <h1>React Fundamentals</h1>
            <main>
              <h2>Week 1</h2>  
              { week1 }
              {/* Commented Out To Lock Content
              <br />
              <hr />
              <br />
              <h2>Week 2</h2>  
              { week2 }
              <br />
              <hr />
              <br />
              <h2>Project Week</h2>  
              { week3 }  */}
            </main>
        </>
    );
};

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


export default ReactFundamentals;