import React, { useState, useRef } from 'react';
import { Link } from 'gatsby';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits, SearchBox, connectStateResults, Configure, Highlight } from 'react-instantsearch-dom';
import logo from '../../../static/ga-logo.svg';


export default (props) => {
        const [searchState, setSearchState ] = useState({});
        const searchClient = algoliasearch('T0NZ90NSF1', '2df3a7f3f34749616a0a5cafe81cccc5');

        const Results = connectStateResults(({ searchState, searchResults, children }) => {
            if(searchState && searchState.query && children) {
                return children;
            } else {
                return null;
            }
        });

        const Hit = useRef(({ hit }) => {
            const handleClick = () => {
                setSearchState({...searchState, query: ''})
            };
            return (
                <div style={{display: "flex", alignItems: "center" }}>
                    <img style={{ height: 25, margin: "0px 5px 0px 0px" }} src={logo} alt={hit.title} />
                    <Link to={hit.url} onClick={handleClick}>
                        <Highlight hit={hit} attribute="title" />
                    </Link>
                </div>
            );
        });

    return (
        <InstantSearch
            searchClient={searchClient}
            indexName={'netlify_88cb8447-bce7-4d16-826f-a0098f34d57f_master_all'}
            searchState={searchState}
            onSearchStateChange={setSearchState}
            >
            <SearchBox />
            <Results>
                <Hits 
                    hitComponent={Hit.current}
                />
            </Results>
            <Configure 
                hitsPerPage={5}
            />
        </InstantSearch>
    );
};