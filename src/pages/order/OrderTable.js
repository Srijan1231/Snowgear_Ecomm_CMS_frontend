import { Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";

export const OrderTable = () => {
  const { orders } = useSelector((state) => state.orderInfo);

  return (
    <>
      <div className="d-flex justify-content-between mt-5">
        <div>{orders.length} Order/s</div>
        <div>
          <Form.Control placeholder="Search by name ..." />
        </div>
      </div>
      <Table striped bordered hover className="mt-2 ">
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Items</th>

            <th>Created At</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(
            ({ _id, orderItem, paymentStatus, userInfo, createdAt }, i) => (
              <tr key={_id}>
                <td>{i + 1}</td>
                <th>{paymentStatus.status}</th>

                <th>
                  {orderItem.map(({ _id, name, thumbnail, ordqty }) => (
                    <>
                      <td className="d-flex justify-content-between" key={_id}>
                        <div>{name}</div>

                        <p>OrderQty:{ordqty}</p>
                      </td>
                      <td>
                        <img
                          src={
                            process.env.REACT_APP_ROOTSERVER +
                            thumbnail?.slice(6)
                          }
                          alt="img"
                          width="150px"
                        />
                      </td>
                    </>
                  ))}
                </th>

                <td>{createdAt.slice(0, 10)}</td>
                <td>{userInfo.email}</td>
                <td>{userInfo.address}</td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </>
  );
};
