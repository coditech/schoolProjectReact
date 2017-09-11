const factory = () => {

    const STATUS = {
        NONE: 0,
        LOADING: 1,
        READY: 2,
        ERROR: 3
    };

    const data = {
        publicData: {
            articleData: {
                articlesList: {
                    pages: [
                        {
                            pagination: []
                        }
                    ],
                    currentPage: -1,
                    status: STATUS.NONE
                }
                , articleList: {
                    article: [],
                    currentArticle: -1,
                    status: STATUS.NONE
                }

            }

        }
        , currentPage: 'home'
        , auth: {}
        , adminData: {
            students: {
                items: [],
                loaded: STATUS.NONE
            }

        }

    };
    const getArticleData = () => {
        return data.publicData.articleData;
    }



    const Manager = {
        getArticleData
    };

    return Manager;
};

export default factory;
