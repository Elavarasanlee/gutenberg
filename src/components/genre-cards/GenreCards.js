import React from 'react';
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';

function GenreCards({genre, theme}) {
    const { t } = useTranslation();
    const imgBasePath = `/assets/images/${theme}`;
    return (
        <Link to={`/books/${genre.type}`}
              className="rounded h-[50px] p-2.5 bg-[rgba(255,255,255,0.9)] shadow-[0_2px_5px_0_rgba(211,209,238,0.5)]
              text-xl text-left uppercase font-bold">
            <img src={`${imgBasePath}/${genre.icon}`} alt=""
                 className="mx-2 mt-1 w-5 h-5 float-left inline-block"/>
            {t(genre.type)}
            <img src={`${imgBasePath}/Next.svg`} alt=">"
                 className="mx-2 mt-1 w-5 h-5 float-right inline-block"/>
        </Link>
    );
}

export default GenreCards;
