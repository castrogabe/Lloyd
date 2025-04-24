import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import SkeletonGallery from '../components/skeletons/SkeletonGallery';

export default function SoldAntiques() {
  const [soldProducts, setSoldProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSoldProducts = async () => {
      try {
        const result = await axios.get('/api/products/sold'); // Fetch only sold products
        setSoldProducts(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sold products:', error.message);
        setLoading(false);
      }
    };
    fetchSoldProducts();
  }, []);

  return (
    <>
      <div className='content'>
        <Helmet>
          <title>Sold Antiques</title>
        </Helmet>
        <br />
        <h1 className='box'>Sold Antiques</h1>
        <Row>
          <Col>
            <div className='products'>
              {loading ? (
                <>
                  <Row>
                    {[...Array(4).keys()].map((i) => (
                      <Col key={i} sm={6} md={4} lg={3} className='mb-3'>
                        <SkeletonGallery />
                      </Col>
                    ))}
                  </Row>
                  <Row>
                    {[...Array(4).keys()].map((i) => (
                      <Col key={i + 4} sm={6} md={4} lg={3} className='mb-3'>
                        <SkeletonGallery />
                      </Col>
                    ))}
                  </Row>
                </>
              ) : (
                soldProducts.map((product) => (
                  <div className='product' key={product.slug}>
                    <Link to={`/product/${product.slug}`}>
                      <img src={product.image} alt={product.name} />
                    </Link>
                    <div className='product-info'>
                      <Link to={`/product/${product.slug}`}>
                        <p>{product.name}</p> {/* Only show name */}
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
