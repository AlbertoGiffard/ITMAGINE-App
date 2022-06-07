import React from "react";
import { IAppContext } from "../definiciones/IAppContext";


export const AppContext = React.createContext<IAppContext | null>(null);