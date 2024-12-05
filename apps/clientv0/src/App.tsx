import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Forecast from "./Forecast";
import Bills from "./Bills";

const updateData = () => {
  const bills = localStorage.getItem("bills");
  if (bills) {
    const configKey = "bank.localstorage/0_config";
    const billsKey = "bank.localstorage/0_bills";
    localStorage.clear();
    localStorage.setItem(billsKey, bills);
    localStorage.setItem(
      configKey,
      JSON.stringify({
        id: "default",
        incomePerCycle: 0,
        startingBalance: 0,
        startDate: new Date().toUTCString(),
        endDate: new Date(
          new Date().getUTCFullYear(),
          new Date().getUTCMonth(),
          new Date().getDate() + 14,
          0,
        ).toUTCString(),
        cycleType: "bi-weekly",
      }),
    );
  }
};

export default function Bank() {
  updateData();
  const key = "0";
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
          <Forecast storageKey={key} />
        </Tab>
        <Tab eventKey="bills" title="Bills">
          <Bills storageKey={key} />
        </Tab>
      </Tabs>
    </div>
  );
}
