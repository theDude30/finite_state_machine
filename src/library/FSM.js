
import {useState,useEffect,useCallback} from 'react';

export class FSM {
    constructor(conditions = {}) {
      this.conditions = conditions;
      this.states = {};
      this.currentState = null;
      this.context = {};
      this.isInitialized = false;
    }

     initialize(config) {
      if(!config || !config.states || !config.initial){
        console.error('Invalid FSM configuration: ', config);
        throw new Error('Invalid FSM configuration');
      }
      this.states = config.states;
      this.currentState = config.initial;
      this.isInitialized = true;
      this.evaluateState();
    }

    evaluateState() {
      if(!this.isInitialized){
        console.error('FSM not initilized');
        return;
      }
      let stateChanged;
      do {
        stateChanged = false;
        const currentStateConfig = this.states[this.currentState];
        if(!currentStateConfig){
          console.error('Invalid State',this.currentState)
        }

        if (currentStateConfig?.always) {
          for ( const transition of currentStateConfig.always){
            if(this.checkCondition(transition.cond)){
              this.executeActions(transition.actions);
              this.currentState = transition.target;
              stateChanged = true;
              break;
            }
          }
        }
      } while (stateChanged)
    }

    checkCondition(conditionName) {
      if (!conditionName) return true;
      const condition = this.conditions[conditionName];
      const result = condition ? condition(this.context) : true;
      return result;
    }

    executeActions(actions) {
      if (!actions) return;
      for (const action of actions) {
        if (typeof action === 'function') {
          action(this.context);
        }
      }
    }


    transition(event) {
      console.log(`Transition attempted: ${event}, Current state: ${this.currentState}`);
      if(!this.isInitialized){
        console.error('FSM not initilized');
        return;
      }

      if(this.currentState === null) {
        console.error('Current state is null. FSM may not be properly initilized');
        return false;
      }
      const currentStateConfig = this.states[this.currentState];
      if(!currentStateConfig){
        console.error('Invalid current state: ', this.currentState);
        return false;
      }


      if (currentStateConfig.type === 'final') {
        return false;
      }

      if (currentStateConfig?.on && currentStateConfig?.on[event]) {
        for (const transition of currentStateConfig.on[event]) {
          console.log(`Found transition for event ${event}:`, transition);

          if (this.checkCondition(transition.cond)) {
            this.executeActions(transition.actions);
            this.currentState = transition.target;
            console.log(`Transitioned to new state: ${this.currentState}`);
            this.evaluateState()
            return true;
          }
        }
      }
      console.log(`Transitioned to new state: ${this.currentState}`);
      return false;
    }

    getState() {
      return this.currentState;
    }

    getStateConfig() {
      return this.states[this.currentState] || {};
    }
  }


  export default function useFSM(configUrl,conditions = {}) {
    const [fsm,setFsm] = useState(null);
    const [state,setState] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);
    const [isInitialized,setInitilized] = useState(false);


    useEffect(() => {
      let isMounted = true;
      const newFsm = new FSM(conditions);

      fetch(configUrl)
      .then(response => response.json())
      .then(config => {
        if(isMounted){
          newFsm.initialize(config);
          setFsm(newFsm);
          setState(newFsm.getState())
          setInitilized(true)
          setIsLoading(false);
        }
      })
      .catch(err =>{
        console.error('Error initilizing FSM: ', err);
        if (isMounted){
          setError(err.message);
          setIsLoading(false);
        }
      });
    },[configUrl])


    const transition = useCallback((event) => {
      console.log(`useFSM: Transition called with event: ${event}`);
      if (fsm && isInitialized) {
        if(fsm.transition(event)){
          console.log(`useFSM: Transition called with event: ${event}`);
          setState(fsm.getState());
        }else {
          console.log(`useFSM: Transition failed`);
        }
      }
      else{
        console.error('FSM not initilized or not available. Cannot transition.');
      }
    }, [fsm,isInitialized]);

    const getStateConfig = useCallback(()=> (fsm &&  isInitialized ? fsm.getStateConfig() : {} ),[fsm,isInitialized]);
    return { state,transition,isLoading,error,isInitialized,getStateConfig}

  }
