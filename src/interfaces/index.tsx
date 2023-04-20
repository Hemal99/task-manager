import { ActionTypes } from "../consts/index";

// Each task have 4 properties.
export interface ITaskItem {
  id: string;
  title: string;
  description: string;
  status: string;
}

// Our state should be an array of task items.
export type ITasksState = ITaskItem[];

export type ITaskAction =
  | { type: ActionTypes.Fetch; tasks: ITaskItem[] }
  | { type: ActionTypes.Add; payload: ITaskItem }
  | { type: ActionTypes.Edit; id: string; updates: ITaskItem }
  | { type: ActionTypes.Delete; id: string };

export interface IContextModel {
  state: ITasksState;
  dispatch: React.Dispatch<ITaskAction>;
}

// We define an in order to filter our task in the TasksList component
// interface for task filtering.
// text can assist in task filtering based on title and description

// and a filter depending on their state will be applied

export interface FilterTask {
  text: string;
  status: string;
}
