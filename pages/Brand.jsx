import React, { useCallback, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import { useSnackbar } from "notistack";
import { Button,Typography } from "@material-tailwind/react";
import {
  CloudArrowUpIcon,
} from "@heroicons/react/24/outline";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
  ThemeProvider,
} from "@mui/material";
import { ExportToCsv } from "export-to-csv";
import {
  Delete,
  Edit,
  FileDownloadOutlined,
  PrintOutlined,
  AddOutlined,
  FileUploadOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { useMediaQuery } from 'react-responsive';
import Header from "@/components/Header";
import DashboardNavbar from "@/components/DashNav";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import readXlsxFile from "read-excel-file";

const columns = [
  {
    accessorKey: "BrandName",
    header: "BrandName",
    size: "80",
  },
  {
    accessorKey: "Description",
    header: "Description",
  },
];

const csvOptions = {
  filename: "Brand",
  fieldSeparator: ",",
  quoteStrings: '"',
  decimalSeparator: ".",
  showLabels: true,
  useBom: true,
  useKeysAsHeaders: false,
  headers: columns.map((c) => c.header),
};

const csvExporter = new ExportToCsv(csvOptions);

const Brand = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const isTablet = useMediaQuery({ maxWidth: 768 });

  const handleExportRows = (rows) => {
    const filteredRows = rows.map((row) => {
      const { BrandId, ...rest } = row.original; // exclude the BrandId field
      return rest; // return the remaining fields
    });
    csvExporter.generateCsv(filteredRows);
  };

  const handleExportData = () => {
    const dataToExport = tableData.map((row) => {
      // create a new object without the 'BrandId' field
      const { BrandId, ...rest } = row;
      return rest;
    });
    csvExporter.generateCsv(dataToExport);
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("Brand Master", 20, 10);

    const formattedData = tableData.map((item) => {
      return [item.BrandName, item.Description];
    });
    doc.autoTable({
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.BrandName })),
      body: formattedData,
    });
//    doc.save("Brand.pdf");
    doc.autoPrint();
    doc.output('dataurlnewwindow');
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://node-api-production-8723.up.railway.app/api/brand/fetchBrand`,
      );
      console.log(response)
      setTableData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [setTableData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    const updatedValues = { ...values, BrandId: row.original.BrandId };
    try {
      await axios.post(
        `${API_URL}/api/brand/SaveBrand`,
        updatedValues
      );
      await fetchData(setTableData);
      enqueueSnackbar("Brand updated successfully!", { variant: "success" });
      exitEditingMode();
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Failed to update brand!", { variant: "error" });
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      console.log(row);
      enqueueSnackbar(`Are you sure you want to delete the brand?`, {
        variant: "warning",
        persist: true,
        action: (key) => (
          <>
            <Button
              onClick={() => {
                deleteBrand();
                closeSnackbar(key);
              }}
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                closeSnackbar(key);
              }}
            >
              No
            </Button>
          </>
        ),
      });

      const deleteBrand = async () => {
        try {
          await axios.post(
            `${API_URL}/api/brand/DeleteBrand`,
            {
              BrandId: row.original.BrandId,
            }
          );
          setTableData((prevState) =>
            prevState.filter((item) => item.BrandId !== row.BrandId)
          );
          await fetchData(setTableData);
          enqueueSnackbar("Brand deleted successfully!", {
            variant: "success",
          });
        } catch (error) {
          console.log("Error deleting brand:", error);
          enqueueSnackbar("Failed to delete brand!", { variant: "error" });
        }
      };
    },
    [fetchData, closeSnackbar, enqueueSnackbar]
  );

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    readXlsxFile(file).then((rows) => {
      rows.shift();
      const newData = rows.map(row => ({
        BrandId: 0,
        BrandName: row[0],
        Description: row[1]
      }));
      console.log('newDataa:', newData); // debug line
      handleInsertData(newData);
    });
  };


  const handleInsertData = async (newData) => {
    console.log('newData:', newData); // debug line
    try {
      const response = await axios.post(`${API_URL}/api/brand/SaveBrand`, newData);
      console.log('response:', response); // debug line
      if (response.status === 200) {
        fetchData();
        enqueueSnackbar('Data inserted successfully!', { variant: 'success' });
      } else {
        console.log('Insert failed');
        enqueueSnackbar('Data insertion failed!', { variant: 'error' });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Error inserting data!', { variant: 'error' });
    }
  };

  return (
    <div className='bg-gray-100 min-h-screen font-poppinsBold'>
      <div className='p-4'>
      {isTablet ? <Header /> : <DashboardNavbar />}
      </div>
      <div className="p-4">
     <Box className='w-full m-auto border rounded-lg bg-white overflow-y-auto'>
      <div className="w-full" >
        <MaterialReactTable
          displayColumnDefOptions={{
            "mrt-row-actions": {
              muiTableHeadCellProps: {
                align: "center",
              },
              size: 120,
            },
          }}
          columns={columns}
          data={tableData}
          enableStickyHeader
          enableStickyFooter
          muiTableContainerProps={{ sx: { maxHeight: "480px" } }}
          editingMode="modal" //default
          enableColumnOrdering
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          renderRowActions={({ row, table }) => (
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}
            >
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={({ table }) => (
            <Box className="flex flex-wrap gap-2">
              <Button
                color="blue"
                onClick={() => setCreateModalOpen(true)}
                variant="gradient"
                className="flex items-center gap-1"
              >
                <AddOutlined strokeWidth={2} className="h-5 w-5" />
                Create
              </Button>
              <Button
                color="blue"
                //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                onClick={handleExportData}
                variant="gradient"
                className="flex items-center gap-1"
              >
                <FileDownloadOutlined strokeWidth={2} className="h-5 w-5" />
                Export All Data
              </Button>
              <Button
                color="red"
                onClick={downloadPdf}
                variant="gradient"
                className="flex items-center gap-1"
              >
                <PrintOutlined strokeWidth={2} className="h-5 w-5" />
                Print as PDF
              </Button>

              <Button
                variant="gradient"
                color="green"
                className="flex items-center gap-1"
              >
                <CloudArrowUpIcon strokeWidth={2} className="h-5 w-5" />
                Upload
                <input hidden accept=".xlsx, .csv, .xls" type="file" onChange={handleFileUpload} />
              </Button>

            </Box>
          )}
          options={{
            tableLayout: "auto",
          }}
        />
        <CreateNewAccountModal
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateNewRow}
          fetchData={fetchData}
          setTableData={setTableData}
        />
      </div>
     </Box>
     </div>
    </div>
  );
};

//creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({
  open,
  columns,
  onClose,
  onSubmit,
  fetchData,
  setTableData,
}) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    try {
      const updatedValues = { ...values, BrandId: 0 };

      await axios.post(
        `${API_URL}/api/brand/SaveBrand`,
        updatedValues
      );

      await fetchData(setTableData);
      enqueueSnackbar("Brand created successfully!", { variant: "success" });
      onClose();
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Failed to create brand!", { variant: "error" });
    }
  };


  const isNonMobile = useMediaQuery({ minWidth: 600 }); 
//  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
      <Dialog
        open={open}
        fullWidth={true}
      >
        <DialogTitle textAlign="center">Brand Master</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& >div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {columns.map((column, index) => (
                <TextField
                  key={index}
                  fullWidth
                  variant="filled"
                  label={column.header}
                  name={column.accessorKey}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                  sx={{ gridColumn: "span 4" }}
                />
              ))}
            </Box>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button color="blue" onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button color="blue" onClick={handleSubmit} variant="filled">
            Create
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default Brand;
