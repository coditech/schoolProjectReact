import React from "react";
import Article from './Article';


const Articles = ({articlesList,loadArticles,onClick }) => {

    if (articlesList.currentPage > 0) {
        return (
            <div>
                {

                    articlesList.pages[articlesList.currentPage].articlesList.map(
                        function (article) {

                            return (
                                <div key={article.id} className="col-sm-6">
                                    <Article key={article.id} {...{article, onClick}}/>
                                </div>
                            )

                        }
                    )
                }
            </div>
        )
    }else {
        // loadArticles(1);
        return <h2>ww</h2>
    }
}

export default Articles;