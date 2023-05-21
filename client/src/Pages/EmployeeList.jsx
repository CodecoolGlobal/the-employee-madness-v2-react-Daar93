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

  const handleSort = (sortOption, sortFlow="asc") => {
    fetch(`/employees/sort?sortOption=${sortOption}&sortFlow=${sortFlow}`)
      .then(data => data.json())
      .then(employees => setEmployees(employees))
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
