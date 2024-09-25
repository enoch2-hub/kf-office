import React, { useState } from 'react';

const FileList3 = () => {
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

  const [editCell, setEditCell] = useState({
    row: null,
    column: null,
    value: null,
  });

  // Function to handle starting the edit
  const handleDoubleClick = (row, column, currentValue) => {
    setEditCell({
      row,
      column,
      value: currentValue,
    });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setEditCell((prevEditCell) => ({
      ...prevEditCell,
      value: e.target.value,
    }));
  };

  // Handle when the user clicks away or presses enter
  const handleBlurOrEnter = (fileNo) => {
    const updatedFiles = files.map((file) => {
      if (file.fileNo === fileNo) {
        return {
          ...file,
          [editCell.column]: editCell.value,
        };
      }
      return file;
    });

    setFiles(updatedFiles);
    setEditCell({ row: null, column: null, value: null }); // Exit edit mode
  };

  // Handle keyboard inputs for Enter and Escape
  const handleKeyDown = (e, fileNo) => {
    if (e.key === 'Enter') {
      handleBlurOrEnter(fileNo);
    } else if (e.key === 'Escape') {
      setEditCell({ row: null, column: null, value: null });
    }
  };

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
          {files.map((file, rowIndex) => (
            <tr key={file.fileNo}>
              <td>{file.fileNo}</td>
              {Object.keys(file).map((key, colIndex) => (
                key !== 'fileNo' ? (
                  <td
                    key={key}
                    onDoubleClick={() => handleDoubleClick(rowIndex, key, file[key])}
                  >
                    {editCell.row === rowIndex && editCell.column === key ? (
                      <input
                        type="text"
                        value={editCell.value}
                        onChange={handleInputChange}
                        onBlur={() => handleBlurOrEnter(file.fileNo)}
                        onKeyDown={(e) => handleKeyDown(e, file.fileNo)}
                        autoFocus
                      />
                    ) : (
                      file[key] || 'N/A'
                    )}
                  </td>
                ) : null
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList3;
