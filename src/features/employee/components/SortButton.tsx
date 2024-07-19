import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../../app/store"
import { SORT_MAP } from "../../../utils/constants"
import { selectSortCriteria, sortEmployees } from "../employeeSlice"
import { SortCriteria } from "../types"
import OptionsButton from "../../../components/OptionsButton"

const SortButton = () => {
  const sortCriteriaState = useSelector(selectSortCriteria)
  const dispatch = useDispatch<AppDispatch>()

  const applyHandler = (sortCriteria: string | null) => {
    dispatch(sortEmployees(sortCriteria as SortCriteria))
  }

  return (
    <OptionsButton
      options={Object.entries(SORT_MAP).map(entry => ({
        label: entry[0],
        value: entry[1],
      }))}
      defaultOption={sortCriteriaState}
      applyHandler={applyHandler}
      title={"Sort"}
    />
  )
}

export default SortButton
