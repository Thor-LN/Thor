import {FieldProps} from '@/types/FieldProps';
import {IInputProps} from 'native-base';

export interface InputProps extends FieldProps, IInputProps {
  label?: string;
}
