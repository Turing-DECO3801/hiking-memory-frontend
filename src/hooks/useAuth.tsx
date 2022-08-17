import { useState } from 'react';

const useAuth = () => {
  const [authed] = useState(true);

  return ({ authed });
};

export default useAuth;
