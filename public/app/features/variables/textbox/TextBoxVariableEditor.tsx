import React, { FormEvent, ReactElement, useCallback } from 'react';

import { selectors } from '@grafana/e2e-selectors';
import { VerticalGroup } from '@grafana/ui';

import { VariableSectionHeader } from '../editor/VariableSectionHeader';
import { VariableTextField } from '../editor/VariableTextField';
import { VariableEditorProps } from '../editor/types';
import { TextBoxVariableModel } from '../types';

export interface Props extends VariableEditorProps<TextBoxVariableModel> {}

export function TextBoxVariableEditor({ onPropChange, variable: { query, width } }: Props): ReactElement {
  const updateVariable = useCallback(
    (event: FormEvent<HTMLInputElement>, updateOptions: boolean) => {
      event.preventDefault();
      onPropChange({ propName: 'originalQuery', propValue: event.currentTarget.value, updateOptions: false });
      onPropChange({ propName: 'query', propValue: event.currentTarget.value, updateOptions });
    },
    [onPropChange]
  );
  const updateWidthVariable = useCallback(
    (event: ChangeEvent<HTMLInputElement>, updateOptions: boolean) => {
      event.preventDefault();
      onPropChange({ propName: 'width', propValue: event.target.value, updateOptions });
    },
    [onPropChange]
  );

  const onChange = useCallback((e: FormEvent<HTMLInputElement>) => updateVariable(e, false), [updateVariable]);
  const onWidthChange = useCallback((e: ChangeEvent<HTMLInputElement>) => updateWidthVariable(e, false), [
    updateVariable,
  ]);
  const onBlur = useCallback((e: FormEvent<HTMLInputElement>) => updateVariable(e, true), [updateVariable]);

  return (
    <VerticalGroup spacing="none">
      <VariableSectionHeader name="Text options" />
      <VariableTextField
        value={query}
        name="Default value"
        placeholder="default value, if any"
        onChange={onChange}
        onBlur={onBlur}
        labelWidth={20}
        grow
        testId={selectors.pages.Dashboard.Settings.Variables.Edit.TextBoxVariable.textBoxOptionsQueryInputV2}
      />
      <VariableTextField
        type="number"
        value={width}
        name="Width"
        placeholder="defualt value, if any"
        onChange={onWidthChange}
        labelWidth={20}
      />
    </VerticalGroup>
  );
}
