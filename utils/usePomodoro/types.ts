type NotificationType = 'last' | 'every';
type NotificationConfig = {
  type: NotificationType;
  time: number;
};

export type PomodoroType = 'pomodoro' | 'shortBreak' | 'longBreak';
export type PomodoroConfig = {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  longBreakInterval: number;
  notificationConfig: NotificationConfig;
};

export type PomodoroState = {
  config: PomodoroConfig;
  paused: boolean;
  pomodoros: number;
  timer: number;
  type: PomodoroType;
};

type PomodoroNoPayloadActionType = 'start' | 'stop' | 'reset';

type PomodoroNextAction = {
  type: 'next';
  payload: PomodoroType;
};

type PomodoroChangeTypeAction = {
  type: 'changeType';
  payload: PomodoroType;
};

type PomodoroChangeConfigAction = {
  type: 'changeConfig';
  payload: Partial<PomodoroConfig>;
};

type PomodoroChangeStateAction = {
  type: 'changeState';
  payload: Partial<PomodoroState>;
};

export type PomodoroAction =
  | {
      type: PomodoroNoPayloadActionType;
    }
  | PomodoroChangeTypeAction
  | PomodoroChangeConfigAction
  | PomodoroNextAction
  | PomodoroChangeStateAction
  | {
      type: 'tick';
      payload: number;
    };
