import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import API from '../utils/api';

const ArticleFilterForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const [sourceOptions, setSourceOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [authorOptions, setAuthorOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [sourcesResponse, categoriesResponse, authorsResponse] = await Promise.all([
          API.get('/api/sources'),
          API.get('/api/categories'),
          API.get('/api/authors')
        ]);
        setSourceOptions(sourcesResponse.data.map(s => ({ label: s.source, value: s.id })));
        setCategoryOptions(categoriesResponse.data.map(c => ({ label: c.category, value: c.id })));
        setAuthorOptions(authorsResponse.data.map(a => ({ label: a.author, value: a.id })));
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      searchTerm,
      sources: selectedSources.map(s => s.value),
      categories: selectedCategories.map(c => c.value),
      authors: selectedAuthors.map(a => a.value),
      dateRange
    });
  };

  return (
    <div className='container px-5'>
      <form onSubmit={handleSubmit} className="mt-4 mb-4 ms-4 me-4">
        <div className="row g-2">
          <div className="col-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles..."
              className="form-control"
            />
          </div>
          <div className="col-md">
            <Select
                isMulti
                options={sourceOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={setSelectedSources}
                placeholder="Select sources"
            />
          </div>
          <div className="col-md">
            <Select
                isMulti
                options={categoryOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={setSelectedCategories}
                placeholder="Select categories"
            />
          </div>
          <div className="col-md">
            <Select
                isMulti
                options={authorOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={setSelectedAuthors}
                placeholder="Select authors"
            />
          </div>
          <div className="row g-2 mt-2">
            <div className="col-md">
              <label htmlFor="startDate" className="form-label">From Date</label>
              <input
                type="date"
                className="form-control"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
            </div>
            <div className="col-md">
              <label htmlFor="endDate" className="form-label">To Date</label>
              <input
                type="date"
                className="form-control"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
            </div>
            <div className="col-md-auto align-self-end">
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ArticleFilterForm;
