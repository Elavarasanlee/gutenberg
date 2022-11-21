import React, {useState} from 'react';
import Loader from "../../utilities/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import {Alert, Snackbar} from "@mui/material";

function BookListGrid({loadNext, bookListPageInfo, booksList, booksListHasError}) {
    const [showWarning, setShowWarning] = useState(false);
    const endMessage = (
        <p className="text-center"><b>That's all folks!</b></p>
    );
    const bookLinkClickHandler = (link, e) => {
        if(link) return ;
        e.preventDefault();
        setShowWarning(true);
    };
    const alertCloseHandler = () => {
        setShowWarning(false);
    };

    return (
        <React.Fragment>
            <InfiniteScroll next={loadNext} hasMore={bookListPageInfo.hasMore}
                            loader={<Loader show={!booksListHasError}/>}
                            dataLength={booksList.length} endMessage={endMessage}>
                <div className="grid grid-cols-3 gap-x-1 gap-y-3 md:grid-cols-6 md:gap-x-2 md:gap-y-6">
                    {
                        booksList.map(({id, coverPic, title, authorNames, link}) => {
                            return (
                                <div className="book-card w-[114px]" key={id}>
                                    <a href={link} target="_blank" rel="noreferrer"
                                       onClick={bookLinkClickHandler.bind(this, link)}>
                                        <img src={coverPic} alt={title}
                                             className="h-[162px] w-[100%] rounded-lg shadow-[0_2px_5px_0_rgba(211,209,238,0.5)]" />
                                    </a>
                                    <div className="name uppercase">{title}</div>
                                    <div className="author-name">{authorNames}</div>
                                </div>
                            );
                        })
                    }
                </div>
            </InfiniteScroll>
            <Snackbar open={showWarning} autoHideDuration={3000} onClose={alertCloseHandler}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert variant="filled" severity="error">No viewable version available!</Alert>
            </Snackbar>
        </React.Fragment>
    );
}

export default BookListGrid;
