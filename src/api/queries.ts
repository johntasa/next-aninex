import { gql } from "@apollo/client";

export const GET_TOP_ANIMES = gql`
  query getTopAnimes($season: MediaSeason, $seasonYear: Int) {
    season: Page(page: 1, perPage: 6) {
      media(
        season: $season
        seasonYear: $seasonYear
        sort: POPULARITY_DESC
        type: ANIME
        isAdult: false
      ) {
        ...media
      }
    }
    popular: Page(page: 1, perPage: 6) {
      media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
  }
  fragment media on Media {
    id
    bannerImage
    coverImage {
      large
    }
    title {
      english
      native
    }
    description
    episodes
    averageScore
    status(version: 2)
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    trailer {
      id
      site
    }
    genres
  }
`;

export const GET_ANIMES = gql`
  query GetAnimes($page: Int = 1, $search: String, $genre: [String], $seasonYear: Int, $season: MediaSeason, $status: MediaStatus) {
    Page (page: $page, perPage: 24) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(search: $search, genre_in: $genre, seasonYear: $seasonYear, season: $season, status: $status, type: ANIME, isAdult: false, sort: POPULARITY_DESC) {
        id
        bannerImage
        coverImage {
          large
        }
        title {
          english
          native
        }
        description
        episodes
        averageScore
        status(version: 2)
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        trailer {
          id
          site
        }
        genres
      }
    }
  }
`;

export const GET_GENRES = gql`
  query GetGenres {
    GenreCollection
  }
`;