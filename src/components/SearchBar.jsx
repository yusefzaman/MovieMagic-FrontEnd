const SearchBar = ({
  searchQuery,
  handleSearchChange,
  genres,
  selectedGenres,
  handleGenreChange
}) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by movie name"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {/*   <div className="genre-filters">
        {genres.map((genre) => (
          <label key={genre}>
            <input
              type="checkbox"
              value={genre}
              checked={selectedGenres.includes(genre)}
              onChange={handleGenreChange}
            />
            {genre}
          </label>
        ))}
      </div> */}
    </div>
  )
}

export default SearchBar
