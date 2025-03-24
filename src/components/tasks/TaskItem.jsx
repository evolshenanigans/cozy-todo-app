import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Checkbox,
  Chip,
  Box,
  LinearProgress,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Tooltip,
} from '@mui/material';
import {
  Delete,
  Edit,
  MoreVert,
  FlagCircle,
  CalendarToday,
  Category,
  AssignmentTurnedIn,
} from '@mui/icons-material';
import { format } from 'date-fns';
import {
  setCurrentTask,
  updateTask,
  deleteTask,
} from '../../redux/actions/taskActions';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleEdit = () => {
    dispatch(setCurrentTask(task));
    setMenuAnchor(null);
  };

  const handleToggleComplete = () => {
    dispatch(
      updateTask(task._id, {
        ...task,
        completed: !task.completed,
        progress: task.completed ? task.progress : 100,
      })
    );
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
    setMenuAnchor(null);
  };

  const confirmDelete = () => {
    dispatch(deleteTask(task._id));
    setDeleteDialogOpen(false);
  };

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
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

  const getProgressColor = (progress) => {
    if (progress < 30) return '#f44336';
    if (progress < 70) return '#ff9800';
    return '#4caf50';
  };

  return (
    <>
      <Card 
        sx={{ 
          mb: 2,
          borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
          opacity: task.completed ? 0.8 : 1,
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        }}
      >
        <CardContent sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={task.completed}
                onChange={handleToggleComplete}
                color="primary"
              />
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? 'text.secondary' : 'text.primary',
                }}
              >
                {task.title}
              </Typography>
            </Box>
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
          </Box>
          
          {task.description && (
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                ml: 5, 
                mb: 2,
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.description}
            </Typography>
          )}
          
          <Box sx={{ ml: 5 }}>
            <LinearProgress 
              variant="determinate" 
              value={task.progress} 
              sx={{ 
                height: 8, 
                borderRadius: 5, 
                mb: 2,
                backgroundColor: 'rgba(0,0,0,0.05)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getProgressColor(task.progress),
                },
              }} 
            />
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, ml: 5 }}>
            <Chip
              icon={<FlagCircle sx={{ color: getPriorityColor(task.priority) }} />}
              label={`${task.priority.charAt(0).toUpperCase()}${task.priority.slice(1)} Priority`}
              size="small"
              variant="outlined"
            />
            
            <Chip
              icon={<Category />}
              label={task.category}
              size="small"
              variant="outlined"
            />
            
            {task.dueDate && (
              <Chip
                icon={<CalendarToday />}
                label={`Due: ${format(new Date(task.dueDate), 'MMM d, yyyy')}`}
                size="small"
                variant="outlined"
                color={new Date(task.dueDate) < new Date() ? 'error' : 'default'}
              />
            )}
            
            {task.completed && (
              <Chip
                icon={<AssignmentTurnedIn />}
                label="Completed"
                size="small"
                color="success"
              />
            )}
          </Box>
        </CardContent>
        
        <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={handleEdit} color="primary">
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={handleDelete} color="error">
              <Delete />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
      
      {/* Task Options Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit Task" />
        </MenuItem>
        <MenuItem onClick={handleToggleComplete}>
          <ListItemIcon>
            <AssignmentTurnedIn fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={task.completed ? 'Mark as Incomplete' : 'Mark as Complete'} />
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="Delete Task" sx={{ color: 'error.main' }} />
        </MenuItem>
      </Menu>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the task "{task.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskItem;