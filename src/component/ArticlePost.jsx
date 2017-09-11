import React from 'react';

const ArticlePost = ({article, nextArticle, previousArticle, loadArticle}) => {


    const formatDate = function (date) {
        const monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        const dates = new Date(date);
        const day = dates.getDate();
        const monthIndex = dates.getMonth();
        const year = dates.getFullYear();

        return monthNames[monthIndex] + ' / ' + day + ' / ' + year;
    };

    const RenderArticle = ({article, right}) => {

        let arrow_class = 'glyphicon-circle-arrow-left';
        if (right) {
            arrow_class = 'glyphicon-circle-arrow-right';
        }

        if (article) {
            return (
                <div className={ right ? 'col-md-6 col-sm-6 item article-right ' : 'col-md-6 col-sm-6 item'}>
                    <a href={'#/article/' + article.id } onClick={(e) => loadArticle(article.id) }>
                        <img className="img-responsive" src={article.featuredimage}/>
                    </a>
                    <h3 className="name">{article.title}</h3>
                    <p className="description">{article.content.substr(0, 100)}</p>
                    <a href={'#/article/' + article.id } onClick={(e) => loadArticle(article.id) } className="action"><i className={'glyphicon ' + arrow_class}/></a>
                </div>
            )
        }
    }


    return (

        <div key={article.id} className="article-dual-column container ">
            <div className="row">
                <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1">
                    <div className="intro">
                        <h1 className="text-center">{article.title} </h1>
                        <p className="text-center"><span className="date">{formatDate(article.date)} </span></p>
                        <img className="img-rounded img-responsive" src={article.featuredimage}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12">
                    <div className="text">
                        <p>
                            {article.content}
                        </p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-offset-1 col-md-10 col-md-offset-1 ">
                    <div className="row articles">

                        {previousArticle  ? <RenderArticle {...{article: previousArticle, right: false}} /> : null }
                        {nextArticle ? <RenderArticle {...{article: nextArticle, right: true}} /> : null }




                    </div>
                </div>
            </div>
        </div>
    )
}
export default ArticlePost;