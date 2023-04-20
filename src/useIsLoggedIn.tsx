import { useEffect, useState } from "react";


export const useIsLoggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    
  useEffect(() => {
    // console.log(localStorage.getItem('isLoggedIn'));
    
    setIsLoggedIn(Boolean(localStorage.getItem('isLoggedIn')))
  }, []);

  return [isLoggedIn, setIsLoggedIn] as const;
}
