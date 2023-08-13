import { useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductAction,
  getProductsAction,
} from "../../pages/product/productAction";
import { Link } from "react-router-dom";

export const ProductTable = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productInfo);

  useEffect(() => {
    dispatch(getProductsAction());
  }, [dispatch]);

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-between mb-3">
        <div>{products.length} Products found</div>
        <div>
          <Form.Control type="text" placeholder="search by product name ..." />
        </div>
      </div>
      <Table striped bordered hover className="text-start">
        <thead>
          <tr>
            <th>#</th>
            <th>Thumbnail</th>
            <th>status</th>
            <th>Name</th>
            <th>QTY</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, i) => (
            <tr key={item._id}>
              <td>{i + 1}</td>
              <td>
                <img
                  src={
                    process.env.REACT_APP_ROOTSERVER + item.thumbnail?.slice(6)
                  }
                  alt="img"
                  width="150px"
                />
              </td>
              <td>{item.status}</td>
              <td>
                <h3> {item.name}</h3>
                Price: {item.price}
              </td>
              <td>{item.qty}</td>
              <td>
                <Link to={`/product/edit/${item._id}`}>
                  <Button variant="warning">Edit</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
