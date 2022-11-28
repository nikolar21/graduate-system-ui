import {useContext} from 'react';
import {UserContext} from "../state-management/store/UserContext";
import {Navigate} from 'react-router-dom';

const Protected = ({children}) => {
  const [userContext] = useContext(UserContext);

  if (!userContext || !userContext.isLoggedIn) {
    sessionStorage.removeItem('jwt-token');
    return <Navigate to="/login" replace />
  }

  return children;

}

export default Protected;