import React, {Component} from  'react';
import {Link} from "react-router-dom";
import ArticleList from '../../component/ArticleList';
import Pagination from "../../component/ArticleList/Pagination";

const HomePage = ({loadArticles, articlesList,onClick}) => {



    const passed_props_article = {
        articlesList
        , loadArticles
        , onClick
    };

    if(!articlesList.status){
        loadArticles(1)

    }
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
                            currentPage: articlesList.currentPage
                        }} />
                    </div>
                </div>
            </div>
        )
    }
    else {

        return (
            <span>Article did not load</span>
        )
    }
}

export default HomePage;