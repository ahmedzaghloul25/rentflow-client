"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMarkPaymentPaid } from "@/src/hooks/api/usePayments";
import {
  Payment,
  MarkPaymentPaidData,
  PaymentMethodEnum,
} from "@/src/types/payment";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";

const paymentSchema = z.object({
  amount_paid: z.coerce.number().min(1, "Amount must be positive"),
  payment_method: z.enum(PaymentMethodEnum),
  payment_date: z.date({ error: "Payment date is required" }),
});

interface MarkAsPaidDialogProps {
  open: boolean;
  onClose: () => void;
  payment: Payment;
}

export function MarkAsPaidDialog({
  open,
  onClose,
  payment,
}: MarkAsPaidDialogProps) {
  const markAsPaidMutation = useMarkPaymentPaid(
    String(payment.contract_id._id)
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
  });

  const onSubmit = (data: MarkPaymentPaidData) => {
    markAsPaidMutation.mutate(
      { paymentId: payment._id, paymentData: data },
      {
        onSuccess: onClose,
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" sx={{boxShadow:3, borderRadius:3}}>
      <DialogTitle>
        Receive Payment for Due Date:{" "}
        {format(new Date(payment.due_date), "dd MMM yyyy")}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="amount_paid"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Amount Paid"
                    type="number"
                    fullWidth
                    error={!!errors.amount_paid}
                    helperText={errors.amount_paid?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth error={!!errors.payment_method}>
                <InputLabel>Payment Method</InputLabel>
                <Controller
                  name="payment_method"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Payment Method">
                      {Object.values(PaymentMethodEnum).map((method) => (
                        <MenuItem key={method} value={method}>
                          {method}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.payment_method && (
                  <FormHelperText>
                    {errors.payment_method.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="payment_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Payment Date"
                    sx={{ width: "100%" }}
                  />
                )}
              />
              {errors.payment_date && (
                <FormHelperText error>
                  {errors.payment_date.message}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Confirm Payment
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
