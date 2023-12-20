import ReactDOM from "react-dom/client";

import "./style.scss";

// @ts-expect-error importing all of bootstrap js files
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import bootstrap from "bootstrap";

import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(<App />);
