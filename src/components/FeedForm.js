import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import API from '../utils/api';

const FeedForm = ({ onSubmit }) => {
  const [feedName, setFeedName] = useState('');
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);
  const [isDefault, setIsDefault] = useState(false);
  const [authorOptions, setAuthorOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [sourceOptions, setSourceOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [authorsResponse, categoriesResponse, sourcesResponse] = await Promise.all([
          API.get('/api/authors'),
          API.get('/api/categories'),
          API.get('/api/sources'),
        ]);
        setAuthorOptions(authorsResponse.data);
        setCategoryOptions(categoriesResponse.data);
        setSourceOptions(sourcesResponse.data);
      } catch (error) {
        console.error('Error fetching options:', error.response);
      }
    };

    fetchOptions();
  }, []);

  const handleSubmit = () => {
    onSubmit({ feedName, authors, categories, sources, isDefault });

    // Clearing input
    setFeedName('');
    setAuthors([]);
    setCategories([]);
    setSources([]);
    setIsDefault(false);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control mb-2"
        value={feedName}
        onChange={(e) => setFeedName(e.target.value)}
        placeholder="Enter feedname"
      />
      <Select
        isMulti
        options={authorOptions.map(option => ({ label: option.author, value: option.id }))}
        className="mb-2"
        onChange={selectedOptions => setAuthors(selectedOptions.map(option => option.value))}
        placeholder="Select author"
      />
      <Select
        isMulti
        options={categoryOptions.map(option => ({ label: option.category, value: option.id }))}
        className="mb-2"
        onChange={selectedOptions => setCategories(selectedOptions.map(option => option.value))}
        placeholder="Select category"
      />
      <Select
        isMulti
        options={sourceOptions.map(option => ({ label: option.source, value: option.id }))}
        className="mb-2"
        onChange={selectedOptions => setSources(selectedOptions.map(option => option.value))}
        placeholder="Select source"
      />
      <div className="form-check mb-2">
        <input
          type="checkbox"
          className="form-check-input"
          checked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
          id="makeDefaultCheckbox"
        />
        <label className="form-check-label" htmlFor="makeDefaultCheckbox">
          Make default
        </label>
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>
        Create Feed
      </button>
    </div>
  );
};

export default FeedForm;
