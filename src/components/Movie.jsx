import React, { useEffect, useState } from 'react'

import {getMovieDetails,getMovieReviews} from './../api'
import { useNavigate } from 'react-router-dom';

function Movie({movieIdSelect}) {
    const [details, setDetails] = useState({})
    const [reviews, setReviews] = useState([])
    const navigate = useNavigate();
    
    useEffect(()=> {
        if (!movieIdSelect.get) {
            navigate('/')
        }
        getDetails()
        getReviews()
    },[])

    const getDetails = async ()=> {
        const result = await getMovieDetails(movieIdSelect.get);
        setDetails(result)
    }


    const getReviews = async ()=> {
        const {results} = await getMovieReviews(movieIdSelect.get);
        setReviews(results)
    }



    return (
    <div className='p-14 h-full flex gap-14'>
        <div className='flex-grow h-full flex flex-col gap-6 overflow-y-auto'>
            <div className='flex flex-col'>
                <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{details.original_title || 'Movie'}</h5>
                <p class="font-light text-gray-700 dark:text-gray-400">Date de sortie : {details.release_date || ''}</p>
            </div>
            <p class="font-light text-white dark:text-white"></p>
           
            <div className="flex flex-col gap-2">
                <p class="font-light text-lg text-gray-700 dark:text-gray-400">Avis</p>

                {reviews.map(t =>
                    <a href="#" class="block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 class="mb-1 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{t.author}</h5>
                        <p class="font-normal text-gray-700 dark:text-gray-400">{new Date(t.updated_at).toLocaleDateString('fr-FR', {day: '2-digit',month: '2-digit',year: 'numeric'})}</p>
                        <p class="font-normal text-gray-700 dark:text-gray-400">{t.content}</p>
                    </a>
                )}
                
            </div>
        </div>
        <div>
            <img className='max-w-md rounded-lg' src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}/>
        </div>
    </div>
    )
}

export default Movie