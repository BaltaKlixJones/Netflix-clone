import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';
import { useEffect, useState} from 'react';

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);
  const [showNav, setShowNav] = useState(true);
  const [navOpacity, setNavOpacity] = useState(1);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      setShowNav(true);
      setNavOpacity(1);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setShowNav(false);
        setNavOpacity(0);
      }, 2500);
    };

    resetTimer();

    document.addEventListener('mousemove', resetTimer);

    return () => {
      document.removeEventListener('mousemove', resetTimer);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-black" onMouseLeave={() => setShowNav(false)}>
      <nav className={`fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70 transition-opacity duration-500 ${showNav ? 'opacity-100' : `opacity-${navOpacity * 100}`}`}>
        <ArrowLeftIcon onClick={() => router.push('/')} className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light"></span> {data?.title}
        </p>
      </nav>
      <video className="h-full w-full" autoPlay controls src={data?.videoUrl}></video>
    </div>
  )
}

export default Watch;