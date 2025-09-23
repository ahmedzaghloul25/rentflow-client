"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { useAddProperty } from "@/src/hooks/api/useProperties";
import { NewPropertyData, Property } from "@/src/types/property";
import {
  PropertyType,
  EgyptianCity,
  cityDistrictMap,
} from "@/src/lib/constants";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  existingProperty?: Property;
}

const propertySchema = z.object({
  number: z.string().min(1, "Number is required").max(10),
  type: z.enum(PropertyType, {
    error: () => ({ message: "Please select a valid type" }),
  }),
  city: z.enum(EgyptianCity, {
    error: () => ({ message: "Please select a valid city" }),
  }),
  district: z.string().min(1, "District is required"),
  building: z.string().min(1, "Building is required"),
  notes: z.string().max(200).optional(),
});

export function PropertyForm({ existingProperty }: Props) {
  const router = useRouter();
  const [districts, setDistricts] = useState<string[]>([]);
  const addPropertyMutation = useAddProperty();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewPropertyData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      number: existingProperty?.number || "",
      type: existingProperty?.type,
      city: existingProperty?.city,
      district: existingProperty?.district || "",
      building: existingProperty?.building || "",
      notes: existingProperty?.notes || "",
    },
  });

  const selectedCity = watch("city");

  useEffect(() => {
    if (selectedCity) {
      setDistricts(cityDistrictMap.get(selectedCity) || []);
      setValue("district", "");
    } else {
      setDistricts([]);
    }
  }, [selectedCity, setValue]);

  const onSubmit = (data: NewPropertyData) => {
    addPropertyMutation.mutate(data, {
      onSuccess: () => {
        router.push("/dashboard/properties");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="number"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Property Number"
                fullWidth
                required
                error={!!errors.number}
                helperText={errors.number?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth error={!!errors.type}>
            <InputLabel id="type-label">Property Type *</InputLabel>
            <Controller
              name="type"
              control={control}
              render={({ field }) => {
                const { value, ...restOfField } = field;
                return (
                  <Select
                    {...restOfField}
                    value={value || ""}
                    labelId="type-label"
                    label="Property Type *"
                  >
                    {Object.values(PropertyType).map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                );
              }}
            />
            {errors.type && (
              <FormHelperText>{errors.type.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth error={!!errors.city}>
            <InputLabel id="city-label">City *</InputLabel>
            <Controller
              name="city"
              control={control}
              render={({ field }) => {
                const { value, ...restOfField } = field;
                return (
                  <Select
                    {...field}
                    value={value || ""}
                    labelId="city-label"
                    label="City *"
                  >
                    {Object.values(EgyptianCity).map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                );
              }}
            />
            {errors.city && (
              <FormHelperText>{errors.city.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl
            fullWidth
            error={!!errors.district}
            disabled={!selectedCity}
          >
            <InputLabel id="district-label">District *</InputLabel>
            <Controller
              name="district"
              control={control}
              render={({ field }) => {
                const { value, ...restOfField } = field;

                return (
                  <Select
                    {...field}
                    value={value || ""}
                    labelId="district-label"
                    label="District *"
                  >
                    {districts.map((district) => (
                      <MenuItem key={district} value={district}>
                        {district}
                      </MenuItem>
                    ))}
                  </Select>
                );
              }}
            />
            {errors.district && (
              <FormHelperText>{errors.district.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="building"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Building"
                fullWidth
                required
                error={!!errors.building}
                helperText={errors.building?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Notes"
                fullWidth
                multiline
                rows={4}
                error={!!errors.notes}
                helperText={errors.notes?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              disabled={addPropertyMutation.isPending}
            >
              {addPropertyMutation.isPending ? (
                <CircularProgress size={24} />
              ) : (
                "Add Property"
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
