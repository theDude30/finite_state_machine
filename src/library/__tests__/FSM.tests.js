
import {FSM} from '../FSM';

describe('FSM Class', () => {
  let fsm;

  beforeEach(() => {
    fsm = new FSM();
  });

  test('should initialize correctly', () => {
    const config = {
      initial: 'idle',
      states: {
        idle: {
          on: {
            START: [{ target: 'running' }]
          }
        },
        running: {
          on: {
            STOP: [{ target: 'idle' }]
          }
        }
      }
    };

    fsm.initialize(config);
    expect(fsm.isInitialized).toBe(true);
    expect(fsm.getState()).toBe('idle');
  });

  test('should transition correctly', () => {
    const config = {
      initial: 'idle',
      states: {
        idle: {
          on: {
            START: [{ target: 'running' }]
          }
        },
        running: {
          on: {
            STOP: [{ target: 'idle' }]
          }
        }
      }
    };

    fsm.initialize(config);
    expect(fsm.getState()).toBe('idle');

    fsm.transition('START');
    expect(fsm.getState()).toBe('running');

    fsm.transition('STOP');
    expect(fsm.getState()).toBe('idle');
  });

  test('should handle conditional transitions', () => {
    const conditions = {
      isTrue: () => true,
      isFalse: () => false
    };

    fsm = new FSM(conditions);

    const config = {
      initial: 'state1',
      states: {
        state1: {
          on: {
            NEXT: [
              { target: 'state2', cond: 'isTrue' },
              { target: 'state3', cond: 'isFalse' }
            ]
          }
        },
        state2: {},
        state3: {}
      }
    };

    fsm.initialize(config);
    fsm.transition('NEXT');
    expect(fsm.getState()).toBe('state2');
  });

  test('should execute actions during transitions', () => {
    const mockAction = jest.fn();
    const config = {
      initial: 'idle',
      states: {
        idle: {
          on: {
            START: [{ target: 'running', actions: [mockAction] }]
          }
        },
        running: {}
      }
    };

    fsm.initialize(config);
    fsm.transition('START');
    expect(mockAction).toHaveBeenCalled();
  });

  test('should handle always transitions', () => {
    const config = {
      initial: 'state1',
      states: {
        state1: {
          always: [
            { target: 'state2', cond: 'isTrue' }
          ]
        },
        state2: {}
      }
    };

    fsm = new FSM({ isTrue: () => true });
    fsm.initialize(config);
    expect(fsm.getState()).toBe('state2');
  });

  test('should return correct state config', () => {
    const config = {
      initial: 'idle',
      states: {
        idle: {
          on: {
            START: [{ target: 'running' }]
          }
        },
        running: {}
      }
    };

    fsm.initialize(config);
    const stateConfig = fsm.getStateConfig();
    expect(stateConfig).toEqual({
      on: {
        START: [{ target: 'running' }]
      }
    });
  });
});
