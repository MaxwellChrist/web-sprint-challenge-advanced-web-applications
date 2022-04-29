import React from 'react';
import { Route, Outlet, Navigate } from 'react-router-dom';

function ProtectedRoute3({ children, ...rest }) {
    let token  = window.localStorage.getItem("token")
    return (
      <Outlet
        {...rest}
        render={() => token ? children : <Navigate to="/" />
        }
      />
    );
  }
  
export default ProtectedRoute3

// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// function ProtectedRoute3({ children, ...rest }) {
//     let token  = window.localStorage.getItem("token")
//     return (
//       <Route
//         {...rest}
//         render={() => token ? children : <Navigate to="/" />
//         }
//       />
//     );
//   }
  
// export default ProtectedRoute3