import { createContext, useContext, useState } from 'react'

const FilterContext = createContext({})

export const useFilters = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider')
  }
  return context
}

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    year: '2023',
    month: '12',
    gender: 'todos',
    contractType: 'todos',
    ageRange: 'todos',
    period: 'mensal', // 'mensal' ou 'anual'
  })

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      period: 'mensal',
      year: '2023',
      month: '12',
      gender: 'todos',
      contractType: 'todos',
      ageRange: 'todos'
    })
  }

  const value = {
    filters,
    updateFilter,
    clearFilters,
  }

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}
