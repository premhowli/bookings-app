import { useMemo, useState } from 'react';
import { useProperties } from '../../../services/api';

export function useHomeProperties() {
  const { data: properties = [], isLoading } = useProperties();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (text: string) => setSearchQuery(text);

  const filteredProperties = useMemo(() => {
    if (!searchQuery) return properties;
    return properties.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [properties, searchQuery]);

  return {
    searchQuery,
    handleSearchChange,
    filteredProperties,
    isLoading,
  };
} 