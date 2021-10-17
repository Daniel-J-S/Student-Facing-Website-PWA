import React from 'react';
import { graphql } from 'gatsby';
import genLinks from '../utils/genLinks';

import Head from '../components/head';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb';


const FrontendFundamentals = ({ data, location }) => {

   const { week1 } = genLinks(data.allMarkdownRemark.edges);
       
    return (
        <>
          <Head pageTitle="Frontend Fundamentals"/>
          <div style={{margin: '1rem 0 5rem 0'}}>
              <Breadcrumb 
                  location={location} 
                  crumbLabel="Frontend Fundamentals"
              />
          </div>
            <h1>Frontend Fundamentals</h1>
            <main>
              <h2>Week 1</h2>  
              { week1 }
            </main>
        </>
    );
};

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


export default FrontendFundamentals;