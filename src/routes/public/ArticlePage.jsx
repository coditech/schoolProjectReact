import React from 'react';
import ArticlePost from "../../component/ArticlePost";


const ArticlePage = ({match, loadArticle, articleList}) => {

    if (!articleList.status) {

        if (!match.params.id) {

        } else {
            loadArticle(match.params.id);
        }
    }

    // article, nextArticle, previousArticle


    if (articleList.article[match.params.id]) {
        const passedProps = {
            article: articleList.article[match.params.id].article
            , nextArticle: articleList.article[match.params.id].nextArticle
            , previousArticle: articleList.article[match.params.id].previousArticle
            , loadArticle
        }
        return (

            <ArticlePost {...passedProps }/>
        )
    } else {

        return (<h2>Hello </h2>)
    }


}


export default ArticlePage;