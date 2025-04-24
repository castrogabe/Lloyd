import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { toast } from 'react-toastify';
import Jumbotron from '../components/Jumbotron';
import CategoriesCard from '../components/CategoriesCard';
import Subscribe from '../components/Subscribe';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function Home() {
  const [homeContent, setHomeContent] = useState({
    title: '',
    description: '',
    jumbotronText: [],
    h4Text: [],
  });

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const { data } = await axios.get('/api/homecontent');
        setHomeContent(
          data || { title: '', description: '', jumbotronText: [], h4Text: [] }
        );
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchHomeContent();
  }, []);

  return (
    <>
      <div className='jumbotron1' alt='tools'>
        <Jumbotron text={homeContent.jumbotronText} />
      </div>

      <div className='content'>
        <Helmet>
          <title>Linda Lloyd</title>
        </Helmet>
        <br />
        {homeContent && (
          <div className='box text-center'>
            <h2>{homeContent.title}</h2>
            <h4>
              {homeContent.h4Text.map((text, index) => (
                <span key={index} className='item'>
                  {text}
                </span>
              ))}
            </h4>
            <p>{homeContent.description}</p>
          </div>
        )}

        {/* Display categories */}
        <CategoriesCard />
        <Subscribe />
      </div>
      <br />
    </>
  );
}
