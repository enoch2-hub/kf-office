import React, { useState, useEffect } from 'react';

import './FileList.css';

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch the data (mock or real API call)
    fetch('/api/files')
      .then((response) => response.json())
      .then((data) => setFiles(data));
  }, []);

  return (
    <div className="container">
      <h2>Container Files</h2>
      <table className="table">
        <thead>
          <tr>
            <th>File No.</th>
            <th>Store</th>
            <th>P/I</th>
            <th>Ord. Dt</th>
            <th>Sh-Doc.Arr.Dt</th>
            <th>DO.Arr.Dt</th>
            <th>Arrival Dt</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.fileNo}>
              <td>{file.fileNo}</td>
              <td>{file.store}</td>
              <td>{file.pi}</td>
              <td>{file.ordDt}</td>
              <td>{file.shDocArrDt}</td>
              <td>{file.doArrDt}</td>
              <td>{file.arrivalDt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;
