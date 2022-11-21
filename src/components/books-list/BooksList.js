import React, {useCallback, useEffect, useState} from 'react';
import __GC from "../../config/GlobalConstants";
import {Link, useParams} from "react-router-dom";
import {Alert} from "@mui/material";
import {debounce} from "underscore";
import {getURLParam, transformResponseToJSON} from "../../utilities/helpers";

import SearchBar from "../search-bar/SearchBar";
import BookListGrid from "./BookListGrid";
import {bookListTransformer} from "./BookListHelpers";
import {fetchBooksList} from "./BooksListService";

function BooksList() {
    const [searchInput, setSearchInput] = useState("");
    const [booksList, setBooksList] = useState([]);
    const [bookListPageInfo, setBookListPageInfo] = useState({hasMore: true, count: 10000});
    const [error, setError] = useState({"message": "", "show": false});

    const {genreType} = useParams();
    const imgBasePath = `/assets/images/${__GC.THEME}`;

    const resetError = useCallback((e) => {
        setError({"message": "", "show": false});
        if(e) {
            toggleLazyLoading(false);
        }
    }, []);

    const alertBanner = (<Alert variant="filled" severity="error" className='my-8'
                                onClose={resetError}>{error.message}</Alert>);

    const getBooksList = useCallback(({genreType, page, search}) => {
        resetError('');
        toggleLazyLoading(true);
        fetchBooksList({genreType, page, search})
            .then(transformResponseToJSON)
            .then(bookListResponseHandler)
            .catch((error) => {
                setError({"message": error, "show": true});
            });
    }, [resetError]);

    const searchForBooksBy = useCallback((filter) => {
        setBooksList([]);
        getBooksList({genreType, search: encodeURIComponent(filter) || null});
    }, [getBooksList, genreType]);

    const initSearch = useCallback(debounce(s => searchForBooksBy(s), 500), [searchForBooksBy]);

    const searchInputChangeHandler = useCallback((e) => {
        setSearchInput(e.target.value);
        initSearch(e.target.value);
    }, [initSearch]);

    const clearSearchHandler = useCallback(() => {
        setBooksList([]);
        setSearchInput("");
        getBooksList({genreType});
    }, [genreType, getBooksList]);

    useEffect(() => {
        getBooksList({genreType});
    }, [getBooksList, genreType]);

    function bookListResponseHandler(booksData) {
        const {count, next, results: booksList, hasMore = (next !== null)} = booksData;
        setBookListPageInfo((prev) => {
            return {...prev, count, next, hasMore};
        });
        setBooksList((prev) => {
            return [...prev].concat(booksList.map(bookListTransformer));
        });
    }

    function loadNext() {
        let urlParams = getURLParam(bookListPageInfo.next);
        getBooksList({genreType, page: urlParams.get('page'), search: urlParams.get('search')});
    }

    function toggleLazyLoading(hasMore) {
        setBookListPageInfo((prev) => {
            return {...prev, hasMore};
        });
    }

    return (
        <div className="mx-8 md:mx-44 mt-2">
            <div className="sticky top-0">
                <h2 className="uppercase">
                    <Link to="/home">
                        <img src={`${imgBasePath}/Back.svg`} alt="<"
                             className="mx-2 w-7 h-7 inline-block"/> {genreType}
                    </Link>
                </h2>
                <SearchBar imgBasePath={imgBasePath} searchInput={searchInput}
                           searchHandler={searchInputChangeHandler} clearSearchHandler={clearSearchHandler} />
                { error.show ? alertBanner : '' }
            </div>
            <BookListGrid loadNext={loadNext} bookListPageInfo={bookListPageInfo} booksList={booksList}
                          booksListHasError={error.show} />
        </div>
    );
}

export default BooksList;
