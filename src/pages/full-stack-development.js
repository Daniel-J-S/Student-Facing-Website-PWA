import React from 'react';
import { graphql } from 'gatsby';
import genLinks from '../utils/genLinks';

import Head from '../components/head';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb';


const FullstackDevelopment = ({ data, location }) => {
  

   const { week1, week2 } = genLinks(data.allMarkdownRemark.edges);


    return (
        <>
          <Head pageTitle="Full Stack Development"/>
            <div style={{margin: '1rem 0 5rem 0'}}>
              <Breadcrumb 
                  location={location} 
                  crumbLabel="Full Stack Development"
              />
            </div>
            <h1>Full Stack Development</h1>
            <main>
              <h2>Week 1</h2>
              { week1 }
              <br />
              <hr />
              <br />
              <h2>Week 2</h2>  
              { week2 }
            </main>
        </>
    );
};

export const query = graphql`
query {
    allMarkdownRemark (
          filter: {frontmatter: {track: {eq: "Full-Stack Development"}, 
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

export default FullstackDevelopment;