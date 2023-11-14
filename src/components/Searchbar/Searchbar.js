import { SearchButton, SearchForm, SearchFormInput } from './SearchBarStyled';
export const SearchBar = e => {
  return (
    <SearchForm id="search-form">
      <SearchFormInput
        type="text"
        name="searchQuery"
        autocomplete="off"
        placeholder="Search images..."
      />
      <SearchButton type="submit">Search</SearchButton>
    </SearchForm>
  );
};
