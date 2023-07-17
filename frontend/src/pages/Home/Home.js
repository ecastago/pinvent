import React from 'react';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Link } from 'react-router-dom';
import "./Home.scss";
import heroImg from "../../assets/inventory.jpg";
import { ShowOnLogin, ShowOnLogout } from '../../components/protect/HiddenLink';

const Home = () => {
  return (
    <div className='home'>
        <nav className='container --flex-between'>
            <div className="logo">
                <InventoryIcon />
            </div>
            <ul className="home-links">
                <ShowOnLogout>
                    <li>
                        <Link to="/register" >
                            Register
                        </Link>
                    </li>
                </ShowOnLogout>
                <ShowOnLogout>
                    <li>
                        <button className="--btn --btn-primary">
                            <Link to="/login">
                                Login
                            </Link>
                        </button>
                    </li>
                </ShowOnLogout>
                <ShowOnLogin>
                    <li>
                        <button className="--btn --btn-primary">
                            <Link to="/dashboard">
                                Dashboard
                            </Link>
                        </button>
                    </li>
                </ShowOnLogin>
            </ul>
        </nav>
        {/* HERO SECTION */}
        <section className="container hero">
            <div className="hero-text">
                <h2>
                    Inventory & Stock Management 
                    Solution
                </h2>
                <p>
                    Inventory system to control and manage products in the warehouse in real time and integrated to make it easier to develop your business.
                </p>
                <div className="hero-buttons">
                    <button className="--btn --btn-secondary">
                        <Link to="/subscribe">
                            Free Trial 1 Month
                        </Link>
                    </button>
                </div>
                <div className="--flex-start">
                    <NumberText num="14K" text="Brand Owners" />
                    <NumberText num="23K" text="Active Users" />
                    <NumberText num="500+" text="Partners" />
                </div>
            </div>
            <div className="hero-image">
                <img style={{height:"100%", width:"100%"}} src={heroImg} alt="inventory" />
            </div>
        </section>
    </div>
  )
}

const NumberText = ({num, text}) => {
    return (
        <div className="--mr">
            <h3 className='--color-white'>{num}</h3>
            <p className='--color-white'>{text}</p>
        </div>
    )
}

export default Home