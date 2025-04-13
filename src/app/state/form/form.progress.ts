import {
  FormGroupState,
  isArrayState,
  isGroupState,
  KeyValue,
  setUserDefinedProperty,
  updateRecursive,
} from 'ngrx-forms';

export function evaluateCompletion<T extends KeyValue>(state: FormGroupState<T>) {
  return updateRecursive(state, (control) => {
    if (isArrayState(control) && control.userDefinedProperties['optional'] === undefined) {
    }

    if (isArrayState(control) || isGroupState(control)) {
      // const arraysAndGroups = Object.values(control.controls)
      //   // TODO: the filter and map can be combined, handle all three cases inside map
      //   .filter((c) => isArrayState(c) || isGroupState(c))
      //   .map((c) => ({
      //     mandatory: c.userDefinedProperties['mandatory'] ?? 0,
      //     valid: c.userDefinedProperties['valid'] ?? 0,
      //   }));

      const groups = Object.values(control.controls)
        // TODO: the filter and map can be combined, handle all three cases inside map
        .filter((c) => isGroupState(c))
        .map((c) => ({
          mandatory: c.userDefinedProperties['mandatory'] ?? 0,
          valid: c.userDefinedProperties['valid'] ?? 0,
        }));

      const controls = Object.values(control.controls)
        .filter((c) => !isArrayState(c) && !isGroupState(c))
        .filter((c) => c.userDefinedProperties['optional'] === undefined)
        .map((c) => ({
          mandatory: 1,
          valid: c.isValid ? 1 : 0,
        }));

      const combined = groups.concat(controls).reduce(
        (acc, curr) => ({
          mandatory: acc.mandatory + curr.mandatory,
          valid: acc.valid + curr.valid,
        }),
        {
          mandatory: 0,
          valid: 0,
        },
      );

      control = setUserDefinedProperty(control, 'mandatory', combined.mandatory);
      control = setUserDefinedProperty(control, 'valid', combined.valid);
    }

    return control;
  });
}
