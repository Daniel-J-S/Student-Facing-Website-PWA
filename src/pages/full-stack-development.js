import React from 'react';
import { graphql } from 'gatsby';
import genLinks from '../utils/genLinks';

import Head from '../components/head';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb';


export default({ data, location }) => {
  

   const { week1 } = genLinks(data.allMarkdownRemark.edges);


    return (
        <>
          <Head pageTitle="Full Stack Development"/>
            <div style={{margin: '1rem 0 1.5rem 0'}}>
              <Breadcrumb 
                  location={location} 
                  crumbLabel={'Full Stack Development'}
                  crumbStyle={{ color: '#000' }}
                  crumbActiveStyle={{ color: 'crimson' }} 
              />
            </div>
            <h1>Full Stack Development</h1>
            <main>
              <h2>Week 1</h2>
              { week1 }
              {/* Commented Out To Lock Content
              <br />
              <hr />
              <br />
              <h2>Week 2</h2>  
              { week2} */}
            </main>
        </>
    );
}

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
