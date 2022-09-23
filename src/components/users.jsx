import React, { useState } from "react";
import api from "../api";
const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [number, setNumber] = useState(users.length);
  // определение ID  для кликнутого Delete
  const handUserId = (user) => {
    const userId = user._id; 
  };
  //удаление из списка и изменение количества человек
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
    setNumber(prevState => prevState - 1);
  };
  //изменение цвета фразы
  const getBageClasses = () => {
    let classes = "badge ";
    classes += number === 0 ? "badge bg-danger" : "badge bg-primary";
    return classes;
  };
  // рендер фразы в зависимости от количества человек
  const renderFrase = (number) => {
    let numberText = number;
    numberText =number >= 2 && number <= 4
        ? number + " человека тусанут с тобой сегодня"
        : (numberText = number === 0 ? "Никто с тобой не тусанет"
        : number + " человек тусанет с тобой сегодня");
    return numberText;
  };
  return (
    <>
      <h2><span className={getBageClasses()}> {renderFrase(number)}</span></h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился,раз</th>
            <th scope="col">Оценка</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} onClick={() => handUserId(user)}>
              <td>{user.name}</td>
              <td>
                {user.qualities.map((quality) => (
                  <li key={quality._id} className={"badge m-1 bg-" + quality.color}
                  >{quality.name}</li>
                ))}
              </td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate}</td>
              <td>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(user._id)}
                > Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
