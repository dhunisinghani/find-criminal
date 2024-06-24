import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { cities, cops, vehicles } from "./data"

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import { InputLabel } from '@mui/material';

import { generateCriminalLocation, searchCriminal } from './server'

import Dropdown from './components/Dropdown/Dropdown'
import CopPostingCard from './components/CopPostingCard/CopPostingCard'

function App() {

  const [loading, setLoading] = useState(false);
  const [copList, setCopList] = useState(cops);
  const [cityList, setCityList] = useState(cities);
  const [vehicleList, setVehicleList] = useState(vehicles);
  const [result, setResult] = useState({});
  const [isCriminalSearched, setIsCriminalSearched] = useState(false);

  const [currentCombination, setCurrentCombination] = useState({
    copIndex: 0,
    cityIndex: 0,
    vehicleIndex: 0
  });

  const [selectedSearchCombination, setSelectedSearchCombination] = useState([]);

  const handleChange = (listName, itemIndex) => {

    switch (listName) {
      case "cop":
        setCurrentCombination(prev => {
          return {
            ...prev,
            copIndex: itemIndex
          }
        });
        break;
      case "city":
        setCurrentCombination(prev => {
          return {
            ...prev,
            cityIndex: itemIndex
          }
        });
        break;
      case "vehicle":
        setCurrentCombination(prev => {
          return {
            ...prev,
            vehicleIndex: itemIndex
          }
        });
        break;
    }

    console.log(`Current Combination:-`, currentCombination);
  }

  const addCurrentSelection = () => {
    // Adding to the Selection
    setSelectedSearchCombination(prev => {
      prev.push({
        cop: copList[currentCombination.copIndex],
        city: cityList[currentCombination.cityIndex],
        vehicle: vehicleList[currentCombination.vehicleIndex]
      });
      return [
        ...prev
      ]
    });


    // Removing the cop from the list
    setCopList(prev => {
      const cops = prev.filter(cop => copList[currentCombination.copIndex].id != cop.id);
      return [
        ...cops
      ]
    });

    // Removing the city from the list
    setCityList(prev => {
      const cities = prev.filter(city => cityList[currentCombination.cityIndex].id != city.id);
      return [
        ...cities
      ]
    });

    // Removing the vehicle from the list
    setVehicleList(prev => {
      const vehicles = prev.filter(vehicle => vehicleList[currentCombination.vehicleIndex].id != vehicle.id);
      return [
        ...vehicles
      ]
    });

    setCurrentCombination(prev => ({
      copIndex: 0,
      cityIndex: 0,
      vehicleIndex: 0
    }))

    console.log({ selectedSearchCombination, currentCombination })

  }

  const searchCriminalHandler = () => {
    const searchResult = searchCriminal(generateCriminalLocation(cities), selectedSearchCombination);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult(prev => searchResult);
      setIsCriminalSearched(prev => true);
    }, 5000);
  }

  const handleReset = () => {
    setCopList(prev => cops);
    setCityList(prev => cities);
    setVehicleList(prev => vehicles);
    setResult(prev => { });
    setIsCriminalSearched(false);
    setSelectedSearchCombination(prev => []);
    setCurrentCombination(prev => ({
      copIndex: 0,
      cityIndex: 0,
      vehicleIndex: 0
    }));
  }

  if (loading) {
    return (
      <>
        <Stack justifyContent={"center"} alignContent={"center"} className='loading'>
          Searching Criminal...
        </Stack>
      </>
    )
  }

  if (isCriminalSearched) {
    return (
      <>
        <Stack direction={"column"} gap={2} justifyContent={"center"} alignContent={"center"} alignItems={"center"} style={{ height: "100vh", width: "100vw" }}>
          <Typography gutterBottom variant="h5" component="div">
            {result.message}
          </Typography>
          <Box>
            <Button variant='contained' onClick={handleReset}>Replay</Button>
          </Box>
        </Stack>
      </>
    )
  }

  return (
    <>
      <div id="root">
        <h1 style={{ textAlign: "center" }}>Find Criminal</h1>
        {
          (copList.length > 0 && vehicleList.length > 0 && cityList.length > 0) &&
          (
            <Stack marginTop={2} direction={"row"} alignItems={"start"} gap={5} justifyContent={"center"}>
              <Box sx={{ display: {xs: "none", md: "block"}  }}>
                <CopPostingCard cop={copList[currentCombination.copIndex]} city={cityList[currentCombination.cityIndex]} vehicle={vehicleList[currentCombination.vehicleIndex]} />
              </Box>

              <Box>
                <Stack marginTop={4} direction={"column"} alignItems={"center"} gap={2}>
                  <Dropdown listName={"city"} list={cityList} selectedItem={currentCombination.cityIndex} handleChange={handleChange} />
                  <Dropdown listName={"vehicle"} list={vehicleList} selectedItem={currentCombination.vehicleIndex} handleChange={handleChange} />
                  <Dropdown listName={"cop"} list={copList} selectedItem={currentCombination.copIndex} handleChange={handleChange} />
                  <Button variant='contained' onClick={addCurrentSelection}>Add Selection</Button>
                </Stack>
              </Box>
            </Stack>
          )
        }
        {
          (selectedSearchCombination.length > 0) &&
          (
            <>
              <Stack marginTop={4} direction={"row"} justifyContent={"center"} gap={2}>
                <Button variant='contained' onClick={searchCriminalHandler}>Search Criminal</Button>
                <Button variant='contained' onClick={handleReset}>Reset</Button>
              </Stack>
              <Stack marginTop={4} direction={{ xs: "column", md: "column", lg: "row" }} alignItems={"center"} justifyContent={"center"} gap={2}>
                {
                  selectedSearchCombination.map((searchLocation, searchLocationIndex) => {
                    return (
                      <CopPostingCard cop={searchLocation.cop} city={searchLocation.city} vehicle={searchLocation.vehicle} />
                    )
                  })
                }
              </Stack>

            </>
          )
        }
      </div>
    </>
  )
}

export default App
