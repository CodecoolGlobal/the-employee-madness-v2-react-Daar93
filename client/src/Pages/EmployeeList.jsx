import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [positionSearchValue, setPositionSearchValue] = useState("");
  const [levelSearValue, setLevelSearchValue] = useState("");


  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  function positionSearch(searchKey) {
    return employees.filter(employee => positionSearchValue === employee[searchKey]);
  };

  function levelSearch(searchKey) {
    return employees.filter(employee => levelSearValue === employee[searchKey]);
  };

  function handleKeyDown(event) {
    const searchKey = event.target.className;
    console.log(positionSearchValue)
    if(event.key === "Enter") {
      searchKey === "position" ? setEmployees(positionSearch(searchKey)) : setEmployees(levelSearch(searchKey)) 
      ;
    }
  };

  // function handleSortByFirstName(event) {
  //   event.preventDefault();

  //   // setEmployees(() => {
  //   //   return employees.reduce((sortedEmployees, employee) => {
  //   //     let index = 0;
  //   //     const employeeFirstName = employee.name.substring(0, employee.name.indexOf(" "));        

  //   //     while(index < sortedEmployees.length && employeeFirstName > sortedEmployees[index].name.substring(0, sortedEmployees[index].name.indexOf(" "))) index++;
  //   //     sortedEmployees.splice(index, 0, employee);
  //   //     return sortedEmployees;
  //   //   }, []);
  //   // });

  //   fetch()
  // }

  // function handleSortByLastName(event) {
  //   event.preventDefault();

  //   setEmployees(() => {
  //     return employees.reduce((sortedEmployees, employee) => {
  //       let index = 0;
  //       const employeeLastName = employee.name.substring(employee.name.lastIndexOf(" "), employee.length);        

  //       while(index < sortedEmployees.length && employeeLastName > sortedEmployees[index].name.substring(sortedEmployees[index].name.lastIndexOf(" "), sortedEmployees[index].name.length)) index++;
  //       sortedEmployees.splice(index, 0, employee);
  //       return sortedEmployees;
  //     }, []);
  //   });
  // }

  // function handleSortByPosition(event) {
  //   event.preventDefault();

  //   setEmployees(() => {
  //     return employees.reduce((sortedEmployees, employee) => {
  //       let index = 0;
  //       const position = employee.position;

  //       while(index < sortedEmployees.length && position >   sortedEmployees[index].position) index++;
  //       sortedEmployees.splice(index, 0, employee);
  //       return sortedEmployees;
  //     }, []);
  //   })
  // }

  // function handleSortByLevel(event) {
  //   event.preventDefault();

  //   setEmployees(() => {
  //     return employees.reduce((sortedEmployees, employee) => {
  //       let index = 0;
  //       const level = employee.level;

  //       while(index < sortedEmployees.length && employee.level > sortedEmployees[index].level) index++;
  //       sortedEmployees.splice(index, 0, employee);
  //       return sortedEmployees;
  //     }, []);
  //   })
  // }

  const handleSort = (sortOption, sortFlow="asc") => {

    fetch("/employees/sort" + `?sortOption=${sortOption}&sortFlow=${sortFlow}`)
     .then(data => data.json())
     .then(books => setEmployees(books))
  };

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
      })
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <>
    <input 
      type="text" 
      className="position" 
      placeholder="Position name" 
      onChange={(event) => setPositionSearchValue(event.target.value)} 
      onKeyDown={handleKeyDown} 
    />
    <input 
      type="text" 
      className="level" 
      placeholder="Level" 
      onChange={(event) => setLevelSearchValue(event.target.value)}
      onKeyDown={handleKeyDown} 
    />
    <button 
      className="name"
      onClick={ () => handleSort("name") }
    >Sort by first name</button>
    <button
      className="name"
      onClick={ () => console.log("Hallo") }
    >Sort by last name</button>
    <button
      className="position"
      onClick={ () => handleSort("position") }
    >Sort by position</button>
    <button
      className="level"
      onClick={ () => handleSort("level") }
    >Sort by level</button>

    <EmployeeTable employees={employees} onDelete={handleDelete} />;
  </>
};

export default EmployeeList;
