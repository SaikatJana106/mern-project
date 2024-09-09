import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './iteam.css';

const Iteam = (props) => {
  const navigate = useNavigate();

  const handleBuy = () => {
    navigate('/buy', { state: { product: props } });
  };

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Link to={`/product/${props.id}`}>
          <Card.Img onClick={() => window.scrollTo(0, 0)} variant="top" src={props.image} />
        </Link>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.name}</Card.Text>
          <Card.Text>$ {props.price}</Card.Text>
          <Button  onClick={handleBuy} className='btn'>Buy</Button>
        </Card.Body>
      </Card>
      
    </>
  );
};

export default Iteam;
