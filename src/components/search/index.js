import React, { useState, useRef } from 'react';
import { Link } from 'gatsby';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits, SearchBox, connectStateResults, Configure, Highlight } from 'react-instantsearch-dom';
import logo from '../../../static/danieljs-logo.svg';


const Search = (props) => {
        const [searchState, setSearchState ] = useState({});
        const searchClient = algoliasearch('VAO62LD9P5', 'ff429d3a2c74d328b5a556cda718ab47');

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
                <div style={{display: 'flex', flexDirection: 'column' }}>
                    <Link to={hit.url} onClick={handleClick} style={{display: 'flex', alignItems: 'center'}}>
                        <img style={{ height: 25, margin: '0px 5px 0px 0px' }} src={logo} alt={hit.title} />
                        <Highlight hit={hit} attribute='title' />
                    </Link>
                    <p>{hit.content.slice(0, 125) + ' ...'}</p>
                </div>
            );
        });

    return (
        <InstantSearch
            searchClient={searchClient}
            indexName={'netlify_31f375b5-8a8a-4edf-a453-f68c610f6adc_master_all'}
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
                hitsPerPage={3}
            />
        </InstantSearch>
    );
};

export default Search;