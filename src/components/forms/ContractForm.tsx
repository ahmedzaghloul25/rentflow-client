"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { useAddContract } from "@/src/hooks/api/useContracts";
import { useProperties } from "@/src/hooks/api/useProperties";
import { useClients } from "@/src/hooks/api/useClients.ts";
import { NewContractData, PaymentInterval } from "@/src/types/contract";

import {
  Grid,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Property } from "@/src/types/property";
import { Client } from "@/src/types/client";

const contractSchema = z
  .object({
    property_id: z.string(),
    client_id: z.string(),
    start_date: z.date({ message: "Start date is required" }),
    end_date: z.date({ message: "End date is required" }),
    initial_rent: z.string().transform((val) => parseFloat(val) || 0)
      .pipe(z.number().min(0, "Initial rent must be positive")),
    payment_interval: z.enum(PaymentInterval),
    annual_increase: z.string().transform((val) => parseFloat(val) || 0)
      .pipe(z.number().min(0, "Cannot be negative").max(100)),
    security_deposit: z.string().transform((val) => parseFloat(val) || 0)
      .pipe(z.number().min(0, "Cannot be negative")),
  }) 
  .refine((data) => data.end_date > data.start_date, {
    message: "End date must be after start date",
    path: ["end_date"],
  });

export function ContractForm() {
  const router = useRouter();
  const addContractMutation = useAddContract();

  const { data: propertiesData, isLoading: isLoadingProperties } =
    useProperties({ page: 0, limit: 1000 });
  const { data: clientsData, isLoading: isLoadingClients } = useClients({
    page: 0,
    limit: 1000,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contractSchema),
    defaultValues: {
    },
  }) 

  const onSubmit = (data: NewContractData) => {
    const submissionData = { ...data };
    
    addContractMutation.mutate(submissionData, {
      onSuccess: () => {
        router.push("/dashboard/contracts");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid size={{ md: 6, xs: 12 }}>
          <FormControl fullWidth error={!!errors.property_id}>
            <Controller
              name="property_id"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={propertiesData?.properties || []}
                  getOptionLabel={(option: Property) =>
                    `No: ${option.number} Building: ${option.building}` || ""
                  }
                  onChange={(_, newValue) =>
                    field.onChange(newValue?._id || "")
                  }
                  loading={isLoadingProperties}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Property *" />
                  )}
                />
              )}
            />
            {errors.property_id && (
              <FormHelperText>{errors.property_id.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <FormControl fullWidth error={!!errors.client_id}>
            <Controller
              name="client_id"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={clientsData?.clients || []}
                  getOptionLabel={(option: Client) => option.fullName || ""}
                  onChange={(_, newValue) =>
                    field.onChange(newValue?._id || "")
                  }
                  loading={isLoadingClients}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Client *" />
                  )}
                />
              )}
            />
            {errors.client_id && (
              <FormHelperText>{errors.client_id.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <Controller
            name="start_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Start Date"
                sx={{ width: "100%" }}
              />
            )}
          />
          {errors.start_date && (
            <FormHelperText error>{errors.start_date.message}</FormHelperText>
          )}
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <Controller
            name="end_date"
            control={control}
            render={({ field }) => (
              <DatePicker {...field} label="End Date" sx={{ width: "100%" }} />
            )}
          />
          {errors.end_date && (
            <FormHelperText error>{errors.end_date.message}</FormHelperText>
          )}
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <Controller
            name="initial_rent"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Initial Rent"
                type="number"
                required
                fullWidth
                error={!!errors.initial_rent}
                helperText={errors.initial_rent?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <Controller
            name="annual_increase"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Annual Increase (%)"
                type="number"
                required
                fullWidth
                error={!!errors.annual_increase}
                helperText={errors.annual_increase?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <Controller
            name="security_deposit"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Security Deposit"
                type="number"
                required
                fullWidth
                error={!!errors.security_deposit}
                helperText={errors.security_deposit?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <FormControl fullWidth error={!!errors.payment_interval}>
            <InputLabel id="payment-interval-label">
              Payment Interval *
            </InputLabel>
            <Controller
              name="payment_interval"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="payment-interval-label"
                  label="Payment Interval *"
                >
                  {Object.keys(PaymentInterval)
                    .filter(
                      (key) =>
                        !isNaN(
                          Number(
                            PaymentInterval[key as keyof typeof PaymentInterval]
                          )
                        )
                    )
                    .map((key) => {
                      const value =
                        PaymentInterval[key as keyof typeof PaymentInterval];
                      return (
                        <MenuItem key={value} value={value}>
                          {`Every ${value} Month(s)`}
                        </MenuItem>
                      );
                    })}
                </Select>
              )}
            />
            {errors.payment_interval && (
              <FormHelperText>{errors.payment_interval.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              disabled={addContractMutation.isPending}
            >
              {addContractMutation.isPending ? (
                <CircularProgress size={24} />
              ) : (
                "Create Contract"
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
