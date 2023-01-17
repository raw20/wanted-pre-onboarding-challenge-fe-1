export interface TodoListType {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoDataType {
  title: FormDataEntryValue;
  content: FormDataEntryValue;
}

export interface TodoDataByIdType {
  title: FormDataEntryValue;
  content: FormDataEntryValue;
  id: string;
}
