import React from 'react';
import { Link } from 'gatsby';
import styles from '../styles/course-content-display.module.scss';

export default function genLinks(data) {
    const lessonData = {};
    let currentWeek = '';
     data.forEach(function({ node }) {
       currentWeek = node.frontmatter.week;
        lessonData[`week${node.frontmatter.week}`] = [
          ...data.filter(({ node }) => 
          node.frontmatter.week === currentWeek).map(function({ node }) {
            return node.frontmatter.topics !== 'Project 1' ?
            <Link to={node.fields.slug} key={node.id}>
              <h2 className={styles.dayTitle}>Day {node.frontmatter.day}<small className={styles.smallText}> - {node.frontmatter.topics}</small></h2>
            </Link>
            : 
            <h2 className={styles.dayTitle} key={node.id}>Day {node.frontmatter.day}<small className={styles.smallText}> - {node.frontmatter.topics}</small></h2>
          })
        ]
     });
     return lessonData;
}