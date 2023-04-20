export enum ActionTypes {
  Fetch = "POPULATE_TASKS",
  Add = "ADD_TASK",
  Edit = "EDIT_TASK",
  Delete = "REMOVE_TASK",
}

export enum Colors {
  blue = "#0276aa",
  lightBlue = "#35baf6",
}

export enum TaskHistory {
  Todo = "To Do",
  InProgress = "In Progress",
  Blocked = "Blocked",
  InQA = "In QA",
  Done = "Done",
  Deployed = "Deployed",
}

export enum TaskFormMode {
  Create = "create",
  Edit = "edit",
}
