import React from "react";
import { Link } from "react-router-dom";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  )
];

export default function Subscriptions() {
  return (
    <React.Fragment>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="text-center px-2 py-3 border-b">Date</th>
            <th className="text-center px-2 py-3 border-b">Name</th>
            <th className="text-center px-2 py-3 border-b">Plan</th>
            <th className="text-center px-2 py-3 border-b">Payment Method</th>
            <th className="text-center px-2 py-3 border-b" align="right">Subscription Amount</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id}>
              <td className="text-center px-2 py-3 border-b">{row.date}</td>
              <td className="text-center px-2 py-3 border-b">{row.name}</td>
              <td className="text-center px-2 py-3 border-b">{row.shipTo}</td>
              <td className="text-center px-2 py-3 border-b">{row.paymentMethod}</td>
              <td className="text-center px-2 py-3 border-b" align="right">{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="mt-3 text-center">
        <Link className="text-primary" to="#">
          See more orders
        </Link>
      </div> */}
    </React.Fragment>
  );
}
