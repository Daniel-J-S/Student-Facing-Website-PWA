import React from 'react';
import { graphql } from 'gatsby';
import genLinks from '../utils/genLinks';

import Head from '../components/head';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb';


export default({ data, location }) => {

   const { week1 } = genLinks(data.allMarkdownRemark.edges);
       
    return (
        <>
          <Head pageTitle="Frontend Fundamentals"/>
          <div style={{margin: '1rem 0 1.5rem 0'}}>
              <Breadcrumb 
                  location={location} 
                  crumbLabel={'Frontend Fundamentals'}
                  crumbStyle={{ color: '#000' }}
                  crumbActiveStyle={{ color: 'crimson' }} 
              />
          </div>
            <h1>Frontend Fundamentals</h1>
            <main>
              <h2>Week 1</h2>  
              { week1 }
              {/* 
              <br />
              <hr />
              <br />
              <h2>Week 2</h2>  
              { week2 }
              <br />
              <hr />
              <br />
              <h2>Project Week</h2>  
              { week3 } */}
            </main>
        </>
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
