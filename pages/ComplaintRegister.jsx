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
import useAuthStore from "@/zustand/useAuthStore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import readXlsxFile from "read-excel-file";

const columns = [
  {
    accessorKey: "CustomerName",
    header: "CustomerName",
  },
  {
    accessorKey: "Date",
    header: "Date",
  },
  {
    accessorKey: "ComplainNo",
    header: "ComplainNo",
  },
  {
    accessorKey: "ContactName",
    header: "ContactName",
  },
  {
    accessorKey: "ContactNo",
    header: "ContactNo",
  },
  {
    accessorKey: "Address",
    header: "Address",
  },
  {
    accessorKey: "Complain",
    header: "Complain",
  },
  {
    accessorKey: "Assign",
    header: "Assign",
  },
  {
    accessorKey: "Status",
    header: "Status",
  }
];

const csvOptions = {
  filename: "ComplaintRegister",
  fieldSeparator: ",",
  quoteStrings: '"',
  decimalSeparator: ".",
  showLabels: true,
  useBom: true,
  useKeysAsHeaders: false,
  headers: columns.map((c) => c.header),
};

const csvExporter = new ExportToCsv(csvOptions);

const ComplaintRegister = () => {
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
        CreateDate,
        EditUid,
        CreateUid,
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
        "http://103.30.72.63/eCRM/api/Complain/FetchComplainRegister",
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
              enableRowNumbers
      rowNumberMode="original"
              muiTableContainerProps={{ sx: { maxHeight: "480px" } }}
              enableColumnOrdering
              renderTopToolbarCustomActions={({ table }) => (
                <Box className="flex flex-wrap gap-2">
                  <Button
                    color="amber"
                    onClick={() => setCreateModalOpen(true)}
                    variant="gradient"
                    className="flex items-center gap-1"
                  >
                    <AddOutlined strokeWidth={2} className="h-5 w-5" />
                    Create
                  </Button>
                  <Button
                    color="green"
                    onClick={handleExportData}
                    variant="gradient"
                    className="flex items-center gap-1"
                  >
                    <FileDownloadOutlined strokeWidth={2} className="h-5 w-5" />
                    Export All Data
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
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState(() => {
    const initialValues = {};
    columns.forEach((column) => {
      initialValues[column.accessorKey] = "";
    });
    return initialValues;
  });

  const user = useAuthStore(state => state.user);

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

      const newComplaint = {
        Id: 0,
        EditDate: formattedDate,
        CreateDate: formattedDate,
        EditUid: 1,
        CreateUid: 1,
        CompId: user.CompId,
        BranchId: user.BranchId,
        ...values,
      };

      console.log(newComplaint);

      // Make an API request to create the new Lead
      await axios.post("http://103.30.72.63/eCRM/api/Complain/SaveComplainRegister", newComplaint);

      // Update the table data
      await fetchData();

      // Show a success snackbar
      enqueueSnackbar("Complaint registered successfully!", { variant: "success" });

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error creating Complaint:", error);

      // Show an error snackbar
      enqueueSnackbar("Failed to Register Complaint!", { variant: "error" });
    }
  };

  const isNonMobile = useMediaQuery({ minWidth: 600 });
  //  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog open={open} fullWidth={true}>
      <DialogTitle textAlign="center">Complaint Registration</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Box
            display="grid"
            gap="10px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& >div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {columns.map((column, index) => (
              <React.Fragment key={index}>
                {
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
                      const formattedDate = `${rawDateValue}`;
                      setValues({ ...values, [e.target.name]: formattedDate });
                    }}
                    sx={{
                      gridColumn: "span 4",
                      "& input": {
                        padding: "16px",
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
        <Button color="red" onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button color="green" onClick={handleSubmit} variant="filled">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComplaintRegister;
