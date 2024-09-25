import React, { useState } from 'react';

import './FileList.css';

const FileList2 = () => {
  const [files, setFiles] = useState([
    {
      fileNo: 327,
      store: 'Sabic',
      pi: '4949642',
      ordDt: '',
      shDocArrDt: '24/09/2024',
      doArrDt: '29/09/2024',
      arrivalDt: '',
    },
    {
      fileNo: 328,
      store: 'Sabic',
      pi: '4949643',
      ordDt: '',
      shDocArrDt: '24/09/2025',
      doArrDt: '29/09/2025',
      arrivalDt: '',
    },
    {
      fileNo: 329,
      store: 'Sabic',
      pi: '4949644',
      ordDt: '',
      shDocArrDt: '',
      doArrDt: '',
      arrivalDt: '',
    },
    {
      fileNo: 330,
      store: 'Sabic',
      pi: '4953681',
      ordDt: '',
      shDocArrDt: '',
      doArrDt: '',
      arrivalDt: '',
    },
    {
      fileNo: 331,
      store: 'Polymet',
      pi: 'SO2024250568',
      ordDt: '',
      shDocArrDt: '',
      doArrDt: '',
      arrivalDt: '',
    },
  ]);

  // Function to add a new container entry
  const addFile = () => {
    const newFile = {
      fileNo: files.length + 327,
      store: 'New Store',
      pi: 'New P/I',
      ordDt: '',
      shDocArrDt: '',
      doArrDt: '',
      arrivalDt: '',
    };
    setFiles([...files, newFile]);
  };

  // Function to delete a container entry
  const deleteFile = (fileNo) => {
    setFiles(files.filter((file) => file.fileNo !== fileNo));
  };

  return (
    <div className="container">
      <h2>Container Files</h2>
      <button onClick={addFile}>Add New Container</button>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.fileNo}>
              <td>{file.fileNo}</td>
              <td>{file.store}</td>
              <td>{file.pi}</td>
              <td>{file.ordDt || 'N/A'}</td>
              <td>{file.shDocArrDt || 'N/A'}</td>
              <td>{file.doArrDt || 'N/A'}</td>
              <td>{file.arrivalDt || 'N/A'}</td>
              <td>
                <button onClick={() => deleteFile(file.fileNo)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList2;
