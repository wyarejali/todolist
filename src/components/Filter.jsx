import React from 'react'
import { useGlobalContext } from '../context/appContext'

const Filter = () => {
  const { setFilteredText } = useGlobalContext()

  const onFilterChange = (e) => {
    setFilteredText(e.target.value)
  }
  return (
    <div className='wa_filter-area'>
      <label htmlFor='filter'>Filter: </label>
      <select
        className='wa_filter'
        name='filter'
        id='filter'
        onChange={onFilterChange}
      >
        <option value='all'>All</option>
        <option value='completed'>Completed</option>
        <option value='uncompleted'>Uncomplete</option>
      </select>
    </div>
  )
}

export default Filter
