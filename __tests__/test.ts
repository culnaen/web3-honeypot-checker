import { CheckERC20Safety } from "../src/index";

CheckERC20Safety("0x33f8ed7d9013f921de6f373608b1d3c21c82c92d")
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
