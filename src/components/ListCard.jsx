import React, { useEffect, useState } from 'react'
import Card from './Card'
import { useNavigate } from 'react-router-dom';

function listCard({pageContent = [], pageSelect, totalPage, movieIdSelect}) {
    const navigate = useNavigate();
    return (

        <div className='p-10 flex flex-col gap-10 items-center'>
            <div className='flex flex-wrap gap-8 justify-center'>
                { pageContent[0] && pageContent[pageSelect.get] && pageContent[pageSelect.get].map(m =><div onClick={()=>{movieIdSelect.set(m.id),navigate('/movie');}}><Card image={`https://image.tmdb.org/t/p/w500${m.poster_path}`} title={m.original_title} description={m.overview} /></div>)}
            </div>
            <nav aria-label="Page navigation example">
                <ul class="inline-flex -space-x-px text-base h-10">
                    {pageSelect.get > 0 && <li onClick={()=>pageSelect.set(pageSelect.get-1)}>
                        <a href="#" class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                    </li>}

                    {pageSelect.get > 0 && [1,2,3].slice(0, Math.min(pageSelect.get,3)).map((v, index, tab) => (
                        <li onClick={()=>pageSelect.set(pageSelect.get - (tab.length - index))}>
                            <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{pageSelect.get + 1 - (tab.length - index)}</a>
                        </li>
                    ))}

                    <li>
                        <a href="#" aria-current="page" class="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{pageSelect.get + 1}</a>
                    </li>


                   
                    {(totalPage.get > pageSelect.get + 1) && [1,2,3].map(v=> v + pageSelect.get).slice(0, Math.min(3,totalPage.get - (pageSelect.get + 1))).map((v, index, tab) => (
                        <li onClick={()=>pageSelect.set(v)}>
                            <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{v + 1}</a>
                        </li>
                    ))}


                    {pageSelect.get + 1  <  totalPage.get  && <li onClick={()=>pageSelect.set(pageSelect.get+1)}>
                        <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                    </li>}

                </ul>
            </nav>
        </div>

    )
}

export default listCard