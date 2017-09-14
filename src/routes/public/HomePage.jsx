import React, {Component} from  'react';
import {Link} from "react-router-dom";
import ArticleList from '../../component/ArticleList';
import Pagination from "../../component/ArticleList/Pagination";

const HomePage = ({loadArticles, articlesList, onClick, loadArticle,location}) => {


    const passed_props_article = {
        articlesList
        , onClick
        , loadArticles
        , loadArticle
    };

    if (articlesList.status === 0) {
        return (
            <div className="container">
                <span>Articles Not Initialised</span>
            </div>
        )
    } else if (articlesList.status === 1) {
        return (
            <div className="container">
                <span>Articles are Loading</span>
            </div>
        )
    } else if (articlesList.status === 2) {
        if (articlesList.currentPage > 0) {

            return (
                <div className="">
                    <div className="container">
                        <ArticleList {...passed_props_article} />
                    </div>
                    <div className=" row">
                        <div className="col-xs-12" style={{textAlign: 'center'}}>
                            <Pagination {...{
                                data: articlesList.pages[articlesList.currentPage].pagination,
                                last: articlesList.lastPage,
                                paginateTo: loadArticles,
                                currentPage: articlesList.currentPage,
                                location
                            }} />
                        </div>
                    </div>
                </div>
            )
        }
        else {

            return (
                <div className="container">
                    <span>Article did not load</span>
                </div>
            )
        }
    }
    else {
        return (
            <div className="container">
                <span>Errors</span>
            </div>
        )
    }

}

export default HomePage;