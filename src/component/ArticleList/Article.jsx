import React from 'react';
import {Link} from 'react-router-dom';
import '../../styles/Article.styl';
const Article = ({article, onClick}) => {


    if (!article) {
        article = {
            featuredImage: 'localhost:8000/images/4.jpg',
            title: 'Hello world',
            text: 'Hello world',
            link: '/article/2'
        };
    }

    return (
        <div className="thumbnail">
            <img className=" img-thumbnail img-responsive" src={ article.featuredimage}/>
            <div className=" caption">
                <p>{article.text.substring(0, 120)}</p>
                <h2 className="textimg">
                    <span className="spantext">{article.title}</span>
                </h2>

                <Link
                    className=""
                    role="button"
                    to={'/article/' + article.id}>
                    <button className=" btn btn-default btn-block text-uppercase text-success" type=" button">Read
                        more
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Article;