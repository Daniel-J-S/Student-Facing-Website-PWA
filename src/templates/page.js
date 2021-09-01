import React from 'react';
import { graphql } from 'gatsby';
import Head from '../components/head';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb';




export default ({ data, location }) => {
    const { markdownRemark } = data;
    return (
        <>
        <Head pageTitle={markdownRemark.frontmatter.title} />
        <div style={{margin: '1rem 0 1.5rem 0'}}>
            <Breadcrumb 
                location={location} 
                crumbLabel={markdownRemark.frontmatter.title} 
                crumbStyle={{ color: '#000' }}
                crumbActiveStyle={{ color: 'crimson' }} 
            />
        </div>
            <main dangerouslySetInnerHTML={{ __html: markdownRemark.html }}/>
        </>
    );
};

export const query = graphql`
    query($slug: String!) {
        markdownRemark (fields: { slug: { eq: $slug }}) {
            html 
            frontmatter {
                title
            }
        }
    }
`;