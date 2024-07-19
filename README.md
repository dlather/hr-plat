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

Chose to use `allEmployees` as map, and `visibleEmployeeIds` storing only employee keys, as it could be usefull to hydrate the employee ids and avoid duplication, when the user might be navigating on multiple pages, with expectations that multiple features would be developed on top of employee data.

- Common Components to the repo are at `src/components`
- Internal app developed as feature, Components specific to Feature are in respective features folder.
- Used `EmployeeForm` for Add, Edit and Viewing details, although can be restructured
- `OptionsButton` is single component supporting Filter By and Sort By, enabling code reuse.
- `SearchBar` can be moved to app level components and made more generic to support upcoming pages.
- Skeleton Loaders can be used instead of spinning widgets.
- `Pagination` is pending for API's
- Filter, Sort and Serach works offline for now, can do a API call in background and the update the UI, by then showing the offline data only.
- Using `key` prop is essential, as it enables React to optimize rendering of components.
- When you `filter`, or `sort`, or `search`, initiall local results are checked and shown immediately, and loading component for the upcoming data, enabling better user experience.
- Used `debounce` for search query, in order to avoid multiple API calls
- Performance Optimization: Assuming developing multiple features like Employee, we can have following optimizations possible:
    1. Page level lazy loading / code splitting
    2. Using Shell kind of architecture, where changing a internal portion doesn't afffect outer shell.
    3. Prefetching pages based upon page view analytics.
    4. Using frameworks like remix.run to make parallel api calls, avoiding waterfall network calls.