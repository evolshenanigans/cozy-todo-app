import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  InputAdornment,
  Stack,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  AddTask,
  Edit,
  CalendarMonth,
  Category,
  FlagCircle,
  Cancel,
  Save,
} from '@mui/icons-material';
import { addTask, updateTask, clearCurrentTask } from '../../redux/actions/taskActions';
import { validateTask, isFormValid } from '../../utils/validation';

const TaskForm = () => {
  const dispatch = useDispatch();
  const { currentTask, loading, categories } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.auth);

  const initialFormState = {
    title: '',
    description: '',
    priority: 'medium',
    dueDate: null,
    category: 'Other',
    progress: 0,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (currentTask) {
      setFormData({
        title: currentTask.title || '',
        description: currentTask.description || '',
        priority: currentTask.priority || 'medium',
        dueDate: currentTask.dueDate ? new Date(currentTask.dueDate) : null,
        category: currentTask.category || 'Other',
        progress: currentTask.progress || 0,
      });
      setTouched({});
      setErrors({});
    } else {
      setFormData(initialFormState);
    }
  }, [currentTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (touched[name]) {
      const validationErrors = validateTask({
        ...formData,
        [name]: value,
      });
      setErrors({
        ...errors,
        [name]: validationErrors[name],
      });
    }
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dueDate: date,
    });
    
    if (touched.dueDate) {
      const validationErrors = validateTask({
        ...formData,
        dueDate: date,
      });
      setErrors({
        ...errors,
        dueDate: validationErrors.dueDate,
      });
    }
  };

  const handleSliderChange = (e, newValue) => {
    setFormData({
      ...formData,
      progress: newValue,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
    
    const validationErrors = validateTask(formData);
    setErrors({
      ...errors,
      [name]: validationErrors[name],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateTask(formData);
    setErrors(validationErrors);
    
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    if (isFormValid(validationErrors)) {
      if (currentTask) {
        dispatch(updateTask(currentTask._id, {
          ...formData,
          userId: user._id,
        }));
      } else {
        dispatch(addTask({
          ...formData,
          userId: user._id,
        }));
      }
      
      setFormData(initialFormState);
      setTouched({});
      setErrors({});
      
      if (currentTask) {
        dispatch(clearCurrentTask());
      }
    }
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setTouched({});
    setErrors({});
    dispatch(clearCurrentTask());
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#ff9800';
      case 'low':
        return '#4caf50';
      default:
        return '#ff9800';
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 3,
        background: 'rgba(255, 253, 247, 0.95)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Typography variant="h5" component="h2" mb={3} color="primary">
        {currentTask ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Edit sx={{ mr: 1 }} />
            Edit Task
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AddTask sx={{ mr: 1 }} />
            Add New Task
          </Box>
        )}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Task Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.title && errors.title)}
          helperText={touched.title && errors.title}
          disabled={loading}
          sx={{ mb: 2 }}
        />

        <TextField
          margin="normal"
          fullWidth
          id="description"
          label="Description"
          name="description"
          multiline
          rows={3}
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.description && errors.description)}
          helperText={touched.description && errors.description}
          disabled={loading}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              disabled={loading}
              startAdornment={
                <InputAdornment position="start">
                  <FlagCircle sx={{ color: getPriorityColor(formData.priority) }} />
                </InputAdornment>
              }
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={loading}
              startAdornment={
                <InputAdornment position="start">
                  <Category />
                </InputAdornment>
              }
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
            <DatePicker
              label="Due Date"
              value={formData.dueDate}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: Boolean(touched.dueDate && errors.dueDate),
                  helperText: touched.dueDate && errors.dueDate,
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonth />
                      </InputAdornment>
                    ),
                  },
                },
              }}
            />

            <Box sx={{ width: '100%' }}>
              <Typography gutterBottom>Progress ({formData.progress}%)</Typography>
              <Slider
                value={formData.progress}
                onChange={handleSliderChange}
                aria-labelledby="progress-slider"
                valueLabelDisplay="auto"
                step={5}
                marks
                min={0}
                max={100}
                disabled={loading}
                sx={{
                  color: formData.progress < 30 ? '#f44336' : formData.progress < 70 ? '#ff9800' : '#4caf50',
                }}
              />
            </Box>
          </Box>
        </LocalizationProvider>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {currentTask && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<Cancel />}
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={currentTask ? <Save /> : <AddTask />}
            disabled={loading}
          >
            {loading ? 'Saving...' : currentTask ? 'Update Task' : 'Add Task'}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default TaskForm;