import React from 'react';
import { Link } from 'gatsby';
import * as styles from '../styles/course-content-display.module.scss';

const blanks = [
    'Project 1', 
    'Project 2', 
    'Project 3', 
    'Project 4', 
    'Project Presentations', 
    'Project 3 Planning & Approvals', 
    'Locked',
    'Holiday',
    'Intro to JS Objects and Classes',
    'JavaScript Arrays, Functions & Scope',
    'Intro to JavaScript',
];

export default function genLinks(data) {
    const lessonData = {};
    let currentWeek = '';
     data.forEach(function({ node }) {
       currentWeek = node.frontmatter.week;
        lessonData[`week${node.frontmatter.week}`] = [
          ...data.filter(({ node }) => 
          node.frontmatter.week === currentWeek).map(function({ node }) {
            return !blanks.includes(node.frontmatter.topics) ?
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