// Basic Dependencies
import React, {Fragment, useState} from "react";
import { Link } from 'react-router-dom';

// Bootstrap Components
import Alert from "react-bootstrap/Alert";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from "react-bootstrap/Spinner";

// Custom Components
import Footer from './Footer';

// Styles
import '../scss/AddProduct.scss';

// AddProduct Component
function AddProduct() {
  // State
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('success');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState({ height_cm: '', width_cm: '', length_cm: '' });

  // Handle Type Change
  const handleTypeChange = (e) => {
    setType(e.target.value);
    setSize('');
    setWeight('');
    setDimensions({ height_cm: '', width_cm: '', length_cm: '' });
  };

  // Handle Submit
  const handleSubmit = (e) => {
    // Prevent Default + Start Loading
    e.preventDefault();
    setLoading(true);

    // Prepare Product Data
    const product = { name, price, sku, type, size_mb: size, weight_kg: weight, ...dimensions };

    // Send Data
    fetch('https://sw.salahineo.com/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then(response => {
        // Set Alert Variant
        if (response.status !== 201) {
          setVariant('danger');
        }

        return response.json();

      })
      .then(data => {
        // Stop Loading
        setLoading(false);

        // Set Alert Message
        setMessage(data.message);

        // Reset Data
        setSku('');
        setName('');
        setPrice('');
        setType('');
        setSize('');
        setWeight('');
        setDimensions({ height_cm: '', width_cm: '', length_cm: '' });

        // Show the alert
        setShow(true);

      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="container add-product my-4">
      {
        show && (
          <Alert variant={variant} onClose={() => setShow(false)} dismissible>
            <p className='mb-0'>{message}</p>
          </Alert>
        )
      }

      <div className="row">
        <div className="col-6">
          <h2 className="h2">Add Product</h2>
        </div>
        <div className="col-6 d-flex align-items-center justify-content-end">
          <Link to="/">
            <button className="btn btn-danger cancel-btn">Cancel</button>
          </Link>
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
          <Form className='my-5' id="product_form" onSubmit={handleSubmit}>


            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={1}>
                SKU
              </Form.Label>
              <Col sm={5}>
                <Form.Control id="sku" type="text" placeholder="Enter a suitable SKU (e.g. JVC200123)" value={sku} onChange={(e) => setSku(e.target.value)} required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={1}>
                Name
              </Form.Label>
              <Col sm={5}>
                <Form.Control id="name" type="text" placeholder="Enter product name (e.g. Fantastic Book)" value={name} onChange={(e) => setName(e.target.value)} required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={1}>
                Price
              </Form.Label>
              <Col sm={5}>
                <Form.Control id="price" type="number" placeholder="Enter product price as a number (e.g. 10.5)" value={price} onChange={(e) => setPrice(e.target.value)} required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={1}>
                Type
              </Form.Label>
              <Col sm={5}>
                <Form.Select id="productType" value={type} onChange={handleTypeChange} required>
                  <option defaultValue value="">Select Type</option>
                  <option value="DVD" id="DVD">DVD</option>
                  <option value="Book" id="Book">Book</option>
                  <option value="Furniture" id="Furniture">Furniture</option>
                </Form.Select>
              </Col>
            </Form.Group>


            {type === 'DVD' && (
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={1}>
                  Size
                </Form.Label>
                <Col sm={5}>
                  <Form.Control id="size" type="number" placeholder="Enter DVD size in MB (e.g. 12)" value={size} onChange={(e) => setSize(e.target.value)} required />
                </Col>
              </Form.Group>
            )}

            {type === 'Book' && (
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={1}>
                  Weight
                </Form.Label>
                <Col sm={5}>
                  <Form.Control id="weight" type="number" placeholder="Enter Book weight in KG (e.g. 12.5)" value={weight} onChange={(e) => setWeight(e.target.value)} required />
                </Col>
              </Form.Group>
            )}

            {type === 'Furniture' && (
              <>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={1}>
                    Width
                  </Form.Label>
                  <Col sm={5}>
                    <Form.Control id="width" type="number" placeholder="Enter Furniture width in CM (e.g. 30.8)" value={dimensions.width_cm} onChange={(e) => setDimensions({...dimensions, width_cm: e.target.value})} required />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={1}>
                    Height
                  </Form.Label>
                  <Col sm={5}>
                    <Form.Control id="height" type="number" placeholder="Enter Furniture height in CM (e.g. 15.6)" value={dimensions.height_cm} onChange={(e) => setDimensions({...dimensions, height_cm: e.target.value})} required />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={1}>
                    Length
                  </Form.Label>
                  <Col sm={5}>
                    <Form.Control id="length" type="number" placeholder="Enter Furniture length in CM (e.g. 4.25)" value={dimensions.length_cm} onChange={(e) => setDimensions({...dimensions, length_cm: e.target.value})} required />
                  </Col>
                </Form.Group>
              </>
            )}

            <Form.Group as={Row}>
              <Col>
                <button className="btn mt-5 btn-primary" type="submit">Save</button>
              </Col>
            </Form.Group>

          </Form>
      }

      <Footer/>
    </div>
  );
}

export default AddProduct;
