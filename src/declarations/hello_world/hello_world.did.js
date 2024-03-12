export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'greet' : IDL.Func([], [IDL.Text], ['query']),
    'set' : IDL.Func([IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
