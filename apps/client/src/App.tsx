import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Forecast from "./Forecast";
import Bills from "./Bills";

export default function Bank() {
  return (
    <div className="container py-4 px-3 mx-auto">
      <Tabs
        defaultActiveKey="forecast"
        className="mb-3"
        onSelect={(key) => {
          if (key === "forecast") {
            // TODO: see if there's a better way to get latest (add router?)
            // reload to get latest bills.
            location.reload();
          }
        }}
      >
        <Tab eventKey="forecast" title="Forecast">
          <Forecast />
        </Tab>
        <Tab eventKey="bills" title="Bills">
          <Bills />
        </Tab>
      </Tabs>
    </div>
  );
}
