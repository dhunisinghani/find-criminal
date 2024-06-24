import { useState } from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import { InputLabel } from '@mui/material'


const Dropdown = ({ listName, list, selectedItem, handleChange }) => {

  return (
    <>
      <Box>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id={`${listName}-simple-select-label`}>{listName.toUpperCase()}</InputLabel>
          <Select
            labelId={`${listName}-simple-select-label`}
            id={`${listName}-simple-select`}
            value={selectedItem}
            label={listName}
            onChange={(event) => {
              handleChange(listName, event.target.value)
            }}
            style={{ width: "250px" }}
          >
            {
              list.map((item, itemIndex) => {
                return (
                  <MenuItem key={`${listName}-${itemIndex}`} value={itemIndex}>
                    <Stack direction="row" alignItems={'center'} gap={1}><Avatar alt={item.name} src={`/${item.image}`} sx={{ width: 36, height: 36 }} />{item.name}</Stack>
                  </MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </Box>
    </>)
}

export default Dropdown