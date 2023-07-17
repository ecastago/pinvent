import React from 'react'
import { loginUser } from '../../services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { SET_LOGIN, selectName } from '../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useSelector(selectName);

  const logout = async() => {
    await loginUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };

  return (
    <div className='--pad header'>
        <div className="--flex-between">
            <h3>
                <span className='----fw-thin'>Welcome, </span>
                <span className='-color-danger'>{name}</span>
            </h3>
            <button onClick={logout} className="--btn --btn-danger">
                Logout
            </button>
        </div>
        <hr/>
    </div>
  )
}

export default Header