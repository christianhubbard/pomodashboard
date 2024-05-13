'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { usePomodoro, testConfig, defaultConfig } from 'utils/usePomodoro';
import { ConfirmationModal } from 'components/ui/ConfirmationModal';
import {
  completePomodoroAction,
  startPomodoroAction,
  resetCurrentPomodoroAction
} from './actions';

export const fetchCache = 'force-no-store';

const PomodoroContainer = ({
  user,
  current_pomodoro
}: {
  user: any;
  current_pomodoro: any;
}) => {
  const initialConfig =
    process.env.NODE_ENV === 'production'
      ? { pomodoros: user.pomodoros, ...defaultConfig }
      : testConfig;

  const {
    state,
    start,
    reset,
    toggle,
    goPomodoro,
    goLongBreak,
    goShortBreak,
    changeState
  } = usePomodoro(initialConfig);

  const [completedPomodoros, setCompletedPomodoros] = useState(
    user.pomodoros || 0
  );
  const [currentPomodoro, setCurrentPomodoro] = useState(!!current_pomodoro);
  const [cancelPromptAction, setCancelPromptAction] = useState<
    'shortBreak' | 'longBreak' | ''
  >('');
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const handleStartButton = () => {
    if (state.type === 'pomodoro') {
      state.progress > 0
        ? setConfirmationModalOpen(true)
        : handleStartPomodoro();
    } else if (state.progress === 0) {
      start();
    } else {
      toggle();
    }
  };

  const handleStartPomodoro = async () => {
    const now = new Date();
    // optionally add .toISOString(); if needed
    console.log('now', now);
    // Start the server timer
    startPomodoroAction(user.email, { current_pomodoro: now });
    // Start the local timer
    start();
    // Set currentPomo to true
    setCurrentPomodoro(true);
  };

  const handleCancelPomodoro = async () => {
    // Cancel the pomo on the server
    setConfirmationModalOpen(false);
    resetCurrentPomodoroAction(user.email);
    setCurrentPomodoro(false);
    reset();
  };

  useEffect(() => {
    const handleCompletePomodoro = async () => {
      if (state.pomodoros > completedPomodoros) {
        completePomodoroAction(user.email);
        setCurrentPomodoro(false);
        setCompletedPomodoros(state.pomodoros);
      }
    };
    handleCompletePomodoro();
  }, [state.pomodoros]);

  useEffect(() => {
    if (current_pomodoro) {
      // Check if pomodoro was started in the last 25 minutes
      const pomodoroStartDate = new Date(current_pomodoro);
      const twentyFiveMinutesInMS = 25 * 60 * 1000;
      const fiveSecondsInMS = 5 * 1000;
      const timeDelay =
        process.env.NODE_ENV === 'production'
          ? twentyFiveMinutesInMS
          : fiveSecondsInMS;
      const twentyFiveMinutesAgo = new Date();
      twentyFiveMinutesAgo.setTime(twentyFiveMinutesAgo.getTime() - timeDelay);
      if (pomodoroStartDate.getDate() == twentyFiveMinutesAgo.getDate()) {
        if (pomodoroStartDate > twentyFiveMinutesAgo) {
          // greater number means more recent
          const timeDiffInSeconds = Math.floor(
            (pomodoroStartDate.getTime() - twentyFiveMinutesAgo.getTime()) /
              1000
          );
          changeState({
            timer: timeDiffInSeconds,
            paused: false
          });
        } else {
          resetCurrentPomodoroAction(user.email);
        }
      } else {
        resetCurrentPomodoroAction(user.email);
      }
    }
  }, [current_pomodoro]);

  const getButtonText = () => {
    if (state.type === 'pomodoro') {
      return state.progress > 0 ? 'Cancel' : 'Start';
    } else {
      return state.progress > 0 ? 'Pause' : 'Start';
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center gap-28">
      <div className="flex rounded-lg mx-auto">
        <button
          className={`text-center text-lg p-4 ${state.type === 'pomodoro' && 'font-bold bg-gray-100'}`}
          onClick={() => {
            setCancelPromptAction('');
            if (state.type !== 'pomodoro') {
              goPomodoro();
            }
          }}
        >
          Pomodoro
        </button>
        <button
          className={`text-center text-lg p-4 ${state.type === 'shortBreak' && 'font-bold  bg-gray-100'}`}
          onClick={() => {
            if (currentPomodoro) {
              setConfirmationModalOpen(true);
              setCancelPromptAction('shortBreak');
            } else {
              setCancelPromptAction('');
              goShortBreak();
            }
          }}
        >
          Short Break
        </button>
        <button
          className={`text-center text-lg p-4 ${state.type === 'longBreak' && 'font-bold  bg-gray-100'}`}
          onClick={() => {
            if (currentPomodoro) {
              setConfirmationModalOpen(true);
              setCancelPromptAction('longBreak');
            } else {
              setCancelPromptAction('');
              goLongBreak();
            }
          }}
        >
          Long Break
        </button>
      </div>
      <div className="flex p-8 text-6xl font-bold ml-auto mr-auto">
        {state.formattedTimer}
      </div>
      <button
        className="py-2 px-8 font-bold hover:bg-gray-100 border mr-auto ml-auto rounded"
        type="button"
        onClick={handleStartButton}
      >
        {getButtonText()}
      </button>
      {confirmationModalOpen && (
        <ConfirmationModal
          isOpen={confirmationModalOpen}
          handleClose={() => setConfirmationModalOpen(!confirmationModalOpen)}
        >
          <div className="flex flex-col justify-between h-full w-full">
            <div className="flex flex-col mt-auto mb-auto items-center p-8">
              <span>Are you sure you want to cancel?</span>
              <span>Your current progress will be lost</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-8 align-center">
              <button
                className="py-2 px-8 font-bold hover:bg-gray-100 border rounded"
                type="button"
                onClick={() => setConfirmationModalOpen(!confirmationModalOpen)}
              >
                Continue Working
              </button>
              <button
                className="py-2 px-8 font-bold hover:bg-gray-100 border rounded"
                type="button"
                onClick={() => {
                  handleCancelPomodoro();
                  if (cancelPromptAction === 'shortBreak') {
                    resetCurrentPomodoroAction(user.email);
                    goShortBreak();
                  } else if (cancelPromptAction === 'longBreak') {
                    resetCurrentPomodoroAction(user.email);
                    goLongBreak();
                  }
                  setCancelPromptAction('');
                }}
              >
                Cancel Pomodoro
              </button>
            </div>
          </div>
        </ConfirmationModal>
      )}
    </div>
  );
};

export { PomodoroContainer };
