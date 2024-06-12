import { faUserCircle, faUserDoctor } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function DoctorProfileCard() {
  return (
    <div className='w-96 h-64 group isolate flex flex-col rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025]'>
        <div className="flex items-center justify-center h-screen">
        <div className="rounded-md p-4 max-w-sm w-full mx-auto">
            <div className="block animate-pulse">
            <div className="flex items-center justify-center rounded-full bg-slate-400 dark:bg-slate-700 h-20 w-20 mb-8 mx-auto opacity-50">
                <FontAwesomeIcon icon={faUserDoctor} color='white' size="3x"/>
            </div>
            <div className="flex-1 space-y-6 py-1">
                <div className="h-4 bg-slate-400 dark:bg-slate-700 rounded"></div>
                <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                    <div className="h-4 bg-slate-400 dark:bg-slate-700 rounded col-span-2"></div>
                    <div className="h-4 bg-slate-400 dark:bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-4 bg-slate-400 dark:bg-slate-700 rounded"></div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default DoctorProfileCard