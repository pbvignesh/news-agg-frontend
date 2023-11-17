import Alert from '../components/common/Alert';
import API from '../utils/api';
import { AuthContext } from '../AuthContext';
import FeedForm from '../components/FeedForm';
import FeedList from '../components/FeedList';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAlert from '../hooks/useAlert';

export default function FeedsPage() {
  const { isAuthenticated } = useContext(AuthContext);
  const [feeds, setFeeds] = useState([]);
  const [alert, showAlert] = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchFeeds = async () => {
      try {
        const response = await API.get('/api/feeds');
        setFeeds(response.data);
      } catch (error) {
        showAlert('Unable to fetch feeds', 'danger');
      }
    };

      fetchFeeds();
  }, [isAuthenticated, navigate]);

  const handleCreateFeed = async (newFeedData) => {
    try {
      const response = await API.post('/api/feeds', newFeedData);
      setFeeds([...feeds, response.data]);
      showAlert('New Feed created', 'success');
    } catch (error) {
      showAlert('Error creating feed ' + error.response.data.message, 'danger');
    }
  };

  const handleMakeDefault = async (feedId) => {
    try {
      const response = await API.patch(`/api/feeds/${feedId}`, { 'is_default': true });
      if (response.status >= 200 && response.status < 300) {
        setFeeds(feeds.map(feed => {
          return feed.id === feedId ? { ...feed, is_default: true } : { ...feed, is_default: false };
        }));
      }
    } catch (error) {
      showAlert('Unable to make feed default', 'danger');
    }
  };

  const handleDeleteFeed = async (feedId) => {
    try {
      const response = await API.delete(`/api/feeds/${feedId}`);
      if (response.status >= 200 && response.status < 300) {
        setFeeds(feeds.filter(feed => feed.id !== feedId));
        showAlert('Feed Deleted', 'success');
      }
    } catch (error) {
      showAlert('Error deleting feed', 'danger');
    }
  };

  return (
    <div className="container my-5">
      <Alert message={alert.message} type={alert.type} show={alert.show} onClose={() => showAlert('', '')} />
      <FeedForm onSubmit={handleCreateFeed} />
      <hr />
      <FeedList feeds={feeds} onMakeDefault={handleMakeDefault} onDelete={handleDeleteFeed} />
    </div>
  );
}