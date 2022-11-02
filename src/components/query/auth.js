import axios from "axios";

export const request = async ({ method, URL, data }) => {
  const response = await axios({
    method: method,
    // url: `http://localhost:4000/${URL}`,
    url: `https://clone-app-hcmus.herokuapp.com/${URL}`,
    data: data,
    header: {
      "Content-Type": "application/json",
    },
  }).catch((err) => {
    console.error(err);
  });

  console.log(response);
  return response.data;
};
