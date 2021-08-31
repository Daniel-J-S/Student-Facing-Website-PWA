import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';

export default ({ location }) => {
    return (
        <Layout 
            pageTitle="Page Not Found"
            location={location} 
            crumbLabel={"Page Not Found"}>
            <main>
                <h1>Not Found</h1>
                <p>Sorry the page you requested was not found</p>
                <Link to="/">Go Back Home</Link>
            </main>
        </Layout>
    );
}