import React, { Fragment } from 'react';
import { useStaticQuery, graphql } from 'gatsby'

import NavBar from '../responsiveNav';
import Footer from '../footer';
import Search from '../search';

import '../../styles/base.scss';

import styles from './layout.module.scss';

export default ({ children  }) => {

        const { site } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    navigationLinks {
                        title
                        slug
                    }
                    homeworkSubmissionLink {
                        title
                        href
                    }
                }
            }
        }
    `);

    return (
        <Fragment>
            <div className={styles.outerContainer}>
                <NavBar 
                    title={site.siteMetadata.title}
                    navigationLinks={site.siteMetadata.navigationLinks}
                    homeworkSubmissionLink={site.siteMetadata.homeworkSubmissionLink}
                />
                <div 
                    className={styles.innerContainer}>
                    <Search />
                    { children }
                </div>
                <Footer />
            </div>
        </Fragment>
    );
}