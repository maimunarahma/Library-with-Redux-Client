
import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import type React from 'react';
import Register from './Authentication/Register';

type Props={
    children :React.ReactNode;
}
const Private : React.FC<Props>=({children}) => {
    const user=useSelector((state: RootState ) => state.auth.user);
    if(user)
        return children
else{
    return (
    <div>
          <Register/>
        </div>
    );
}
};

export default Private;