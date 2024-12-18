import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

const fetchVisitorCount = async () => {
  try {
    const response = await fetch('/api/general/visitor');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.visitorCount;
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    return 0;
  }
};

const Main = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const count = await fetchVisitorCount();
      setVisitorCount(count);
    };
    fetchData();
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <App visitorCount={visitorCount} />
      </BrowserRouter>
    </Provider>
  );
};

root.render(<Main />);