import React from 'react';
import { graphql } from 'gatsby';
import Head from '../components/head';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb';

export default ({ data, location }) => {
    const { allMarkdownRemark } = data;

    const html = allMarkdownRemark.edges[0].node.html;
    return (
        <>
        <Head pageTitle="Course Details"/>
            <div style={{margin: '1rem 0 1.5rem 0'}}>
                <Breadcrumb 
                    location={location} 
                    crumbLabel={'Course Details'}
                    crumbStyle={{ color: '#000' }}
                    crumbActiveStyle={{ color: 'crimson' }} 
                />
        </div>
        <main dangerouslySetInnerHTML={{__html: html}} />
    </>
    );

}

export const query = graphql`
    query {
        allMarkdownRemark (
        filter: { fileAbsolutePath: {regex : "\/course-details/"} }
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
