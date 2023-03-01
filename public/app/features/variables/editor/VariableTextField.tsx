import React, { FormEvent, PropsWithChildren, ReactElement } from 'react';

import { InlineField, Input, PopoverContent } from '@grafana/ui';

interface VariableTextFieldProps {
  type?: string;
  value: string;
  name: string;
  placeholder: string;
  onChange: (event: FormEvent<HTMLInputElement>) => void;
  testId?: string;
  tooltip?: PopoverContent;
  required?: boolean;
  width?: number;
  labelWidth?: number;
  grow?: boolean;
  onBlur?: (event: FormEvent<HTMLInputElement>) => void;
  interactive?: boolean;
}

export function VariableTextField({
  type,
  value,
  name,
  placeholder,
  onChange,
  testId,
  width,
  labelWidth,
  required,
  onBlur,
  tooltip,
  grow,
  interactive,
}: PropsWithChildren<VariableTextFieldProps>): ReactElement {
  return (
    <InlineField interactive={interactive} label={name} labelWidth={labelWidth ?? 12} tooltip={tooltip} grow={grow}>
      <Input
        type={type === undefined ? 'text' : type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        width={grow ? undefined : width ?? 25}
        data-testid={testId}
        required={required}
      />
    </InlineField>
  );
}
