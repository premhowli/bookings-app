import { useCallback, useMemo, useState } from 'react';
import { useProperties } from '../services/api';

export function useHomeProperties() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: properties, isLoading } = useProperties();

  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const filteredProperties = useMemo(() => {
    return properties?.filter((property) =>
      property.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [properties, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    handleSearchChange,
    filteredProperties,
    isLoading,
  };
} 