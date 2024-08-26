// Basic Dependencies
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Bootstrap Components
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

// Custom Components
import Footer from './Footer';

// Styles
import '../scss/ProductList.scss';


function ProductList() {
  // State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [show, setShow] = useState(false);

  // Effect
  useEffect(() => {
    // Start loading
    setLoading(true);

    // Fetch data
    fetch('https://sw.salahineo.com/products')
      .then(response => response.json())
      .then(data => {
        // Set data to State
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Mass Delete Function
  const massDelete = () => {
    // Check if there are checked products
    if (checkedProducts.length > 0) {
      let ids  = {
        "ids": checkedProducts
      }

      fetch('https://sw.salahineo.com/products', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ids),
      })
        .then(response => response.json())
        .then(data => {
          // Delete Products
          setProducts(products.filter(product => !checkedProducts.includes(`${product.id}`)));
          // Reset Checked Products
          setCheckedProducts([]);
          // Show Alert
          setShow(true)
        });
    }
  }

  return (
    <div className="container product-list my-4">

      {
        show && (
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
            <p className='mb-0'>Products Deleted Successfully</p>
          </Alert>
        )
      }

      <div className="row">
        <div className="col-6">
          <h2 className="h2">Product List</h2>
        </div>
        <div className="col-6 d-flex align-items-center justify-content-end">
          <Link to="/add-product">
            <button className="btn btn-primary">ADD</button>
          </Link>
          <button id='delete-product-button' className="btn mass-delete btn-danger" onClick={massDelete}>MASS DELETE</button>
        </div>
      </div>

      <hr/>

      {
        loading ?
          <div className="d-flex justify-content-center align-items-center my-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
          :
          <div className="products-list my-5 row">
            {
              products.length === 0 &&
              <div className="col-12">
                <h3 className="text-center">No Products Found</h3>
              </div>
            }

            {
              products.map((product) => {
              return (
                <div className="col-12 col-md-6 col-xl-3 mb-4" key={product.id}>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        <input
                          className="delete-checkbox form-check-input"
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCheckedProducts([...checkedProducts, `${product.id}`]);
                            } else {
                              setCheckedProducts(checkedProducts.filter(id => id !== product.id));
                            }
                          }}
                        />
                      </Card.Title>
                      <Card.Text className="text-center">
                          <li className="list-group-item border-0">{product.sku}</li>
                          <li className="list-group-item border-0">{product.name}</li>
                          <li className="list-group-item border-0">{product.type}</li>
                          <li className="list-group-item border-0">{product.price} $</li>
                          {product.type === 'DVD' && <li className="list-group-item border-0">Size: {product.size_mb} MB</li>}
                          {product.type === 'Book' && <li className="list-group-item border-0">Weight: {product.weight_kg} KG</li>}
                          {product.type === 'Furniture' && <li className="list-group-item border-0">Dimensions: {product.height_cm + 'x' + product.width_cm + 'x' + product.length_cm} CM</li>}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              );
            })
          }
        </div>
      }

      <Footer />
    </div>
  );
}

export default ProductList;
