import React from 'react'

function AnimationSquare() {
  return (
    <div className='shape1 animate-spin-slow absolute top-0 right-0 ml-[50rem] flex justify-center mt-[10rem] items-center h-36 w-36'>
        <div className='absolute top-0 left-0 h-2 w-2 border-2 border-gray-400/40 dark:border-gray-400/20'>

        </div>
        <div className='absolute top-0 right-0 h-2 w-2 border-2 border-gray-400/40 dark:border-gray-400/20'>

        </div>
        <div className='absolute bottom-0 left-0 h-2 w-2 border-2 border-gray-400/40 dark:border-gray-400/20'>

        </div>
        <div className='absolute bottom-0 right-0 h-2 w-2 border-2 border-gray-400/40 dark:border-gray-400/20'>

        </div>
        <div className='absolute flex justify-center items-center h-[8.5rem] w-[8.5rem] border-2 border-gray-400/40 dark:border-gray-400/20 rounded-full'>

        </div>
        <div className='absolute flex justify-center items-center h-[8.5rem] w-[8.5rem] border-2 border-gray-400/40 dark:border-gray-400/20'>

        </div>
    </div>
  )
}

export default AnimationSquare