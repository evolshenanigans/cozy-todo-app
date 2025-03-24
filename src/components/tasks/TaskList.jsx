import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Paper,
  Alert,
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import { Search, Clear, FilterList } from '@mui/icons-material';
import { getTasks, filterTasks, clearFilter, setTaskCategory } from '../../redux/actions/taskActions';
import TaskItem from './TaskItem';

const TaskList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks, filtered, loading, error, categories } = useSelector((state) => state.task);

  const [searchText, setSearchText] = useState('');
  const [view, setView] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    if (user) {
      dispatch(getTasks(user._id));
    }
  }, [dispatch, user]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    if (e.target.value !== '') {
      dispatch(filterTasks(e.target.value));
    } else {
      dispatch(clearFilter());
    }
  };

  const clearSearch = () => {
    setSearchText('');
    dispatch(clearFilter());
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    dispatch(setTaskCategory(e.target.value));
  };

  const handleViewChange = (event, newValue) => {
    setView(newValue);
  };

  const filterTasksByView = (taskList) => {
    if (!taskList) return [];
    
    switch (view) {
      case 'active':
        return taskList.filter(task => !task.completed);
      case 'completed':
        return taskList.filter(task => task.completed);
      default:
        return taskList;
    }
  };

  const filterTasksByCategory = (taskList) => {
    if (!taskList) return [];
    if (categoryFilter === 'All') return taskList;
    
    return taskList.filter(task => task.category === categoryFilter);
  };

  const getFilteredTasks = () => {
    const taskList = filtered || tasks;
    const tasksByView = filterTasksByView(taskList);
    return filterTasksByCategory(tasksByView);
  };

  const displayTasks = getFilteredTasks();

  const renderTasks = () => {
    if (loading) {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1">Loading tasks...</Typography>
        </Box>
      );
    }

    if (error) {
      return (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      );
    }

    if (displayTasks.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            {filtered
              ? 'No tasks match your search'
              : view === 'completed'
              ? 'No completed tasks'
              : view === 'active'
              ? 'No active tasks'
              : categoryFilter !== 'All'
              ? `No tasks in the ${categoryFilter} category`
              : 'No tasks yet. Add your first task!'}
          </Typography>
          {filtered && (
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={clearSearch} 
              sx={{ mt: 2 }}
            >
              Clear Search
            </Button>
          )}
        </Box>
      );
    }

    return displayTasks.map((task) => (
      <TaskItem key={task._id} task={task} />
    ));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 3, bgcolor: 'background.paper' }}>
        <Typography variant="h5" component="h2" mb={3} color="primary">
          Your Tasks
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search tasks..."
            value={searchText}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: searchText && (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={clearSearch} size="small">
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="small"
          />

          <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="category-filter-label">Category</InputLabel>
            <Select
              labelId="category-filter-label"
              id="category-filter"
              value={categoryFilter}
              onChange={handleCategoryChange}
              label="Category"
              startAdornment={
                <InputAdornment position="start">
                  <FilterList />
                </InputAdornment>
              }
            >
              <MenuItem value="All">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={view} onChange={handleViewChange} aria-label="task views">
            <Tab label="All" value="all" />
            <Tab label="Active" value="active" />
            <Tab label="Completed" value="completed" />
          </Tabs>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box>{renderTasks()}</Box>
      </Box>
    </Paper>
  );
};

export default TaskList;