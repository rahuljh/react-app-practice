import React, {useState, useEffect} from 'react'

function Table() {
    type User = {
        id: number,
        name: string,
        email: string,
        role: string,
        salary: number
    }

    type ColumnType = {
        heading: string,
        key: keyof User
    }

    type SortConfig = {
        key: keyof User,
        direction: 'asc' | 'desc'
    }

    const users: User[] = [
        { id: 1, name: "Rahul Kumar", email: "rahul@gmail.com", role: "Frontend Dev", salary: 75000 },
        { id: 2, name: "Amit Sharma", email: "amit@gmail.com", role: "Backend Dev", salary: 80000 },
        { id: 3, name: "Priya Singh", email: "priya@gmail.com", role: "UI/UX Designer", salary: 70000 },
        { id: 4, name: "Neha Verma", email: "neha@gmail.com", role: "QA Engineer", salary: 65000 },
        { id: 5, name: "Suresh Patel", email: "suresh@gmail.com", role: "DevOps Engineer", salary: 90000 },
        { id: 6, name: "Anjali Gupta", email: "anjali@gmail.com", role: "Product Manager", salary: 95000 },
        { id: 7, name: "Rohit Das", email: "rohit@gmail.com", role: "Full Stack Dev", salary: 85000 },
        { id: 8, name: "Karan Mehta", email: "karan@gmail.com", role: "Intern", salary: 30000 },
        { id: 9, name: "Sneha Roy", email: "sneha@gmail.com", role: "HR", salary: 60000 }
    ];

    const column: ColumnType[] = [
        {heading: 'Name', key: 'name'},
        {heading: 'Email', key: 'email'},
        {heading: 'Role', key: 'role'},
        {heading: 'Salary', key: 'salary'}
    ] ;

    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
    const [searchText, setSearchText] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

     useEffect(() => {
        setCurrentPage(1)
    }, [searchText])
   

    const SortIcon = ({column}: {column: keyof User}) => {
        if(!sortConfig || sortConfig.key !== column) {
                return (
                <svg className="w-3 h-3 ml-1 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 12l5-5 5 5H5z"/>
                </svg>
            );
        }
        if (sortConfig.direction === 'asc') {
            return (
                <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 12l5-5 5 5H5z"/>
                </svg>
            );
        } else {
            return (
                <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8l-5 5-5-5h10z"/>
                </svg>
            );
        }
    }

    const TableHead = ({item} : {item: ColumnType}) => (
        <th className='px-6 py-3 font-medium cursor-pointer hover:bg-neutral-secondary-light select-none' onClick={() => handleSort(item.key)}>
            <div className='flex items-center justify-between'>
                {item.heading}
            <SortIcon column={item.key} />
            </div>
            
        </th>
    )

    const handleSort = (key: keyof User) => {
        let direction : 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({key, direction})
    }

    const getSortedData = () => {
        
        let filterData = users;
        if (searchText !== '') {
            let searchLowerCase = searchText.toLowerCase()
            filterData = users.filter(item => {
               return item.name.toLowerCase().includes(searchLowerCase) ||
                       item.email.toLowerCase().includes(searchLowerCase) ||
                       item.role.toLowerCase().includes(searchLowerCase) ||
                       item.salary.toString().includes(searchText)
            });
            
        }
        if (sortConfig){

        filterData = [...filterData].sort((a,b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1
            }
            return 0;
        })
        }

        const startIndex = currentPage * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        return filterData.slice(startIndex, endIndex)
        
    }
    const TableRow = ({item}: {item: User[]}) => {
        return(
            <>
                {item.map((dt: User) => {
                    return (
                        <tr key={dt.id} className='bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium text-white'>
                            <td className='px-6 py-4 font-medium text-heading whitespace-nowrap'>{dt.name}</td>
                            <td className='px-6 py-4 font-medium text-heading whitespace-nowrap'>{dt.email}</td>
                            <td className='px-6 py-4 font-medium text-heading whitespace-nowrap'>{dt.role}</td>
                            <td className='px-6 py-4 font-medium text-heading whitespace-nowrap'>{dt.salary}</td>
                        </tr>
                        
                    )
                })}
            </>
        )
    }

    const PAGE_SIZE = 3
    const totlaNumberOfPage = Math.ceil(users.length/PAGE_SIZE);
    const startPage = currentPage * PAGE_SIZE;
    const endPage = startPage+PAGE_SIZE;

    const handlePageChange = (n: number) => {
        setCurrentPage(n)
    }

    console.log(totlaNumberOfPage)

    return (
        <div className='bg-amber-50 w-full max-w-210 flex items-center justify-center pt-5 '>
            <div className='flex flex-col bg-slate-800 rounded-xl'>
                <div className='flex flex-col p-4'>
                    <div className='text-2xl text-white'>Data Table with Sorting and Search</div>
                    <div className='bg-slate-700 '>
                        <input
                        className='w-full text-white'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        
                         />
                    </div>
                </div>
                <table className='w-full max-w-210 text-sm rtl:text-right text-body border-collapse'>
                    <thead className='bg-neutral-secondary-medium '>
                        <tr className='text-white'>{column.map((item, index) => <TableHead item={item} key={index} />)}</tr>
                    </thead>
                    <tbody>
                        <TableRow item={getSortedData()} />
                    </tbody>
                </table>
                <div className='pagination'>
                    {[...Array(totlaNumberOfPage).keys()].map((n) => (
                            <button className='p-1 m-1 text-2xl text-white border-1 cursor-pointer border-black' onClick={() => handlePageChange(n)} key={n}>{n+1}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Table
