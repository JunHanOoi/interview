import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { tableData } from "./tableData";
import "./Home.css";
import Modal from "react-modal";
import ReactPaginate from "react-paginate";

const HomeTab = () => {
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredTableData, setFilteredTableData] = useState(tableData);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedData = filteredTableData.slice(startIndex, endIndex);
    setSlicedTableData(slicedData);
  }, [currentPage, itemsPerPage, filteredTableData]);

  const [slicedTableData, setSlicedTableData] = useState([]);

  const data = [
    {
      id: "1",
      name: "USA",
      children: [
        {
          id: "3",
          name: "California",
          children: [
            {
              id: "7",
              name: "Los Angeles",
            },
            {
              id: "8",
              name: "San Francisco",
            },
            {
              id: "9",
              name: "San Diego",
            },
          ],
        },
        {
          id: "4",
          name: "New York",
          children: [
            {
              id: "10",
              name: "New York City",
            },
            {
              id: "11",
              name: "Buffalo",
            },
            {
              id: "12",
              name: "Rochester",
            },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Canada",
      children: [
        {
          id: "5",
          name: "Ontario",
          children: [
            {
              id: "13",
              name: "Toronto",
            },
            {
              id: "14",
              name: "Ottawa",
            },
            {
              id: "15",
              name: "Hamilton",
            },
          ],
        },
        {
          id: "6",
          name: "Quebec",
          children: [
            {
              id: "16",
              name: "Montreal",
            },
            {
              id: "17",
              name: "Quebec City",
            },
            {
              id: "18",
              name: "Laval",
            },
          ],
        },
      ],
    },
  ];

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      onClick={() => handleNodeSelect(nodes.name)}
      sx={{
        fontSize: "1.5rem",
        "& .MuiTreeItem-label": {
          fontSize: "1.5rem",
        },
      }}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((child) => renderTree(child))
        : null}
    </TreeItem>
  );

  const handleViewButtonClick = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalOpen(true);
    console.log(selectedRowData);
  };

  const handleNodeSelect = (node) => {
    const filteredData = tableData.filter((row) => row.country === node);
    const filteredData1 = tableData.filter((row) => row.state === node);
    const filteredData2 = tableData.filter((row) => row.city === node);
    setFilteredTableData(filteredData);
    setCurrentPage(0);
    if (filteredData.length === 0) {
      setFilteredTableData(filteredData1);
      setCurrentPage(0);
      if (filteredData1.length === 0) {
        setFilteredTableData(filteredData2);
        setCurrentPage(0);
      }
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const homeStyle = {
    flex: 3,
  };
  const customModalStyles = {
    content: {
      width: "500px",
      height: "300px", 
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      padding: "20px", 
    },
  };

  return (
    <div style={homeStyle}>
      <div style={{ float: "left", width: "30%" }}>
        <h1 style={{ marginTop: 20, marginLeft: 20, flexGrow: 1 }}>Home Tab</h1>
        <Box
          sx={{
            minHeight: 300,
            flexGrow: 1,
            maxWidth: 300,
            marginLeft: 2,
            marginTop: 5,
            border: 1,
          }}
        >
          <TreeView
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={["1"]}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {renderTree(data[0])}
            {renderTree(data[1])}
          </TreeView>
        </Box>
      </div>
      <div style={{ float: "left", width: "70%" , marginTop: '100px'}}>
        <div className="data-table" style={{ flex: 1 }}>
          <table id="customers">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th>Pin Code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {slicedTableData.map((row, index) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.address}</td>
                  <td>{row.country}</td>
                  <td>{row.state}</td>
                  <td>{row.city}</td>
                  <td>{row.pinCode}</td>
                  <td>
                    <button onClick={() => handleViewButtonClick(row)}>
                      View
                    </button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={Math.ceil(filteredTableData.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Customer Details"
            style={customModalStyles}
          >
            <h2 style={{ marginBottom: "20px" }}>View Customer Details</h2>
            {selectedRowData && (
              <div>
                <p>
                  Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
                  {selectedRowData.name}
                </p>
                <p>Address&nbsp;: {selectedRowData.address}</p>
                <p>Country&nbsp;: {selectedRowData.country}</p>
                <p>
                  State&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
                  {selectedRowData.state}
                </p>
                <p>
                  City&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
                  {selectedRowData.city}
                </p>
                <p>Pin Code: {selectedRowData.pinCode}</p>
              </div>
            )}
            <button onClick={closeModal} style={{ marginTop: "20px" }}>
              Close
            </button>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
