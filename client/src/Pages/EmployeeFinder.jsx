import { useEffect, useState } from "react";
import Loading from "../Components/Loading";

import EmployeeTable from "../Components/EmployeeTable";

export default function EmployeeFinder() {
    const [foundEmployees, setFoundEmployees] = useState(null);

    
    useEffect(() => {
        const completeUrl = window.location.href;
        const searchValue = completeUrl.slice(completeUrl.lastIndexOf("/") + 1);

        fetch("http://localhost:8080/employees/" + searchValue)
            .then(data => data.json())
            .then(employees => {
                setFoundEmployees(employees);
            })
    }, []);

    if(!foundEmployees) {
        return <Loading />
    }

    return <>
        <EmployeeTable 
            employees={foundEmployees}
            />
    </>
};