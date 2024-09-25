import React, { useState } from 'react';
import './FileList4.css'; // Import your CSS file

const FileList4 = () => {
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

  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // State for new container inputs
  const [newContainer, setNewContainer] = useState({
    fileNo: '',
    store: '',
    pi: '',
    ordDt: '',
    shDocArrDt: '',
    doArrDt: '',
    arrivalDt: '',
  });

  const handleDoubleClick = (row, column, currentValue) => {
    setEditCell({
      row,
      column,
      value: currentValue,
    });
  };

  const handleInputChange = (e) => {
    setEditCell((prevEditCell) => ({
      ...prevEditCell,
      value: e.target.value,
    }));
  };

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

    setHistory([...history.slice(0, historyIndex + 1), files]);
    setHistoryIndex(historyIndex + 1);
    
    setFiles(updatedFiles);
    setEditCell({ row: null, column: null, value: null });
  };

  const handleKeyDown = (e, fileNo) => {
    if (e.key === 'Enter') {
      handleBlurOrEnter(fileNo);
    } else if (e.key === 'Escape') {
      setEditCell({ row: null, column: null, value: null });
    }
  };

  const saveAll = () => {
    console.log("All changes saved!"); // Implement save logic here
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setFiles(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setFiles(history[historyIndex + 1]);
    }
  };

  // Handle new container input changes
  const handleNewContainerChange = (e) => {
    const { name, value } = e.target;
    setNewContainer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding new container
  const handleAddContainer = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (newContainer.fileNo) {
      setFiles((prevFiles) => [
        ...prevFiles,
        { ...newContainer },
      ]);
      setNewContainer({
        fileNo: '',
        store: '',
        pi: '',
        ordDt: '',
        shDocArrDt: '',
        doArrDt: '',
        arrivalDt: '',
      });
    }
  };

  return (
    <div className="container">
      <h2>Container Files</h2>
      <button onClick={saveAll}>Save All</button>
      <button onClick={undo} disabled={historyIndex <= 0}>Undo</button>
      <button onClick={redo} disabled={historyIndex >= history.length - 1}>Redo</button>

      <form onSubmit={handleAddContainer}>
        <h3>Add New Container</h3>
        <input
          type="text"
          name="fileNo"
          placeholder="File No."
          value={newContainer.fileNo}
          onChange={handleNewContainerChange}
          required
        />
        <input
          type="text"
          name="store"
          placeholder="Store"
          value={newContainer.store}
          onChange={handleNewContainerChange}
          required
        />
        <input
          type="text"
          name="pi"
          placeholder="P/I"
          value={newContainer.pi}
          onChange={handleNewContainerChange}
          required
        />
        <input
          type="text"
          name="ordDt"
          placeholder="Ord. Dt"
          value={newContainer.ordDt}
          onChange={handleNewContainerChange}
        />
        <input
          type="text"
          name="shDocArrDt"
          placeholder="Sh-Doc.Arr.Dt"
          value={newContainer.shDocArrDt}
          onChange={handleNewContainerChange}
        />
        <input
          type="text"
          name="doArrDt"
          placeholder="DO.Arr.Dt"
          value={newContainer.doArrDt}
          onChange={handleNewContainerChange}
        />
        <input
          type="text"
          name="arrivalDt"
          placeholder="Arrival Dt"
          value={newContainer.arrivalDt}
          onChange={handleNewContainerChange}
        />
        <button type="submit">Add Container</button>
      </form>

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
                    className={editCell.row === rowIndex && editCell.column === key ? 'editable' : ''}
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

export default FileList4;
