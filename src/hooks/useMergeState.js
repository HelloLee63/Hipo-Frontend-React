import React from 'react';



export function mergeState(state) {
  return (prevState) => {
    return {
      ...prevState,
      ...state,
    };
  };
}

function useMergeState(
  initialState,
  callback,
) {
  const [state, set] = React.useState(initialState);

  const setState = React.useCallback(
    (updater) => {
      set(prev => {
        const next = {
          ...prev,
          ...(typeof updater === 'function' ? (updater)(prev) : updater),
        };

        if (typeof callback === 'function') {
          callback(next);
        }

        return next;
      });
    },
    [callback],
  );

  return [state, setState];
}

export default useMergeState;