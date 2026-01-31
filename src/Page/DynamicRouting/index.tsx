import React, { useState } from 'react';

interface BreadcrumbItem {
    name: string;
    path: string[];
}

function index() {
    const allPages: string[] = ['home', 'product', 'electronics', 'laptops'];

    const [currentPath, setCurrentPath] = useState<string[]>(['home'])

    const breadCrums: BreadcrumbItem[] = currentPath.map((crumb, idx) => ({
        name: crumb,
        path: currentPath.slice(0, idx+1)
    }));

    const handleNextpath = (): void => {
        const nextIndex = currentPath.length;

        if (nextIndex < allPages.length) {
             setCurrentPath(prev => [...prev, allPages[nextIndex]]);
        }
    }

    const handleBack = (): void => {
        
        const lastIndex = currentPath.length-1;
        if (lastIndex === 0) return
        if (lastIndex < allPages.length) {
            setCurrentPath(currentPath.slice(0, -1))
        }
    }

  return (
    <div className='bg-amber-50 w-full flex items-center justify-center pt-5 '>
        <div className='flex flex-col items-center justify-center bg-slate-800 rounded-xl p-8 shadow-2xl w-full max-w-210 '>
            <div className='font-bold text-2xl mb-4 text-white'>Dynamic Routing with Breadcrumbs</div>
            <div className='bg-slate-900 p-4 rounded mb-4 w-full'>
                <div className='text-purple-400 hover:text-purple-300 capitalize'>
                    {breadCrums.map((item, idx) => {
                        return (
                            <>
                            <button onClick={() => setCurrentPath(item.path)}>{item.name}</button>
                                {idx < breadCrums.length -1  && <span className="text-gray-500"> / </span> }
                            </>
                        )
                    })}
                </div>
            </div>
            <div className='bg-slate-900 text-white p-4 rounded mb-4 flex flex-col w-full gap-4'>
                <div className='capitalize'>Current Page:  {currentPath[currentPath.length-1]}</div>
                <div>Click breadcrumbs to navigate </div>
                <div className='flex gap-2'>
                    <button className='px-4 py-2 bg-purple-500 hover:bg-purple-700 rounded cursor-pointer' onClick={handleNextpath}>Go Deeper</button>
                    <button className='px-4 py-2 rounded bg-slate-700 hover:bg-slate-600 cursor-pointer' onClick={handleBack}>GO Back</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default index
