import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { IconX } from "@/data/icons";
import { cn } from "@/lib/utils";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "file";
};

export const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: FormFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel
            className={cn(
              "pl-2 font-normal",
              fieldState.error && "text-destructive",
            )}
          >
            {label}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              className={cn(
                "h-12 md:h-9",
                fieldState.error && "border-destructive",
              )}
            />
          </FormControl>
          {fieldState.error && (
            <FormMessage className="flex items-center gap-x-2 pl-2">
              <IconX className="text-destructive size-4" />
              {fieldState.error?.message}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};
