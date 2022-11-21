import React from 'react';

function SearchBar({imgBasePath, searchInput, searchHandler, clearSearchHandler}) {
    return (
        <div id="search-component" className="my-8">
            <label className="relative block">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                    <img src={`${imgBasePath}/Search.svg`} alt="" className="inline-block"/>
                </span>
                <input type="text" name="q" placeholder="Search" autoComplete="off" value={searchInput}
                       className="search-input border py-2 text-sm rounded px-8 appearance-none w-full block
                           font-bold text-base focus:outline-none" onChange={searchHandler} />
                {
                    (searchInput) ?
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2" onClick={clearSearchHandler}>
                            <img src={`${imgBasePath}/Cancel.svg`} alt="" className="inline-block"/>
                        </span> : ''
                }
            </label>
        </div>
    );
}

export default React.memo(SearchBar);
