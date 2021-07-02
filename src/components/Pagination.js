import React from 'react';

const Pagination = ({ perPage, tableDatas, paginate }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(tableDatas / perPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div>
            <nav>
                <ul class="pagination">
                    {
                        pageNumbers.map(number => {
                            return (
                                <li key={number} class="page-item">
                                    <a onClick={() => paginate(number)} href="#" class="page-link">
                                        {number}
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </div>

    )
}
export default Pagination;
