import { useState, useEffect } from "react";
import EmployeeTable from "../Components/EmployeeTable";


export default function SearchEmployess() {
    const [name, setName] = useState(null);
    const [foundEmployees, setFoundEmployees] = useState(null)
    
    const onSimilarEmployees = (position, level) => {
        fetch(`/search/similar/employees?level=${level}&position=${position}`)
            .then(data => data.json())
            .then(employees => {
                setFoundEmployees(employees);
            })
          
        console.log(position, level);
      }

    useEffect(() => {
        fetch(`/search/empolyees?searchName=${name}`)
            .then(res => res.json())
            .then(employees => {
                setFoundEmployees(employees);
            })
    }, [name]);

    return <>
        <label>Employee Name:</label>
        <input 
            onChange={ (event) => setName(event.target.value) }
        ></input>
        {
            foundEmployees && <EmployeeTable employees={ foundEmployees } onSimilarEmployees={ onSimilarEmployees } />
        }
    </>;
}