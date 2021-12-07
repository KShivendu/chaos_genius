import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Route, withRouter } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

// import { Redirect } from 'react-router-dom';
// import { isAuthenticated } from '../utils/user-helper';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import { getConnectionType, getGlobalSetting } from '../redux/actions';

import { connectionContext } from '../components/context';
import posthog from 'posthog-js';

const PrivateRouteWithSidebar = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const [stateValue, setState] = useState();
  const { connectionType } = useSelector((state) => state.dataSource);
  const { globalSettingData } = useSelector((state) => state.GlobalSetting);

  useEffect(() => {
    // process.env.NODE_ENV === 'development'

    if (
      process.env.REACT_APP_DISABLE_TELEMETRY === 'true' ||
      process.env.NODE_ENV === 'development'
    ) {
      console.log('disable telemetry');
      // eslint-disable-next-line react-hooks/exhaustive-deps
    } else {
      posthog.init('phc_KcsaN1oBtVUwKUvd9owb3Cz42MYDpR6No00EJRLAprH', {
        api_host: 'https://app.posthog.com'
      });
    }
  }, []);

  useEffect(() => {
    dispatchGetConnectionType();
    dispatch(getGlobalSetting());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatchGetConnectionType = () => {
    dispatch(getConnectionType());
  };

  useEffect(() => {
    if (globalSettingData) {
      localStorage.setItem('GlobalSetting', JSON.stringify(globalSettingData));
    }
  }, [globalSettingData]);

  useEffect(() => {
    if (connectionType && connectionType.length !== 0) {
      setState(connectionType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionType]);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <connectionContext.Provider value={stateValue}>
            <div className="container-wrapper">
              <Sidebar />
              <main>
                <Navbar />
                <div className="body-container">
                  <Component {...props} />
                </div>
              </main>
              <ToastContainer
                position={toast.POSITION.BOTTOM_RIGHT}
                autoClose={5000}
              />
            </div>
          </connectionContext.Provider>
        </>
      )}
    />
  );
};

export default withRouter(PrivateRouteWithSidebar);
