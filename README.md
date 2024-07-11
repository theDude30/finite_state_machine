## Finite state machine demo
To demonstrate the Finite state machine library , i choosed the "place bid" flow.
Viewers can view a product, click on place bid.
When button is clicked a modal will be shown and states/transitions will be rendered according to the schema.
### Demo
The schema the demo uses can be viewed here:
[https://stately.ai/registry/editor/a8a991e1-9a34-4e65-91fc-ed13751eaec6?mode=design&machineId=9c95303d-298e-4fd8-9606-96113121a476](schema link)

mock server - [https://814bf7dff8994b558285e0fe209b494d.api.mockbin.io/](mock server)

Live demo of the application - [https://thedude30.github.io/finite_state_machine](Demo link)


### FSM Library
FSM library is a stand alone library that download state machine schema from a given URL and utilizing custom hooks to change transitions, call actions and conditions.
#### usage
To use simple initilize the custom hook:
```
conditions =useMemo(() => ({
    isNotLoggedIn: () => { checkCondition return true | false}
    },
}), [user]);
useFSM('server_url',conditions);
```

for triggering transition :
```
transition(<transition_name>);
```

#### schema
FSM library uses standard XSTATE 4 schema to define the finite state machine.
To generate the schema there are few open source visulizers and generators, for example: https://stately.ai/
