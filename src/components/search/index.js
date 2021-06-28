import React from 'react';
import { Link } from 'gatsby';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits, SearchBox, connectStateResults, Configure } from 'react-instantsearch-dom';
import logo from '../../../static/ga-logo.svg';

const searchClient = algoliasearch('EN63E0VWF1', '1a4118739ef16db358f35a4c41a74917')

const Results = connectStateResults(({ searchState, searchResults, children }) => {
    if(searchState && searchState.query && children) {
        return children;
    } else {
        return null;
    }
});

const Hit = ({ hit }) => {
    return (
        <div style={{display: "flex", alignItems: "center" }}>
            <img style={{ height: 25, margin: 0 }} src={logo} alt={hit.title} />
            <Link to={hit.url}>{hit.title}</Link>
        </div>
    );
}


export default (props) => {
    return (
        <InstantSearch
            searchClient={searchClient}
            indexName={'netlify_6032fa58-ee1b-41d1-abaa-23668e9615c3_master_all'}
            >
            <SearchBox />
            <Results>
                <Hits 
                    hitComponent={Hit}
                />
            </Results>
            <Configure 
                hitsPerPage={5}
            />
        </InstantSearch>
    );
}