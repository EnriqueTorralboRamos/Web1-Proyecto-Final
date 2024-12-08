'use client';

import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { getParticipants } from '@/src/services/userServiceClient';

interface ParticipantAutocompleteProps {
  onSelect: (selectedIds: string[]) => void;
}

export default function ParticipantAutocomplete({ onSelect }: Readonly<ParticipantAutocompleteProps>) {
  const [users, setUsers] = useState<{ _id: string; name: string; email:string; }[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<{ _id: string; name: string; email:string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const fetchedUsers = await getParticipants();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const handleChange = (event: any, value: { _id: string; name: string; email:string}[]) => {
    setSelectedUsers(value);
    onSelect(value.map((user) => user._id)); // Devuelve solo los IDs seleccionados
  };

  return (
    <Autocomplete
      multiple
      options={users}
      getOptionLabel={(option) => option.email}
      value={selectedUsers}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Selecciona Participantes"
          placeholder="Buscar usuarios"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
