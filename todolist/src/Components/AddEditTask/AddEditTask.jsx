import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DatePicker from "react-datepicker";
import styles from "./AddEditTask.module.css";
import "react-datepicker/dist/react-datepicker.css";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import { AllDataProvider } from "../DataProvider/DataProvider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
const AddEditTask = () => {
  const {
    setopenDialogModal,
    setNotifi,
    setMessage,
    TaskType,
    TodoList,
    ParticularData,
    setTodoList,
  } = AllDataProvider();
  const [Task, setTask] = useState({
    type: "",
    task: "",
    date_type: "Today",
    startDate: new Date(),
  });
  const [error, setError] = useState({
    errortype: false,
    errortask: false,
  });

  useEffect(() => {
    if (TaskType === "Edit") {
      setTask(ParticularData);
    }
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (value === "Today") {
      setTask((values) => ({
        ...values,
        [name]: value,
        startDate: new Date(),
      }));
    } else {
      setTask((values) => ({ ...values, [name]: value.trim() }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError((prev) => {
      return {
        ...prev,
        errortype: Task.type === "",
        errortask: Task.task === "",
      };
    });
    if (!Object.values(Task).every((val) => val)) return;

    if (TaskType === "Add") {
      setTodoList((prev) => {
        return [...prev, { id: Math.random(), ...Task }].sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        );
      });
      setMessage("Created Successfully");
      setNotifi(true);
    } else {
      let data = TodoList.map((e) => (e.id === Task.id ? Task : e)).sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
      );
      setTodoList(data);
      localStorage.setItem("task",JSON.stringify(data))
      setMessage("Updated Successfully");
      setNotifi(true);
    }

    setopenDialogModal(false);
  };
  return (
    <Box
      sx={{ marginTop: "1rem" }}
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <TextField
            fullWidth
            label="Type"
            type="text"
            name="type"
            placeholder="Gym, Grocery etc..."
            value={Task.type || ""}
            onChange={handleChange}
            helperText={error.errortype && "This Field Is Required"}
          />
        </Grid>
        <Grid item xs={6} md={8}>
          <TextField
            fullWidth
            label="Task"
            type="text"
            name="task"
            multiline
            maxRows={4}
            value={Task.task || ""}
            onChange={handleChange}
            helperText={error.errortask && "This Field Is Required"}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Schedule
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="date_type"
                value={Task.date_type || ""}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Today"
                  control={<Radio />}
                  label="Today"
                />
                <FormControlLabel
                  value="Future"
                  control={<Radio />}
                  label="Future"
                />
              </RadioGroup>
            </FormControl>
            {Task.date_type === "Today" && (
              <>
                <Typography variant="subtitle1">
                  {new Date().toLocaleDateString()}
                </Typography>
              </>
            )}
            {Task.date_type === "Future" && (
              <>
                <Box sx={{ width: { md: "30%", xs: "100%" } }}>
                  <DatePicker
                    selected={Task.startDate}
                    onChange={(date) => setTask({ ...Task, startDate: date })}
                    // onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    isClearable={true}
                    withPortal
                    required
                    minDate={new Date()}
                    placeholderText="dd/mm/yyyy "
                    className={styles.DatePicker}
                  />
                </Box>
              </>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} textAlign="end">
          <Button
            variant="contained"
            type="submit"
            startIcon={
              TaskType === "Add" ? (
                <PostAddRoundedIcon />
              ) : (
                <KeyboardDoubleArrowUpRoundedIcon />
              )
            }
          >
            {TaskType === "Add" ? "Add Task" : "Update Task"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddEditTask;
