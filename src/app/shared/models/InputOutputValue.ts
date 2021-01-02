import { DeltaOperation } from "quill";

export class InputOutputValue {
    name: string;
    error: boolean;
    label: string;
    constructor(name?:string, label?:string, error?:boolean ){
        this.name = (name) ? name : undefined
        this.error = (error) ? error : false
        this.label = (label) ? label : undefined

    }
  }

  export interface SingleMultiChoiceItem {
      value: string | number
      label: string | number
      disabled?: boolean
  }
  export interface TextArea{
      ops: DeltaOperation[]
  }

