import useCurrentUser from '@/hooks/useCurrentUser'
import { NextPageContext } from 'next'
import { getSession} from 'next-auth/react'
import NavBar from '@/components/NavBar'
import BillBoard from '@/components/BillBoard'
import MovieList from '@/components/MovieList'
import useMoviesList from '@/hooks/useMoviesList'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}

export default function Home() {
  const { data: movies = [] } = useMoviesList()

  return (
   <>
   <NavBar/>
   <BillBoard />
   <div className='pb-40'>

   <MovieList title="Trending now" data={movies}/>
   </div>
   </>
  )
}
