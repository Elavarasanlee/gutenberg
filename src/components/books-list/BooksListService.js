import __GC from "../../config/GlobalConstants";

export function fetchBooksList({genreType, page, search}) {
    let bookListAPI = `${__GC.BASE_URL}/books?mime_type=image&topic=${genreType}`;
    if(page) bookListAPI += `&page=${page}`;
    if(search) bookListAPI += `&search=${search}`;

    return fetch(bookListAPI);
}
