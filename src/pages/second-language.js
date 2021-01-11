import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';

import styles from '../styles/course-content-display.module.scss';


export default({ data, location }) => {
    
   const { allMarkdownRemark } = data;

    const weekOneLessons = allMarkdownRemark.edges.filter(({ node }) => 
      node.frontmatter.week === 1
      ).map(({ node }) =>
        <Link to={node.fields.slug}>
          <h2 className={styles.dayTitle} key={node.fields.id}>Day {node.frontmatter.day}<small className={styles.smallText}> - {node.frontmatter.topics}</small></h2>
        </Link> 
    );
      const weekTwoLessons = allMarkdownRemark.edges.filter(({ node }) => 
        node.frontmatter.week === 2
        ).map(({ node }) =>
          <Link to={node.fields.slug}>
            <h2 className={styles.dayTitle} key={node.fields.id}>Day {node.frontmatter.day}<small className={styles.smallText}> - {node.frontmatter.topics}</small></h2>
          </Link> 
      );
      
      
      const weekThreeLessons = allMarkdownRemark.edges.filter(({ node }) => 
        node.frontmatter.week === 3
        ).map(({ node }) =>
          <h2 className={styles.dayTitle} key={node.fields.id}>Day {node.frontmatter.day}<small className={styles.smallText}> - {node.frontmatter.topics}</small></h2>
      );
      
      const weekFourLessons = allMarkdownRemark.edges.filter(({ node }) => 
        node.frontmatter.week === 4
        ).map(({ node }) =>
          <Link to={node.fields.slug}>
            <h2 className={styles.dayTitle} key={node.fields.id}>Day {node.frontmatter.day}<small className={styles.smallText}> - {node.frontmatter.topics}</small></h2>
          </Link> 
      );

      const weekFiveLessons = allMarkdownRemark.edges.filter(({ node }) => 
        node.frontmatter.week === 5
        ).map(({ node }) =>
          <h2 className={styles.dayTitle} key={node.fields.id}>Day {node.frontmatter.day}<small className={styles.smallText}> - {node.frontmatter.topics}</small></h2>
        );

    return (
        <Layout
          centerContent={true} 
          pageTitle="Second Language" 
          location={location} 
          crumbLabel={"Second Language"}>
            <h1>Second Language</h1>
            <main>
              <h2>Week 1</h2>  
              { weekOneLessons }
              <br />
              <hr />
              <br />
              <h2>Week 2</h2>  
              { weekTwoLessons }
              <br />
              <hr />
              <br />
              <h2>Holiday Week</h2>  
              { weekThreeLessons }
              <br />
              <hr />
              <br />
              <h2>Week 4</h2>  
              { weekFourLessons }  
              <br />
              <hr />
              <br />
              <h2>Week 5</h2>  
              { weekFiveLessons }  
            </main>
        </Layout>
    );
}

export const query = graphql`
query {
    allMarkdownRemark (
          filter: {frontmatter: {track: {eq: "Second Language"}, 
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
