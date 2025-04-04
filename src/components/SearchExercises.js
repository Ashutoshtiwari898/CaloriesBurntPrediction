import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollBar from './HorizontalScrollBar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
        if (Array.isArray(bodyPartsData)) {
          setBodyParts(['all', ...bodyPartsData]);
        } else {
          console.error("Error: bodyPartsData is not an array", bodyPartsData);
        }
      } catch (error) {
        console.error("Failed to fetch body parts:", error);
      }
    };
  
    fetchExercisesData();
  }, []);
  

  const handleSearch = async () => {
    if (!search || search.trim() === '') return; // Prevents empty searches
  
    try {
      const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises',
        exerciseOptions
      );
  
      if (!Array.isArray(exercisesData)) {
        console.error("Error: exercisesData is not an array", exercisesData);
        return;
      }
  
      const lowerCaseSearch = search.toLowerCase();
      
      const searchedExercises = exercisesData.filter((item) => 
        item.name?.toLowerCase().includes(lowerCaseSearch) || 
        item.target?.toLowerCase().includes(lowerCaseSearch) || 
        item.equipment?.toLowerCase().includes(lowerCaseSearch) || 
        item.bodyPart?.toLowerCase().includes(lowerCaseSearch)
      );
  
      window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
  
      setSearch('');
      setExercises(searchedExercises);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };
  
  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center">
        Awesome Exercises You <br /> Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          height="76px"
          sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, width: { lg: '1170px', xs: '350px' }, backgroundColor: '#fff', borderRadius: '40px' }}
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />
        <Button className="search-btn" sx={{ bgcolor: '#FF2625', color: '#fff', textTransform: 'none', width: { lg: '173px', xs: '80px' }, height: '56px', position: 'absolute', right: '0px', fontSize: { lg: '20px', xs: '14px' } }} onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
      <HorizontalScrollBar data={bodyParts} bodyParts setBodyPart={setBodyPart} bodyPart={bodyPart} />
        
      </Box>
    </Stack>
  );
};

export default SearchExercises;