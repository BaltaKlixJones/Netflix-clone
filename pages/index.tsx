import useCurrentUser from '@/hooks/useCurrentUser'
import { NextPageContext } from 'next'
import { getSession} from 'next-auth/react'
import NavBar from '@/components/NavBar'
import BillBoard from '@/components/BillBoard'
import MovieList from '@/components/MovieList'
import useMoviesList from '@/hooks/useMoviesList'
import useFavorites from '@/hooks/useFavorites'
import InfoModal from '@/components/InfoModal'
import useInfoModal from '@/hooks/useInfoModal'

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
  const { data: favorites } = useFavorites()

  const {isOpen , closeModal } = useInfoModal()

  return (
   <>
   <InfoModal visible={isOpen} onClose={closeModal} />
   <NavBar/>
   <BillBoard />
   <div className='pb-40'>
   <MovieList title="Trending now" data={movies}/>
   <MovieList title="My List" data={favorites}/>
   </div>
  
   </>
  )
}
