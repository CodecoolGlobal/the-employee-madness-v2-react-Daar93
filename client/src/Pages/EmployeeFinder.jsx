import { useEffect, useState } from "react";


export default function EmployeeFinder() {
    const [foundEmployee, setFoundEmployees] = useState(null);

    useEffect(() => {
        console.log(window.location.href.lastIndexOf("/"));
        const nameToSearch = window.location.href;
        const searchValue = nameToSearch.slice(nameToSearch.lastIndexOf("/") + 1);
        console.log(searchValue);

        console.log(searchValue)
        fetch("http://localhost:8080/employees/" + searchValue)
            .then(data => data.json())
            .then(employees => {
                console.log(employees);
            })

    }, []);

    return <>Halloooo</>
};