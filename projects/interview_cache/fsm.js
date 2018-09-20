import _ from 'lodash';

const firstUpperCase = s => s.replace(/^(\S)/, c => c.toUpperCase());
const noop = () => {};
const bindHook = (hookType, event, context) => (event, currentState, from , to) => (context[`${hookType}${firstUpperCase(event)}`] || noop)(event, currentState, from , to);

/**
 * Finite state machine, whose state can be any type that is supported by lodash.isEqual method.
 * @param {Object} options options of finite state machine.
 * @param {Any} options.initState initial state of machine.
 * @param {Array} options.transitions transition array of machine, each item includes event name, from state, to state.
 * @param {Object} options.actions actions during a transition by observing lifecycle events.
 */
class FiniteStateMachine {
  constructor(options) {
    const { initState, transitions, actions } = options;
    this.currentState = initState;
    this.actions = actions;
    this.states = new Set();
    this.parseTransitions(transitions);
    this.bindActions(actions);
  }

  hasState(name) {
    return this.states.has(name);
  }

  allStates() {
    return Array.from(this.states);
  }

  bindActions(actions) {
    Object.keys(actions).forEach(methodName => {
      this[methodName] = actions[methodName];
    });
  }

  parseTransitions(transitions) {
    if (!(transitions instanceof Array)) {
      throw new Error('transitions must be Array.');
    }
    transitions.forEach(transition => {
      const { event, from, to } = transition;
      if (_.isEqual(from, to)) {
        throw new Error('from state and to state should not equal.');
      }
      this.states.add(from);
      this.states.add(to);
      const beforeHook = bindHook('before', event, this);
      const afterHook = bindHook('after', event, this);
      this[event] = () => {
        if (!_.isEqual(this.currentState, from)) {
          throw new Error(`Current state is ${this.currentState}, state can't be transformed from ${from} to ${to} by ${event}`);
        }
        beforeHook(event, this.currentState, from, to);
        this.currentState = to;
        afterHook(event, this.currentState, from, to);
      };
    });
  }
}

const fsm = new FiniteStateMachine({
  initState: 'solid',
  transitions: [
    { event: 'melt',     from: 'solid',  to: 'liquid' },
    { event: 'freeze',   from: 'liquid', to: 'solid'  },
    { event: 'vaporize', from: 'liquid', to: 'gas'    },
    { event: 'condense', from: 'gas',    to: 'liquid' }
  ],
  actions: {
    beforeMelt: function(...args) {
      console.log('before melted');
      console.log('args: ', args);
    },
    afterMelt: function(...args) {
      console.log('after melted');
      console.log('args: ', args);
    },
    afterFreeze:   function() { console.log('after froze'); },
    beforeVaporize: function() { console.log('before vaporized'); },
    afterCondense: function() { console.log('after condensed'); }
  }
});

console.log('allStates => ', fsm.allStates());

console.log('has state solid => ', fsm.hasState('solid'));

console.log('currentState => ', fsm.currentState);
fsm.melt();
console.log('currentState => ', fsm.currentState);
fsm.freeze();
console.log('currentState => ', fsm.currentState);
fsm.melt();
console.log('currentState => ', fsm.currentState);
fsm.vaporize();
console.log('currentState => ', fsm.currentState);
fsm.condense();
console.log('currentState => ', fsm.currentState);
fsm.freeze();
console.log('currentState => ', fsm.currentState);

console.log('allStates => ', fsm.allStates());