import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Service.css'

const Service = ({ service }) => {
    const { id, name, img, description, price } = service;
    const navigate = useNavigate()
    const navigateToServiceDetail = id => {
        navigate(`/service/${id}`);

    }
    return (
        <div className='service'>
            <img className='w-100' src={img} alt="" />
            <h1>{name}</h1>
            <p>Price{price}</p>
            <p>Description<small> {description}</small></p>
            <button onClick={() => navigateToServiceDetail(id)} className='btn btn-primary'>Book</button>

        </div>
    );
};

export default Service;