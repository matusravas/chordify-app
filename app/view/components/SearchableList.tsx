// import SearchBar from "./SearchBar"
// import SongsList from "./SongList"

// const SearchableList = () => {
//     return (
//     {searchBar && <SearchBar timeoutMilis={1000} searchQuery={searchQuery} onSearch={handleSearch} onScrollToTop={()=>{console.log('Tap')}}/>}
//         {isLoading? <ActivityIndicator style={{marginTop: 10}} size="large" color='#1FC159'/> :
//         <SongsList 
//               flatListRef={flatListRef}
//               // isFetched={!isLoading}
//               // toggleSearchBar={setSearchBarToggle}
//               onScroll={handleScroll}
//               isMoreLoading={isMoreLoading}
//               songs={songs} 
//               onCardClick={handleCardClick} 
//               onFavoritesButtonClick={handleFavoritesChange}
//               onMoreButtonClick={handleMoreButtonClick}
//               onPageChanged={handlePageChanged}
//               />}
//     )
// }