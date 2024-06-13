import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridToolbar,
  gridFilteredSortedRowIdsSelector,
  selectedGridRowsSelector,
  gridClasses,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { AllDataProvider } from "./DataProvider/DataProvider";
import AddEditTask from "./AddEditTask/AddEditTask";
import Dialogmodal from "./Modal/Dialogmodal";
import { AdditionalUses } from "./AdditionalUses/AdditionalUses";
const Todo = () => {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up("md"));
  const {
    openDialogModal,
    setopenDialogModal,
    Notifi,
    setNotifi,
    setMessage,
    CustomNoRowsOverlay,
    setTaskType,
    TodoList,
    setTodoList,
    setParticularData,
  } = AllDataProvider();

  const EditDeleteuser = async (type, data) => {
    if (type === "Edit") {
      setTaskType("Edit");
      setParticularData(data);
      setopenDialogModal(true);
    } else {
      let value = TodoList.filter((e) => e.id !== data.id);
      setTodoList(value);
      setMessage("Removed Successfully");
      setNotifi(true);
    }
  };
  const AddEditTaskList = () => {
    setopenDialogModal(true);
    setTaskType("Add");
  };
  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(TodoList));
  }, [TodoList]);
  const ClearButton = () => {
    const ClearLists = () => {
      localStorage.clear();
      setTodoList([]);
      setMessage("Removed All Tasks");
      setNotifi(true);
    };

    return (
      <GridToolbarContainer>
        <Tooltip title="Clear List" arrow>
          <Button
            color="primary"
            variant="contained"
            onClick={ClearLists}
            startIcon={<DeleteIcon />}
          >
            Clear All
          </Button>
        </Tooltip>
      </GridToolbarContainer>
    );
  };
  let columns = [
    {
      id: 2,
      field: "type",
      headerName: "Type",
      width: 200,
      renderCell: ({ row }) => <Typography>{row.type}</Typography>,
    },
    {
      id: 3,
      field: "startdate",
      headerName: "Date",
      width: 150,
      renderCell: ({ row }) => (
        <Typography>{new Date(row.startDate).toLocaleDateString()}</Typography>
      ),
    },
    {
      id: 4,
      field: "task",
      headerName: "Task List",
      width: 500,
      renderCell: ({ row }) => (
        <Typography style={{ whiteSpace: "normal", lineHeight: 1.5 }}>
          {row.task}
        </Typography>
      ),
    },
    {
      id: 5,
      field: "Action",
      width: 150,
      renderCell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => EditDeleteuser("Edit", row)}>
            <ModeEditOutlinedIcon color="info" />
          </IconButton>
          <IconButton onClick={() => EditDeleteuser("Delete", row)}>
            <DeleteOutlinedIcon color="error" />
          </IconButton>
        </Box>
      ),
    },
  ];
  return (
    <>
    {Notifi && <AdditionalUses/>}

      {openDialogModal && (
        <Dialogmodal>
          <AddEditTask />
        </Dialogmodal>
      )}
      <Box sx={{ width: "100%", height: "auto", backgroundColor: "aliceblue" }}>
        <Container sx={{ padding: "1rem" }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: ".5rem",
              padding: "1rem",
              borderTop: 4,
              borderColor: "primary.light",
            }}
          >
            <Stack spacing={3}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h3" sx={{ fontWeight: "300" }}>
                  Vasanth Vijay's To Do List
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <Card
                  sx={{
                    minWidth: 200,
                    borderLeft: 4,
                    borderColor: "primary.light",
                  }}
                >
                  <CardContent>
                    <Stack direction="row" spacing={4}>
                      <IconButton
                        sx={{
                          padding: "15px",
                          backgroundColor: (theme) =>
                            alpha(
                              theme.palette.action.hover,
                              theme.palette.action.selectedOpacity
                            ),
                          "&:hover": {
                            backgroundColor: (theme) =>
                              alpha(
                                theme.palette.action.hover,
                                theme.palette.action.hoverOpacity
                              ),
                          },
                        }}
                      >
                        <FormatListBulletedIcon color="primary" />
                      </IconButton>
                      <Stack alignItems="center">
                        <Typography variant="h6">{TodoList.length}</Typography>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "500" }}
                          color="text.secondary"
                        >
                          Task's
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    minWidth: 200,
                    borderLeft: 4,
                    borderColor: "primary.light",
                  }}
                >
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <IconButton
                        onClick={AddEditTaskList}
                        sx={{
                          backgroundColor: (theme) =>
                            alpha(
                              theme.palette.action.hover,
                              theme.palette.action.selectedOpacity
                            ),
                          "&:hover": {
                            backgroundColor: (theme) =>
                              alpha(
                                theme.palette.action.hover,
                                theme.palette.action.hoverOpacity
                              ),
                          },
                        }}
                      >
                        <AddCircleIcon color="secondary" fontSize="large" />
                      </IconButton>
                      <Stack alignItems="center">
                        <Typography variant="h6">Add Task</Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box
                  sx={{
                    height: "550px",
                    overflowX: "auto",
                    width: isMdScreen ? "80vw" : "100vw",
                  }}
                >
                  <DataGrid
                    getRowHeight={() => 'auto'}
                    initialState={{
                      pagination: {
                        paginationModel: { pageSize: 5, page: 0 },
                      },
                    }}
                    disableRowSelectionOnClick
                    columns={columns.map((column) => ({
                      ...column,
                      sortable: false,
                    }))}
                    rows={TodoList}
                    slots={{
                      noRowsOverlay: () => CustomNoRowsOverlay(),
                      toolbar: () => (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <GridToolbar />
                          <ClearButton />
                        </Box>
                      ),
                    }}
                    sx={{
                      [`& .${gridClasses.cell}`]: {
                        py: 1,
                        display: "flex",
                        alignItems: "center",
                      },
                      boxShadow: 2,
                    }}
                  />
                </Box>
              </Box>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Todo;
