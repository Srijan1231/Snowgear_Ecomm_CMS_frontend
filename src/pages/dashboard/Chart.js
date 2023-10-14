import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Chart = () => {
  const { products } = useSelector((state) => state.productInfo);
  const { cats } = useSelector((state) => state.catInfo);

  const chartData = cats.map((cat) => {
    const productsInCat = products.filter(
      (product) => product.parentCat === cat._id
    );
    return {
      catName: cat.title.slice(0, 5),
      total_products: productsInCat.length,
    };
  });

  //   const options = {};
  return (
    <div>
      <div className="d-flex gap-5 justify-content-center">
        <div>
          {" "}
          <Card style={{ width: "18rem" }} className="bg-transparent">
            <Card.Body>
              <Card.Title as="h5">Total Category</Card.Title>
              <Card.Text as="h5">{cats.length}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div>
          {" "}
          <Card style={{ width: "18rem" }} className="bg-transparent">
            <Card.Body>
              <Card.Title as="h5">Total no. of Product</Card.Title>
              <Card.Text as="h5">{products.length}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div>
          {" "}
          <Card style={{ width: "18rem" }} className="bg-transparent">
            <Card.Body>
              <Card.Title as="h5">Orders</Card.Title>
              <Card.Text as="h5">{products.length}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center">
        <ResponsiveContainer width="70%" height={400}>
          <ComposedChart data={chartData}>
            {/* <Line type="monotone" dataKey="price" fill="yellow" /> */}
            <Bar
              dataKey="total_products"
              type={"monotone"}
              strokeWidth={3}
              fill="#8884d8"
            />
            <XAxis dataKey={"catName"} />
            <YAxis />

            <CartesianGrid stroke="#ccc" />
            <Tooltip />
          </ComposedChart>
        </ResponsiveContainer>
        <p>No. of products by category</p>
      </div>
    </div>
  );
};
