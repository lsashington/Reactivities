import { CssBaseline, Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from "react";
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { useQuery } from '@tanstack/react-query';
import { useActivities } from '../../lib/hooks/useActivities';

function App() {
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const {activities, isPending} = useActivities();
    
    
    const handleSelectActivity = (id: string) => { 
        setSelectedActivity(activities.find(x => x.id === id));
    }
    
    const handleCancelSelectActivity = () => {
        setSelectedActivity(undefined);
    }
    
    const handleOpenForm = (id?: string) => {
        if (id) handleSelectActivity(id);
        else handleSelectActivity();
        setEditMode(true);
    }
    
    const handleFormClose = () => {
        setEditMode(false);
    }
    

    
    return (
        <Box sx={{bgcolor: '#eeeeee', minHeight: '100vh'}}>
            <CssBaseline />
            <NavBar openForm={handleOpenForm} />
            <Container maxWidth='xl' sx={{mt: 3}}>
                {!activities || isPending ? (
                    <Typography>Loading...</Typography>
                ):(
                    <ActivityDashboard
                        activities={activities}
                        selectActivity={handleSelectActivity}
                        cancelSelectActivity={handleCancelSelectActivity}
                        selectedActivity={selectedActivity}
                        editMode={editMode}
                        openForm={handleOpenForm}
                        closeForm={handleFormClose}
                    />
                )}
                
            </Container>
        </Box>
  )
}

export default App
