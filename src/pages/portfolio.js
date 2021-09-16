import React from 'react';
import { graphql } from 'gatsby';
import Head from '../components/head';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb';


const Portfolio = ({ data, location }) => {
    const { allMarkdownRemark } = data;

    const html = allMarkdownRemark.edges[0].node.html;

    return (
        <> 
            <Head pageTitle="Portfolio"/>
            <div style={{margin: '1rem 0 5rem 0'}}>
              <Breadcrumb 
                  location={location} 
                  crumbLabel="Portfolio"
              />
            </div>
            <main dangerouslySetInnerHTML={{__html: html}} />
        </>
    );

}

export const query = graphql`
    query {
        allMarkdownRemark (
        filter: { fileAbsolutePath: {regex : "\/portfolio/"} }
        ) {
            edges {
                node {
                    frontmatter {
                    title
                    }
                    html
                }
            }
        }
    }
`;

export default Portfolio;
