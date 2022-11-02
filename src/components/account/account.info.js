import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { React } from "react";
import { queryInfo } from "../query/account";
import { Form } from "react-bootstrap";
import "./account.info.css";
import "./loading.css";

function DisplayInfo() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["admin"],
    queryFn: queryInfo,
  });

  if (isLoading) return <div className="loader"></div>;

  if (error)
    return (
      <div>
        <h1>An error has occurred: + {error.message}</h1>
        <h1>Please login again</h1>
      </div>
    );
  return (
    <div className="container">
      <div className="infoBox">
        <div className="infoBox-title">
          <h3>YOUR INFORMATION</h3>
        </div>
        <div className="infoBox-content">
          <Form>
            <Form.Group className="mb-3" controlId="register-username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={data.data.username}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="register-email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={data.data.email}
                readOnly
              />
            </Form.Group>
          </Form>
          <p>
            Message:
            <strong>{isFetching ? "Updating..." : data.res_message}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
const queryClient = new QueryClient();
const Accounts = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DisplayInfo />
    </QueryClientProvider>
  );
};

export default Accounts;
