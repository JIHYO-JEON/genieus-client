import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface TutorType {
  email: string
  name: string
  id: string
  photo_url: string
  spoken_language: string[]
  location: string
  joined_date: Date
  bio: string
  avg_rating: number
  completed_help_requests: number
  tags: string[]
  programming_languages: string[]
}

export const tutorApi = createApi({
  reducerPath: 'tutorApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  endpoints: (builder) => ({
    getTutorById: builder.query<TutorType, string>({
      query: (id) => `tutor/${id}`,
    }),

    getAllTutors: builder.query<TutorType, void>({
      query: () => `/tutor`,
    }),
    addTutor: builder.mutation<TutorType, any>({
      query: (user) => ({
        url: '/tutor',
        method: 'POST',
        body: user,
      }),
    }),
    updateTutor: builder.mutation<TutorType, any>({
      query: (user) => ({
        url: `/tutor/${user.id}`,
        method: 'PATCH',
        body: user,
      }),
    }),

    deleteTutor: builder.mutation<TutorType, any>({
      query: (id) => ({
        url: `/tutor/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetTutorByIdQuery,
  useGetAllTutorsQuery,
  useAddTutorMutation,
  useDeleteTutorMutation,
  useUpdateTutorMutation
} = tutorApi
