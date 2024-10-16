import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, removeUser } from "../actions/userActions";
import { removeUserReset } from "../reducers/userDetailsSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserListScreen = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userDetails);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDetails);
  const { success: removeSuccess } = userDelete;

  if (removeSuccess) {
    toast.error(`User Removed!`, {
      position: "bottom-right",
      autoClose: 1000,
      theme: "colored",
    });
  }

  useEffect(() => {
    dispatch(removeUserReset());
    dispatch(listUsers());
  }, [dispatch]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(removeUser(id));
    }
  };

  return (
    <>
      <ToastContainer hideProgressBar={true} />
      <h1>Users</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient={"danger"}>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
