import React from 'react';
import { Link } from 'gatsby';
import Head from '../components/head';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb';

export default ({ location }) => {
    return (
        <>
        <Head pageTitle="Page Not Found"/>
          <div style={{margin: '1rem 0 1.5rem 0'}}>
              <Breadcrumb 
                  location={location} 
                  crumbLabel={'Page Not Found'}
                  crumbStyle={{ color: '#000' }}
                  crumbActiveStyle={{ color: 'crimson' }} 
              />
          </div>
            <main>
                <h1>Not Found</h1>
                <p>Sorry the page you requested was not found</p>
                <Link to="/">Go Back Home</Link>
            </main>
        </>
    );
}