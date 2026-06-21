import type { AppDispatch, RootState } from "./slices/store";
import {useDispatch, useSelector} from "react-redux"

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = (fn: (state: RootState) => any) => useSelector(fn)