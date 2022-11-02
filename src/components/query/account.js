import axios from "axios";

export const queryInfo = async ({ queryKey, param }) => {
  // console.log("param", queryKey);
  var key = queryKey[0];
  const res = await axios.get(
    `https://clone-app-hcmus.herokuapp.com/account/info/${key}`,
    // `http://localhost:4000/account/info/${key}`,
    {
      headers: {
        token: localStorage.getItem("access_token"),
      },
    }
  );
  return res.data;
};
