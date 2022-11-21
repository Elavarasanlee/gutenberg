import React from 'react';
import GenreCards from "../genre-cards/GenreCards";
import genreList from "../../data/genres.json";
import __GC from "../../config/GlobalConstants";
import { useTranslation } from 'react-i18next';

function Home() {
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <div id="site-main-header"
                 className="site-hero-section min-h-[25vh] px-8 md:px-44 pt-12 pb-4 text-justify">
                <h1>{t('site-name')}</h1>
                <p className="font-bold">
                    {t('site-description')}
                </p>
            </div>
            <div className="px-8 md:px-44 pt-8">
                <div className="grid md:grid-cols-2 sm:grid-cols-1 md:gap-x-16 gap-y-4">
                    {
                        genreList.map((genre, i) => {
                            return <GenreCards genre={genre} theme={__GC.THEME} key={i}/>
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    );
}

export default Home;
