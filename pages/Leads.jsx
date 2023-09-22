import React, { useCallback, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import { useSnackbar } from "notistack";
import { Button, Typography } from "@material-tailwind/react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
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
  FormControl,
  InputLabel,
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
import { useMediaQuery } from "react-responsive";
import Header from "@/components/Header";
import DashboardNavbar from "@/components/DashNav";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import readXlsxFile from "read-excel-file";

const columns = [
  {
    accessorKey: "CompanyName",
    header: "CompanyName",
  },
  {
    accessorKey: "Date",
    header: "Date",
  },
  {
    accessorKey: "Address",
    header: "Address",
  },
  {
    accessorKey: "Phone",
    header: "Phone",
  },
  {
    accessorKey: "Name",
    header: "Name",
  },
  {
    accessorKey: "Title",
    header: "Title",
  },
  {
    accessorKey: "Email",
    header: "Email",
  },
  {
    accessorKey: "MobileNo",
    header: "MobileNo",
  },
  {
    accessorKey: "Website",
    header: "Website",
  },
  {
    accessorKey: "Source",
    header: "Source",
  },
  {
    accessorKey: "Status",
    header: "Status",
  },
  {
    accessorKey: "QueryType",
    header: "QueryType",
  },
  {
    accessorKey: "NoOfEmp",
    header: "NoOfEmp",
  },
  {
    accessorKey: "AnnualRevenue",
    header: "AnnualRevenue",
  },
  {
    accessorKey: "Rating",
    header: "Rating",
  },
  {
    accessorKey: "Remarks",
    header: "Remarks",
  },
  {
    accessorKey: "AssignTo",
    header: "AssignTo",
  },
  {
    accessorKey: "FlowupDate",
    header: "FlowupDate",
  },
];

const csvOptions = {
  filename: "Lead",
  fieldSeparator: ",",
  quoteStrings: '"',
  decimalSeparator: ".",
  showLabels: true,
  useBom: true,
  useKeysAsHeaders: false,
  headers: columns.map((c) => c.header),
};

const csvExporter = new ExportToCsv(csvOptions);

const Leads = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const isTablet = useMediaQuery({ maxWidth: 768 });

  const handleExportData = () => {
    const dataToExport = tableData.map((row) => {
      // create a new object without the 'BrandId' field
      const {
        Id,
        EditDate,
        CreatedDate,
        EditUid,
        CreatedUid,
        CompId,
        BranchId,
        ...rest
      } = row;
      return rest;
    });
    csvExporter.generateCsv(dataToExport);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.post(
        "http://103.30.72.63/eCRM/api/Leads/FetchLeads",
        { Id: 0 }
      );
      //console.log(response.data)
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

  const handleDeleteRow = useCallback(
    async (row) => {
      console.log(row.original.Id);
      enqueueSnackbar(`Are you sure you want to delete the Lead?`, {
        variant: "warning",
        persist: true,
        action: (key) => (
          <>
            <Button color="green"
              onClick={() => {
                deleteBrand();
                closeSnackbar(key);
              }}
            >
              Yes
            </Button>
            <Button color="red"
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
          await axios.post(`http://103.30.72.63/eCRM/api/Leads/DeleteLeads`, {
            Id: row.original.Id,
          });
          setTableData((prevState) =>
            prevState.filter((item) => item.Id !== row.Id)
          );
          await fetchData(setTableData);
          enqueueSnackbar("Lead deleted successfully!", {
            variant: "success",
          });
        } catch (error) {
          console.log("Error deleting Lead:", error);
          enqueueSnackbar("Failed to delete Lead!", { variant: "error" });
        }
      };
    },
    [fetchData, closeSnackbar, enqueueSnackbar]
  );

  const handleSaveCell = async (cell, value) => {
    try {
      // Extract the relevant data
      const { id, row, column } = cell;
      const originalData = { ...row.original };
      const accessorKey = column.id;

      // Update the original data with the new value
      originalData[accessorKey] = value;

      //console.log(originalData);

      // Make an API request to update the data
      await axios.post(
        "http://103.30.72.63/eCRM/api/Leads/SaveLeads",
        originalData
      );

      // Update the table data
      await fetchData();
      enqueueSnackbar("Lead updated successfully!", {
        variant: "success",
      });
    } catch (error) {
      console.log("Error updating Lead:", error);
      enqueueSnackbar("Failed to update Lead!", { variant: "error" });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-poppinsBold">
      <div className="p-4">{isTablet ? <Header /> : <DashboardNavbar />}</div>
      <div className="p-4">
        <Box className="w-full m-auto border rounded-lg bg-white overflow-y-auto">
          <div className="w-full">
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
              editingMode="cell" //default
              enableColumnOrdering
              enableEditing
              muiTableBodyCellEditTextFieldProps={({ cell }) => ({
                //onBlur is more efficient, but could use onChange instead
                onBlur: (event) => {
                  handleSaveCell(cell, event.target.value);
                },
              })}
              enableRowActions
              renderRowActions={({ row, table }) => (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <Tooltip arrow placement="right" title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteRow(row)}
                    >
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
                    onClick={handleExportData}
                    variant="gradient"
                    className="flex items-center gap-1"
                  >
                    <FileDownloadOutlined strokeWidth={2} className="h-5 w-5" />
                    Export All Data
                  </Button>
                </Box>
              )}
              renderBottomToolbarCustomActions={() => (
                <Typography
                  sx={{ fontStyle: "italic", p: "0 1rem" }}
                  variant="small"
                >
                  Double-Click a Cell to Edit
                </Typography>
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
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState(() => {
    const initialValues = {};
    columns.forEach((column) => {
      initialValues[column.accessorKey] = "";
    });
    return initialValues;
  });

  const handleSubmit = async () => {
    try {
      // Create a new Lead object with default values
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${(
        currentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${currentDate
        .getDate()
        .toString()
        .padStart(2, "0")}T00:00:00`;

      const newLead = {
        Id: 0,
        EditDate: formattedDate,
        CreatedDate: formattedDate,
        EditUid: 1,
        CreatedUid: 1,
        CompId: 1,
        BranchId: 1,
        ...values,
      };

      console.log(newLead);

      // Make an API request to create the new Lead
      await axios.post("http://103.30.72.63/eCRM/api/Leads/SaveLeads", newLead);

      // Update the table data
      await fetchData();

      // Show a success snackbar
      enqueueSnackbar("Lead created successfully!", { variant: "success" });

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error creating Lead:", error);

      // Show an error snackbar
      enqueueSnackbar("Failed to create Lead!", { variant: "error" });
    }
  };

  const isNonMobile = useMediaQuery({ minWidth: 600 });
  //  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog open={open} fullWidth={true}>
      <DialogTitle textAlign="center">Create Lead</DialogTitle>
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
              <React.Fragment key={index}>
                {column.accessorKey === "FlowupDate" ||
                column.accessorKey === "Date" ? (
                  <TextField
                    key={index}
                    fullWidth
                    variant="outlined"
                    label={column.header}
                    name={column.accessorKey}
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => {
                      // Format the date value to "yyyy-MM-ddTHH:mm:ss" before storing it
                      const rawDateValue = e.target.value;
                      const formattedDate = `${rawDateValue}T00:00:00`;
                      setValues({ ...values, [e.target.name]: formattedDate });
                    }}
                    sx={{
                      gridColumn: "span 4",
                      "& input": {
                        padding: "10px",
                      },
                    }}
                  />
                ) : (
                  <TextField
                    key={index}
                    fullWidth
                    variant="outlined"
                    label={column.header}
                    name={column.accessorKey}
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                    sx={{ gridColumn: "span 4" }}
                  />
                )}
              </React.Fragment>
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

export default Leads;
