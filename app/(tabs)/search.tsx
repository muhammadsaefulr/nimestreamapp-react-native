import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { fetchMovies } from '@/services/api'
import useFetch from '@/services/useFetch'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    refecth: loadMovies,
    error: moviesError,
    reset
  } = useFetch<Movie[]>(() => fetchMovies({
    query: searchQuery
  }), false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const fetchMovies = async () => {
        if (searchQuery.trim()) {
          await loadMovies();
        } else {
          reset();
        }
      }
      fetchMovies();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery])


  return (
    <View className='flex-1 bg-primary'>
      <FlatList data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'center', gap: 16, marginVertical: 16 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className='my-12'>
              <SearchBar placeholder='Search movies ...'
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {moviesLoading && (
              <ActivityIndicator size='large' color='#0000ff' className='my-3' />
            )}

            {moviesError && (
              <Text className='text-red-500 px-5 py-3'>Error: {moviesError?.message}</Text>
            )}

            {!moviesLoading && !moviesError && searchQuery.trim() && movies && movies.length > 0 && (
              <Text className='text-xl text-white font-bold'>
                Search results for{" "}
                <Text className='text-accent'>{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className='mt-2 px-5'>
              <Text className='text-center text-gray-500'>
                {searchQuery.trim() ? "No results found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  )
}

export default Search