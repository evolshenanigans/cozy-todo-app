import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Alert,
  Button,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  AccessTime,
  AssignmentTurnedIn,
  Flag,
  PendingActions,
  Refresh,
} from '@mui/icons-material';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';
import Loader from '../components/common/Loader';
import { getTasks } from '../redux/actions/taskActions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useSelector((state) => state.auth);
  const { tasks, loading, error } = useSelector((state) => state.task);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  
  useEffect(() => {
    let timer;
    if (loading && !initialLoadComplete) {
      timer = setTimeout(() => {
        setLoadingTimeout(true);
      }, 5000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loading, initialLoadComplete]);
  
  useEffect(() => {
    if (!loading && !initialLoadComplete) {
      setInitialLoadComplete(true);
    }
    
    if (error && !initialLoadComplete) {
      setInitialLoadComplete(true);
    }
  }, [loading, error, initialLoadComplete]);
  
  useEffect(() => {
    if (user && user._id) {
      dispatch(getTasks(user._id));
    }
  }, [dispatch, user]);
  
  const handleRefresh = () => {
    setInitialLoadComplete(false);
    setLoadingTimeout(false);
    if (user && user._id) {
      dispatch(getTasks(user._id));
    }
  };
  
  if (loading && !initialLoadComplete) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {loadingTimeout ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Alert severity="warning" sx={{ mb: 3 }}>
              It's taking longer than expected to load your tasks. There might be an issue with your data.
            </Alert>
            <Button 
              variant="contained"
              color="primary"
              startIcon={<Refresh />}
              onClick={handleRefresh}
              sx={{ mt: 2 }}
            >
              Try Again
            </Button>
          </Box>
        ) : (
          <Loader message="Loading your tasks..." timeout={5000} />
        )}
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Error loading tasks: {error}
        </Alert>
        <Button 
          variant="contained"
          color="primary"
          startIcon={<Refresh />}
          onClick={handleRefresh}
        >
          Try Again
        </Button>
      </Container>
    );
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const highPriorityTasks = tasks.filter((task) => task.priority === 'high').length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const statsCards = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: <AccessTime color="primary" />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Completed',
      value: completedTasks,
      icon: <AssignmentTurnedIn color="success" />,
      color: theme.palette.success.main,
    },
    {
      title: 'Pending',
      value: pendingTasks,
      icon: <PendingActions color="warning" />,
      color: theme.palette.warning.main,
    },
    {
      title: 'High Priority',
      value: highPriorityTasks,
      icon: <Flag color="error" />,
      color: theme.palette.error.main,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        py: 4,
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            color="primary"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            {`Hello, ${user?.username || 'User'}!`}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Here's an overview of your tasks for today
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statsCards.map((card, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderTop: `4px solid ${card.color}`,
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {card.title}
                    </Typography>
                    {card.icon}
                  </Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: card.color }}>
                    {card.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          {!isMobile && (
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'sticky', top: 24 }}>
                <TaskForm />
                
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: 'background.paper',
                  }}
                >
                  <Typography variant="h6" color="primary" gutterBottom>
                    Task Completion
                  </Typography>
                  <Typography variant="h4" color="text.primary" gutterBottom>
                    {completionRate.toFixed(0)}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={completionRate}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      mb: 2,
                      backgroundColor: 'rgba(0,0,0,0.05)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor:
                          completionRate < 30
                            ? theme.palette.error.main
                            : completionRate < 70
                            ? theme.palette.warning.main
                            : theme.palette.success.main,
                      },
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {completedTasks} of {totalTasks} tasks completed
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          )}
          
          <Grid item xs={12} md={isMobile ? 12 : 8}>
            {isMobile && <TaskForm />}
            <TaskList />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;