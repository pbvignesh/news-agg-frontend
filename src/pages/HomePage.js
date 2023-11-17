import { AuthContext } from '../AuthContext';
import API from '../utils/api';
import ArticleFilterForm from '../components/ArticleFilterForm';
import ArticleList from '../components/ArticleList';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [articles, setArticles] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchArticles();
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const fetchArticles = async (filters = {}) => {
    try {
      const response = await API.get('/api/articles', { params: filters });
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleSearch = (filters) => {
    fetchArticles(filters);
  };

  return (
    <>
      <ArticleFilterForm onSearch={handleSearch}/>
      <ArticleList articles={articles}/>
    </>
  );
}

export default HomePage;