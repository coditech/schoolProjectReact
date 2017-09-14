import React from 'react';

const Pagination = ({data, last, paginateTo, currentPage, location}) => {

    console.log('paginato', location.pathname);
    return (
        <nav>
            <ul className="pagination" id="pagination">
                { parseInt(currentPage) !== 1 ?
                    <li>
                        <a aria-label="Previous" href={'/#' + location.pathname + '?page=1'}
                           onClick={() => paginateTo(1)}><span
                            aria-hidden="true">«</span></a>
                    </li> : null }


                {
                    data.map(function (page) {

                        return (
                            <li key={page} className={parseInt(page) === parseInt(currentPage) ? 'active' : ''}>
                                <a href={'/#' + location.pathname + '?page=' + page}
                                   onClick={() => paginateTo(page)}>{page }</a>
                            </li>
                        )
                    })}

                { parseInt(data[data.length - 1]) < parseInt(last) ?
                    <li><a aria-label="Next" href={'/#' + location.pathname + '?page=' + last}
                           onClick={() => paginateTo(last)}><span aria-hidden="true">»</span></a>
                    </li> : null }


            </ul>
        </nav>
    )

};

export default Pagination;