import React from "react";
import { Link } from "react-router-dom";

export default function Deposits() {
  return (
    <React.Fragment>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        $3,024.00
      </p>
      <p style={{ color: '#6c757d' }}>
        on 15 March, 2019
      </p>
      <div>
        <Link to="#" style={{ color: '#007bff' }}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
