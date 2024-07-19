# Zippling

- Init the repo from redux ts template
- Given the nature that we would need to build more features on top of it, chose Redux for state management.

```
const initialState: EmployeeSliceState = {
  allEmployees: {},
  visibleEmployeeIds: [],
  departmentType: null,
  sortCriteria: null,
  searchQuery: "",
  status: "idle",
}
```

Chose to use `allEmployees` as map, and `visibleEmployeeIds` storing only employee keys, as it could be usefull to hydrate the employee ids and avoid duplication, when the user might be navigating on multiple pages.

- Common Components to the repo are at `src/components`
- Internal app developed as feature, Components specific to Feature are in respective features folder.
- Used `EmployeeForm` for Add, Edit and Viewing details, although can be restructured
- `FilterButton`, `SortButton` and `SearchBar` can be moved to app level components and made more generic to support upcoming pages.
- Skeleton Loaders can be used instead of spinning widgets.