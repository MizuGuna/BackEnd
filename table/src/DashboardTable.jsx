import { useEffect, useState } from "react";

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString(); // or toLocaleDateString(), toLocaleTimeString()
}

function DashboardTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:5754/api/data');
      const data = await res.json();
      setData(data); // assume you're storing it in state
    };

    fetchData(); // initial fetch
    const interval = setInterval(fetchData, 5000); // poll every 5 seconds

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>sno</th>
          <th>datetime</th>
          <th>temperature</th>
          <th>ph</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            <td>{row.sno}</td>
            <td>{formatDate(row.dateTime)}</td>
            <td>{row.temperature}</td>
            <td>{row.ph}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DashboardTable;