import {pluck} from "../../utilities/helpers";
import {uniqueId} from "underscore";

const extractFormatLinks = (bookInfo) => {
    let viewableFormatLinks = {html: "", pdf: "", txt: ""},
        formats = bookInfo.formats,
        viewableFormats = Object.keys(formats).filter((k) => {
            let isZipFile = formats[k].endsWith(".zip"), isMatch = false;
            if(isZipFile) return isMatch;
            if(k.indexOf("text/html") > -1) {
                viewableFormatLinks.html = formats[k];
                isMatch = true;
            } else if(k.indexOf("application/pdf") > -1) {
                viewableFormatLinks.pdf = formats[k];
                isMatch = true;
            } else if(k.indexOf("text/plain") > -1) {
                viewableFormatLinks.txt = formats[k];
                isMatch = true;
            }
            return isMatch;
        });
    const coverPic = formats["image/jpeg"];
    const link = (viewableFormats.length) ?
        (viewableFormatLinks.html || viewableFormatLinks.pdf || viewableFormatLinks.txt) : "";
    return {coverPic, link};
};

const bookListTransformer = (bookInfo) => {
    const authorNames = pluck(bookInfo.authors, "name").join(", "),
        {id, title} = bookInfo,
        {coverPic, link} = extractFormatLinks(bookInfo);
    return {id: `${uniqueId('book_')}_${id}_${Date.now()}`, coverPic, title, authorNames, link};
};

export {extractFormatLinks, bookListTransformer};
