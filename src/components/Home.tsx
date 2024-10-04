import React from "react";
import { APIContext } from "../contexts/ContextAPI.js";
import { useAPIContext } from "../hooks/useAPIContext.js";

interface Item {
  id: number;
  createdAt: string;
  name: string;
  status: boolean;
}

const item : Item = {
    id:0,
    createdAt:"10-10-2021",
    name:"list",
    status:true
}

console.log(item);


export const Home: React.FC = () => {
  const { data, setData } = useAPIContext();
  const handleClick = (status: boolean, id: number) => {
    const updatedData =
      data?.map((item: Item) => {
        if (item.id === id) {
          return { ...item, status: !status };
        }
        return item;
      }) || [];
    setData(updatedData);
  };
  return (
    <div className="pageLayout">
      <div>
        <h3>Home Page</h3>
      </div>
      <div>
        {data ? (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Created At</th>
                <th>Name</th>
                <th>Status</th>
                <th>Finished</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: Item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.createdAt}</td>
                    <td>{item.name}</td>
                    <td>{String(item.status)}</td>
                    <td>
                      <button onClick={() => handleClick(item.status, item.id)}>
                        {item.status ? "Finished" : "Pending"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div>No data available</div>
        )}
      </div>
    </div>
  );
};
