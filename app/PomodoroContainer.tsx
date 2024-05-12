'use client';

import React, { useState } from 'react';
import { usePomodoro, testConfig } from 'utils/usePomodoro';
import { ConfirmationModal } from 'components/ui/ConfirmationModal';

const PomodoroContainer = ({ user }: { user: any }) => {
  const initialConfig =
    process.env.NODE_ENV === 'production' ? undefined : testConfig;
  const { state, start, reset, toggle, goPomodoro, goLongBreak, goShortBreak } =
    usePomodoro(initialConfig);

  const [currentPomodoro, setCurrentPomodoro] = useState();
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
    // Start the server timer
    // const newPomodoro = await startPomodoro(user!);
    // if (newPomodoro === null) {
    //   //unable to start a timer, fire modal.
    //   window.alert(
    //     'unable to start a timer, please refresh the window and try again'
    //   );
    // } else {
    // Start the client timer
    start();
    // setCurrentPomodoro(newPomodoro);
    // }
  };

  const handleCancelPomodoro = async () => {
    // Cancel the pomo on the server
    // await cancelPomodoro(user!, currentPomodoro?.id!);
    setConfirmationModalOpen(false);
    reset();
  };

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
          onClick={goPomodoro}
        >
          Pomodoro
        </button>
        <button
          className={`text-center text-lg p-4 ${state.type === 'shortBreak' && 'font-bold  bg-gray-100'}`}
          onClick={goShortBreak}
        >
          Short Break
        </button>
        <button
          className={`text-center text-lg p-4 ${state.type === 'longBreak' && 'font-bold  bg-gray-100'}`}
          onClick={goLongBreak}
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
                onClick={() => handleCancelPomodoro()}
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
