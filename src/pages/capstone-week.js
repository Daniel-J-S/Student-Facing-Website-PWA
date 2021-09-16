import React from 'react';
import { graphql  } from 'gatsby';
import genLinks from '../utils/genLinks';
import Head from '../components/head';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb';

const CapstoneWeek = ({ data, location }) => {
    
  const { week1  } = genLinks(data.allMarkdownRemark.edges);
    return (
        <>
        <Head pageTitle="Capstone Week"/>
        <div style={{margin: '1rem 0 5rem 0'}}>
          <Breadcrumb 
            location={location} 
            crumbLabel="Capstone Week"  
          />
        </div>
        <h1>Capstone Week</h1>
        <main>
          { week1 }
        </main>
        </>
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

export default CapstoneWeek;
