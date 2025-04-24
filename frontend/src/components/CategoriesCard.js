import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function CategoriesCard() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);

        if (Array.isArray(data)) {
          const formattedCategories = data.map((category) => ({
            name: category._id,
            image: category.categoryImage || '/images/default.png',
          }));
          setCategories(formattedCategories);
        }
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className='categories-container'>
      <Row>
        {categories.map((category) => (
          <Col
            key={category.name}
            xs={6} /* 2 per row on extra small screens */
            sm={12} /* Full width on small screens */
            md={6} /* 2 per row on medium screens */
            lg={4} /* 3 per row on large screens */
            className={`mb-4 ${
              window.innerWidth < 768 ? 'd-flex justify-content-center' : ''
            }`}
          >
            <Card
              className='category-card'
              onClick={() =>
                navigate(
                  `/search?category=${encodeURIComponent(category.name)}`
                )
              }
              style={{ cursor: 'pointer' }}
            >
              <Card.Body>
                <Card.Title className='text-center'>{category.name}</Card.Title>
              </Card.Body>
              <Card.Img
                variant='top'
                src={category.image}
                alt={category.name}
                style={{ height: '400px', objectFit: 'cover' }}
                onError={(e) => (e.target.src = '/images/default.png')}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
