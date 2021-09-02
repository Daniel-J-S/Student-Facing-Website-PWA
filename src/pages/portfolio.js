import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';

const Portfolio = ({ data, location }) => {
    const { allMarkdownRemark } = data;

    const html = allMarkdownRemark.edges[0].node.html;

    return (
        <Layout  
            pageTitle={"Home"} 
            location={location} 
            crumbLabel={"Home"}>
            <main dangerouslySetInnerHTML={{__html: html}} />
        </Layout>
    );

};

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