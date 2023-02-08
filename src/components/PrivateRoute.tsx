import React, {FC} from "react";

interface Props {
    component: React.ComponentType
    path?: string
}

export const PrivateRoute: FC<Props> = () => {
    return (<div/>);
}