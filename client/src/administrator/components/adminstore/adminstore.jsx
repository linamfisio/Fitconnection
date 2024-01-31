/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Product from "../products/products";

import { deleteProduct, getAllProducts } from "../../../redux/action";

function adminstore() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const allProducts = useSelector((state) => state.allProducts);

  return (
    <Row>
      {allProducts.map((product) => {
        return (
          <Col xs="12" md="6" lg="4" className="p-3" key={product.id}>
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              status={product.status}
              code={product.code}
              image_url={product.image_url}
              stock={product.stock}
              category={product.category}
            />
          </Col>
        );
      })}
    </Row>
  );
}

export default adminstore;
